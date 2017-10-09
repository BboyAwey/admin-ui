<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/sizegap';
  .au-datepicker {
    display: inline-block;
    position: relative;
    width: 198px;
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
    z-index: 9990;
    font-size: $small;
    user-select: none;
    outline: none;
    td span {
      cursor: default;
    }
  }
  .au-datepicker-dates-header {
    // border-top-left-radius: 2px;
    // border-top-right-radius: 2px;
  }
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
  <div class="au-datepicker">
    <div class="au-form-label" :class="{
      'au-theme-font-color--base-3': disabled || !hasWarnings,
      'au-theme-font-color--danger-3': hasWarnings
    }" :style="{
      cursor: disabled ? 'not-allowed' : 'default'
    }" v-if="label" @click="labelClick">{{ label }}</div>
    <div class="au-datepicker-container">
      <au-input
        class="au-datepicker-input"
        v-model="inputValue"
        @change="changeInputValue(inputValue, $event)"
        :warnings="calcedWarnings"
        icon="calendar"
        @focus="coreFocus"
        @blur="coreBlur"
        :size="size"
        :disabled="disabled"
        :placeholder="placeholder"
        ref="core"/>
      <div
        class="au-datepicker-popup-container au-theme-shadow--level-3"
        :class="`au-sizegap-${size}`"
        v-show="popup"
        @blur="popupBlur"
        tabindex="0"
        ref="popup">
        <div class="
          au-datepicker-dates-header
          au-theme-font-color--base-12
          au-theme-top-left-radius
          au-theme-top-right-radius
          au-theme-background-color--primary-3">
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
          au-theme-border-color--base-8
          au-theme-background-color--base-12">
          <table class="au-datepicker-dates-table">
            <tr v-for="(row, i) in dates" :key="i">
              <td
                v-for="(date, j) in row"
                :key="j">
                <span :class="{
                  'au-theme-hover-border-color--primary-3': !isSelected(date),
                  'au-theme-background-color--primary-3 au-theme-font-color--base-12': isSelected(date),
                  'au-theme-font-color--base-3': !isToday(date) && renderedDateObj.month === date.month,
                  'au-theme-font-color--base-6': renderedDateObj.month !== date.month,
                  'au-theme-font-color--primary-3': isToday(date)&&!isSelected(date),
                }" @click="selectDate(date)">{{ isToday(date) ? '今天' : date.date }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import { isEmptyString } from '../../../helpers/utils'
  import AuInput from '../../input'
  import AuIcon from '../../icon'

  export default {
    name: 'au-datepicker',
    mixins: [ValidatorMixin, FormApiMixin],
    components: { AuInput, AuIcon },
    data () {
      return {
        dateObj: {},
        inputValue: this.format(this.value),
        // the significant value after last fomat
        lastInputValue: this.format(this.value),
        dates: [],
        renderedDateObj: {},
        popup: false
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '请选择日期'
      }
    },
    computed: {
      calcedWarnings () {
        if (this.warnings) return this.warnings
        let res = []
        for (let key in this.localWarnings) {
          res.push(this.localWarnings[key])
        }
        return res.length ? res : null
      }
    },
    watch: {
      value (v) {
        this.changeInputValue(v)
        this.localValue = v
      },
      inputValue (v) {
        let res = this.format(v)
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
          31, year % 4 === 0 ? 29 : 28, 31,
          30, 31, 30,
          31, 31, 30,
          31, 30, 31
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
        let {year, month} = this.renderedDateObj
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
        function limitYMD (ymdArr) {
          if (!ymdArr.length) return ''
          if (!ymdArr[1]) ymdArr[1] = 1
          if (!ymdArr[2]) ymdArr[2] = 1
          // the date count of this month
          let dayCount = monthDayCount(ymdArr[0])[ymdArr[1] - 1]
          // limit the date range
          ymdArr[0] = Number(ymdArr[0]) < 1900 ? 1900 : (Number(ymdArr[0]) > 2200 ? 2200 : Number(ymdArr[0]))
          ymdArr[1] = Number(ymdArr[1]) < 1 ? 1 : (Number(ymdArr[1]) > 12 ? 12 : Number(ymdArr[1]))
          ymdArr[2] = Number(ymdArr[2]) < 1 ? 1 : (Number(ymdArr[2]) > dayCount ? dayCount : Number(ymdArr[2]))
          // supplement "0"
          if (ymdArr[1].toString().length === 1) ymdArr[1] = '0' + ymdArr[1]
          if (ymdArr[2].toString().length === 1) ymdArr[2] = '0' + ymdArr[2]
          return ymdArr.join('-')
        }

        if (isEmptyString(value)) return ''
        return limitYMD(reConstruct(value))
      },
      changeInputValue (value, e) {
        let res = this.format(value)
        if (value === '' || res) {
          if (res !== this.inputValue) {
            this.inputValue = res
            this.lastInputValue = res
            this.$emit('input', value, e) // input first to ensure changes of father comp
            this.$emit('change', value, e)
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
          dateObj.year = dateObj.year < 1900 ? 1900 : dateObj.year > 2200 ? 2200 : dateObj.year
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
      labelClick () {
        if (!this.disabled) this.$refs.core.$refs.core.focus()
      },
      coreFocus () {
        this.popup = true
      },
      coreBlur (v, e) {
        if (e.relatedTarget !== this.$refs.popup) this.popup = false
      },
      popupBlur (e) {
        if (e.relatedTarget !== this.$refs.core.$refs.core) this.popup = false
      }
    }
  }
</script>

