<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/sizegap';
  .au-datepicker {
    display: inline-block;
    position: relative;
  }
  .au-datepicker-label-text {
    margin-bottom: 8px;
    font-size: $normal;
  }
  .au-datepicker-container {
    position: relative;
    width: 100%;
  }
  .au-datepicker-input {
    width: 100%;
  }
  .au-datepicker-popup-container {
    position: absolute;
    left: 0;
    top: 34px;
    width: 276px;
    z-index: $z-level-1;
    font-size: $small;
    user-select: none;
    outline: none;
    td span {
      cursor: default;
    }
  }
  // .au-datepicker-dates-header {
  //   border-top-left-radius: 2px;
  //   border-top-right-radius: 2px;
  // }
  .au-datepicker-fastmoves {
    padding-top: 12px;
    font-size: $normal;
    cursor: default;
    table {
      width: 100%;
    }
    td {
      text-align: center;
      vertical-align: middle;
    }
    td:first-child {
      text-align: left;
      padding-left: 12px;
    }
    td:last-child {
      text-align: right;
      padding-right: 12px;
    }
    .simu {
      font-size: 20px;
    }
    .simu2 {
      position: relative;
      top: -2px;
    }
  }
  span.au-datepicker-fastmove {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    cursor: pointer !important;
  }
  .au-datepicker-week {
    width: 100%;
    td {
      text-align: center;
      padding: 12px 0;
      vertical-align: middle;
    }
  }
  .au-datepicker-dates-body {
    padding: 4px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
  }
  .au-datepicker-dates-table {
    width: 100%;
    td {
      position: relative;
      width: 38px;
      height: 38px;
      text-align: center;
      vertical-align: middle;
    }
    td > span {
      display: inline-block;
      width: 32px;
      height: 32px;
      box-sizing: border-box;
      border-radius: 100%;
      border: 1px solid transparent;
      line-height: 30px;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="au-datepicker au-theme-color--base-3" :style="{display: !inline && fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="inline"
      :warnings="warnings || localWarnings">
      <div class="au-datepicker-container">
        <au-input
          class="au-datepicker-input"
          v-model="inputValue"
          :warning="hasWarnings"
          icon="calendar"
          @focus="coreFocus"
          @blur="coreBlur"
          :width="width || '120px'"
          :inline="false"
          :fullfill-with="!inline && fullWidth"
          :size="size"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          ref="core"/>
        <div
          class="au-datepicker-popup-container au-theme-box-shadow--base"
          :class="`au-sizegap-${size}`"
          v-show="popup"
          @blur="popupBlur"
          tabindex="0"
          ref="popup">
          <div class="
            au-datepicker-dates-header
            au-theme-color--base-12
            au-theme-top-left-radius
            au-theme-top-right-radius
            au-theme-background-color--primary">
            <div class="au-datepicker-fastmoves">
              <table>
                <tr>
                  <td>
                    <span
                      class="au-datepicker-fastmove simu2"
                      @click="step(true)"><au-icon type="backward"></au-icon></span>
                    <span
                      class="au-datepicker-fastmove simu"
                      @click="step(false)"><au-icon type="caret-left"></au-icon></span>
                  </td>
                  <td>
                    {{ renderedDateObj.month }}月&nbsp;&nbsp;{{ renderedDateObj.year }}
                  </td>
                  <td>
                    <span
                      class="au-datepicker-fastmove simu"
                      @click="step(false, true)"><au-icon type="caret-right"></au-icon></span>
                    <span
                      class="au-datepicker-fastmove simu2"
                      @click="step(true, true)"><au-icon type="forward"></au-icon></span>
                  </td>
                </tr>
              </table>
            </div>
            <table class="au-datepicker-week">
              <tr>
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
              </tr>
            </table>
          </div>
          <div class="
            au-datepicker-dates-body
            au-theme-border-color--base-9
            au-theme-background-color--base-12">
            <table class="au-datepicker-dates-table">
              <tr v-for="(row, i) in dates" :key="i">
                <td
                  v-for="(date, j) in row"
                  :key="j">
                  <span :class="{
                    'au-theme-hover-border-color--primary': isValid(date) && !isSelected(date),
                    'au-theme-background-color--primary au-theme-color--base-12': isSelected(date),
                    'au-theme-color--base-3': !isToday(date) && renderedDateObj.month === date.month,
                    'au-theme-color--base-8': isValid(date) && renderedDateObj.month !== date.month,
                    'au-theme-color--base-11': !isValid(date),
                    'au-theme-color--primary': isToday(date) && !isSelected(date) && isValid(date),
                  }" :style="{
                    cursor: isValid(date) ? '' : 'not-allowed'
                  }" @click="selectDate(date)">{{ isToday(date) ? '今天' : date.date }}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </form-item>
  </div>
</template>
<script>
import ValidatorMixin from 'helpers/validator-mixin'
import FormApiMixin from 'helpers/form-api-mixin'
import { isEmptyString } from 'helpers/utils'
import AuInput from 'components/input'
import AuIcon from 'components/icon'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-datepicker',
  mixins: [ValidatorMixin, FormApiMixin],
  components: { AuInput, AuIcon, FormItem },
  data () {
    return {
      dateObj: {},
      inputValue: this.format(this.value),
      // the significant value after last fomat
      lastInputValue: this.format(this.value),
      dates: [],
      renderedDateObj: {},
      popup: false,
      lastValidatedDate: {
        date: '',
        res: null
      }
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    start: String,
    end: String,
    readonly: Boolean,
    fullWidth: Boolean,
    width: String
  },
  watch: {
    value (v) {
      this.changeInputValue(v)
      this.localValue = v
    },
    inputValue (v) {
      let res = this.format(v)
      // this.localValue = res
      if (this.popup) this.render(res)
    },
    popup (v) {
      if (v) {
        this.render(this.inputValue)
        this.$emit('focus', this.inputValue)
      } else {
        this.$emit('blur', this.inputValue)
      }
    }
  },
  methods: {
    monthDayCount (year) {
      // date count in each month
      return [
        31,
        ((year % 4 === 0) && (year % 100 !== 0)) ||
        (year % 400 === 0) ? 29 : 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31
      ]
    },
    render (value) {
      function calcYmdObj (value) {
        let tempDate = null
        if (typeof value === 'string' && value !== '' && !isEmptyString(value)) {
          let tempArr = value.split('-')
          if (tempArr[1]) tempArr[1] -= 1
          try {
            tempDate = new Date(...tempArr)
          } catch (e) {
            tempDate = new Date()
          }
        } else if (!value) {
          // no input
          tempDate = new Date()
        }
        return {
          year: tempDate.getFullYear(),
          month: tempDate.getMonth() + 1,
          date: tempDate.getDate()
        }
      }

      // save the renderd value
      this.renderedDateObj = calcYmdObj(value)
      let { year, month } = this.renderedDateObj
      // the day of the first date in this month
      let firstDay = new Date(year, month - 1, 1).getDay()
      let monthDayCount = this.monthDayCount(year)
      // the date count of this month
      let dayCount = monthDayCount[month - 1]
      // the day of the last date in this month
      let lastDay = new Date(year, month - 1, dayCount).getDay()
      // the date count of last month
      let lastMonthDayCount = month - 2 === -1 ? monthDayCount[11] : monthDayCount[month - 2]
      let linearTemp = []

      // put the renderd date of last month into the one-dimensional array
      for (let i = 0; i < firstDay; i++) {
        linearTemp.push({
          date: lastMonthDayCount - firstDay + 1 + i,
          month: month - 1 === 0 ? 12 : month - 1,
          year: month - 1 === 0 ? year - 1 : year
        })
      }
      // put the renderd date of this month into the one-dimensional array
      for (let i = 0; i < dayCount; i++) {
        linearTemp.push({
          date: i + 1,
          month,
          year
        })
      }
      // put the renderd date of next month into the one-dimensional array
      for (let i = lastDay + 1; i < 7; i++) {
        linearTemp.push({
          date: i - lastDay,
          month: month + 1 === 13 ? 1 : month + 1,
          year: month + 1 === 13 ? year + 1 : year
        })
      }

      // traverse all the date into a two-demensional array for render
      let dyadicArray = []
      for (let i = 0; i < linearTemp.length / 7; i++) {
        dyadicArray[i] = []
        for (let j = 0; j < 7; j++) {
          dyadicArray[i][j] = linearTemp[j + 7 * i]
        }
      }
      this.dates = dyadicArray
    },
    format (value) {
      let monthDayCount = this.monthDayCount
      // formate the string into [y, m, d]

      function reConstruct (value) {
        // already according with the [y, m, d], just return it
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
          return value.split('-')
        }
        // if the symble "-" exists, then reconstruct based on it
        if (value.indexOf('-') !== -1) {
          return value.split('-').map(v => {
            let num = v.match(/\d/g)
            if (num) return num.join('')
          }).map((v, i) => {
            if (i < 3) {
              return v
            }
          })
        } else {
          // if the symble "-" not exists, then reconstruct based on 4-2-2
          let nums = value.match(/\d/g)
          let res = ['', '', '']
          // if no number exists return empty array
          if (!nums) return []
          for (let i = 0; i < nums.length; i++) {
            if (i < 4) res[0] += nums[i] ? nums[i] : ''
            else if (i < 6) res[1] += nums[i] ? nums[i] : ''
            else if (i < 8) res[2] += nums[i] ? nums[i] : ''
          }
          for (let i = 0; i < 3; i++) {
            if (!res[i]) res[i] = i === 1 ? '01' : res[i]
          }
          return res
        }
      }
      // limit the date range and supplement the "0"
      function limitYMD (ymdArr, start, end) {
        if (!ymdArr.length) return ''
        if (!ymdArr[1]) ymdArr[1] = 1
        if (!ymdArr[2]) ymdArr[2] = 1
        // the date count of this month
        let dayCount = monthDayCount(ymdArr[0])[ymdArr[1] - 1]
        // limit the date range
        ymdArr[0] = Number(ymdArr[0]) < 100 ? 100 : (Number(ymdArr[0]) > 9999 ? 9999 : Number(ymdArr[0]))
        ymdArr[1] = Number(ymdArr[1]) < 1 ? 1 : (Number(ymdArr[1]) > 12 ? 12 : Number(ymdArr[1]))
        ymdArr[2] = Number(ymdArr[2]) < 1 ? 1 : (Number(ymdArr[2]) > dayCount ? dayCount : Number(ymdArr[2]))
        // supplement "0"
        if (ymdArr[1].toString().length === 1) ymdArr[1] = '0' + ymdArr[1]
        if (ymdArr[2].toString().length === 1) ymdArr[2] = '0' + ymdArr[2]
        return ymdArr.join('-')
      }

      if (isEmptyString(value)) return ''
      let input = reConstruct(value)
      let res = null
      if (this.start) {
        let start = reConstruct(this.start)
        if (new Date(...input).getTime() < new Date(...start).getTime()) {
          res = start
        } else {
          if (this.end) {
            let end = reConstruct(this.end)
            if (new Date(...input).getTime() > new Date(...end).getTime()) {
              res = end
            } else res = input
          } else res = input
        }
      } else {
        if (this.end) {
          let end = reConstruct(this.end)
          if (new Date(...input).getTime() > new Date(...end).getTime()) {
            res = end
          } else res = input
        } else res = input
      }

      return limitYMD(res)
    },
    changeInputValue (value, e) {
      let res = this.format(value)
      if (value === '' || res) {
        if (res !== this.inputValue) {
          this.inputValue = res
          this.lastInputValue = res
          this.$emit('input', res, e) // input first to ensure changes of father comp
          this.$emit('change', res, e)
        } else {
          this.$emit('input', res, e) // input first to ensure changes of father comp
          this.$emit('change', res, e)
        }
      } else {
        this.inputValue = this.lastInputValue
      }
    },
    isSelected (dateObj) {
      // used to check if the date is selected
      if (isEmptyString(this.inputValue)) return false
      let valueYMD = this.inputValue.split('-')
      if (Number(valueYMD[0]) !== dateObj.year) return false
      if (Number(valueYMD[1]) !== dateObj.month) return false
      if (Number(valueYMD[2]) !== dateObj.date) return false
      return true
    },
    isToday (dateObj) {
      // used to check if the date is today
      let curr = new Date()
      let currObj = {
        year: curr.getFullYear(),
        month: curr.getMonth() + 1,
        date: curr.getDate()
      }
      for (var k in dateObj) {
        if (dateObj[k].toString() !== currObj[k].toString()) return false
      }
      return true
    },
    selectDate (dateObj) {
      if (!this.isValid(dateObj)) return
      this.changeInputValue(dateObj.year + '-' + dateObj.month + '-' + dateObj.date)
      let timer = setTimeout(() => {
        this.popup = false
        clearTimeout(timer)
        timer = null
      }, 100)
    },
    step (isYear, isForward) {
      let dateObj = Object.assign({}, this.renderedDateObj)
      let direc = isForward ? 1 : -1
      if (isYear) {
        dateObj.year = dateObj.year + direc
        dateObj.year = dateObj.year < 100 ? 100 : dateObj.year > 9999 ? 9999 : dateObj.year
      } else {
        dateObj.month = dateObj.month + direc
        if (dateObj.month < 1) {
          dateObj.month = 12
          dateObj.year--
        } else if (dateObj.month > 12) {
          dateObj.month = 1
          dateObj.year++
        }
      }
      this.render(dateObj.year + '-' + dateObj.month + '-' + dateObj.date)
    },
    coreFocus () {
      if (this.readonly) return
      this.popup = true
    },
    coreBlur (v, e) {
      if (e.relatedTarget !== this.$refs.popup) this.popup = false
      this.changeInputValue(v, e)
      if (this.popup) this.render(this.format(v))
    },
    popupBlur (e) {
      if (e.relatedTarget !== this.$refs.core.$refs.core) this.popup = false
    },
    isValid (date) {
      let d = (new Date(date.year, date.month - 1, date.date)).getTime()
      let res = true
      if (this.start) {
        let start = this.start.split('-').map(e => {
          return e.trim()
        })
        if (!start[1]) start[1] = 0
        else start[1]-- // calfull with month
        if (!start[2]) start[2] = 1
        if (d < (new Date(...start).getTime())) res = false
      }
      if (this.end) {
        let end = this.end.split('-').map(e => {
          return e.trim()
        })
        if (!end[1]) end[1] = 0
        else end[1]-- // calfull with month
        if (!end[2]) end[2] = 1
        if (d > (new Date(...end).getTime())) res = false
      }
      return res
    }
  }
}
</script>
