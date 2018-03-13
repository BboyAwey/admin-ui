<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/sizegap';
  .au-timepicker {
    display: inline-block;
    position: relative;
  }
  .au-timepicker-container {
    position: relative;
  }
  .au-timepicker-core {
    width: 100%;
  }
  .au-timepicker-popup {
    position: absolute;
    z-index: $z-level-1;
    top: 34px;
    left: 0;
    width: 198px;
    height: 166px;
    border-width: 1px;
    border-style: solid;
    overflow: hidden;
    outline: none;
  }
  .au-timepicker-timelist {
    position: relative;
    float: left;
    width: 65px;
    padding: 64px 0;
    transition: top .2s ease-out;
    & > li {
      height: 32px;
      line-height: 32px;
      font-size: $normal;
      text-align: center;
      user-select: none;
      cursor: pointer;
    }
  }
  .au-timepicker-timelist:last-child {
    width: 66px;
  }
  .au-timepicker-no-seconds {
    width: 98px
  }
  .au-timepicker-no-seconds:last-child {
    width: 98px;
  }
  .au-timepicker-timelist:not(:last-child) {
    border-right-width: 1px;
    border-right-style: solid;
  }
  .au-timepicker.au-form-small {
    .au-timepicker-popup {
      top: 30px;
    }
  }
  .au-timepicker.au-form-small {
    .au-timepicker-label {
      cursor: not-allowed;
    }
  }
  /*hack input-icon*/
  // .active .au-input-icon {
  //   color: $primary;
  // }
</style>
<template>
  <div class="au-timepicker au-theme-font-color--base-3"  :style="{display: !inline && fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="inline"
      :warnings="warnings || localWarnings">
      <div class="au-timepicker-container">
        <au-input
          class="au-timepicker-core"
          icon="clock-o"
          v-model="inputTime"
          @input="input"
          :warning="hasWarnings"
          :size="size"
          :inline="false"
          :fullfill-with="inline && fullWidth"
          :width="width || '114px'"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          @focus="coreFocus"
          @blur="coreBlur"
          ref="core"/>
        <div class="au-timepicker-popup" :class="`
          au-theme-border-color--base-8
          au-theme-font-color--base-3
          au-theme-background-color--base-12
          au-theme-box-shadow--level-2
          au-sizegap-${size}
        `" ref="popup" v-show="popup" tabindex="0" @blur="popupBlur">
          <ul
            class="au-timepicker-timelist au-timepicker-hours au-theme-border-color--base-8"
            :class="{'au-timepicker-no-seconds': !seconds}"
            ref="hours"
            @click.stop
            :style="{
              top: hoursOffset + 'px'
            }">
            <li
              v-for="(num, index) in 24"
              :key="index"
              @click.stop="selectTime(num, 'hour')"
              :class="{
                'au-theme-font-color--primary-3': isValid(num, 'h') && num - 1 == hour,
                'au-theme-font-color--base-7': !isValid(num, 'h'),
              }" :style="{
                cursor: isValid(num, 'h') ? '' : 'not-allowed'
              }">{{ formatNum(num - 1) }}</li>
          </ul>
          <ul
            class="au-timepicker-timelist au-timepicker-minutes au-theme-border-color--base-8"
            :class="{'au-timepicker-no-seconds': !seconds}"
            ref="minutes"
            @click.stop
            :style="{ top: minutesOffset + 'px' }">
            <li
              v-for="num in 60"
              :key="num"
              @click.stop="selectTime(num, 'minute')"
              :class="{
                'au-theme-font-color--primary-3': isValid(num, 'm') && num - 1 == minute,
                'au-theme-font-color--base-7': !isValid(num, 'm')
              }" :style="{
                cursor: isValid(num, 'm') ? '' : 'not-allowed'
              }">{{ formatNum(num - 1) }}</li>
          </ul>
          <ul
            v-if="seconds"
            class="au-timepicker-timelist au-timepicker-seconds au-theme-border-color--base-8"
            ref="seconds"
            @click.stop
            :style="{ top: secondsOffset + 'px' }">
            <li
              v-for="num in 60"
              :key="num"
              @click.stop="selectTime(num, 'second')"
              :class="{
                'au-theme-font-color--primary-3': isValid(num, 's') && num - 1 == second,
                'au-theme-font-color--base-7': !isValid(num, 's')
              }" :style="{
                cursor: isValid(num, 's') ? '' : 'not-allowed'
              }">{{ formatNum(num - 1) }}</li>
          </ul>
        </div>
      </div>
    </form-item>
  </div>
</template>
<script>
import FormApiMixin from '../../../helpers/form-api-mixin'
import ValidatorMixin from '../../../helpers/validator-mixin'
import { mousewheel } from '../../../helpers/dom'
import { isEmptyString } from '../../../helpers/utils'
import AuInput from '../../input'
import FormItem from '../../../helpers/form-item.vue'

const SPEED = 32
const HOURSRANGE = 736
const MSRANGE = 1888

function getNumberIncludeZero (number) {
  if (number === '') return false
  else return number || (Number(number) === 0 ? '0' : false)
}

export default {
  name: 'au-timepicker',
  mixins: [FormApiMixin, ValidatorMixin],
  components: { AuInput, FormItem },
  mounted () {
    mousewheel('add', this.$refs.hours, (e) => { this.listScroll(e, 'hour') })
    mousewheel('add', this.$refs.minutes, (e) => { this.listScroll(e, 'minute') })
    mousewheel('add', this.$refs.seconds, (e) => { this.listScroll(e, 'second') })

    this.initSeparateTime()
  },
  data () {
    return {
      inputTime: this.initTime(),
      time: this.initTime(),
      hour: '',
      minute: '',
      second: '',
      hoursOffset: 0,
      minutesOffset: 0,
      secondsOffset: 0,
      popup: false
    }
  },
  props: {
    seconds: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    start: String,
    end: String,
    readonly: Boolean,
    fullWidth: Boolean,
    width: String
  },
  watch: {
    popup (v) {
      if (v) {
        let now = new Date()
        this.scrollTo([
          getNumberIncludeZero(this.hour) || this.formatNum(now.getHours()),
          getNumberIncludeZero(this.minute) || this.formatNum(now.getMinutes()),
          getNumberIncludeZero(this.second) || this.formatNum(now.getSeconds())])
        this.$emit('focus', this.time)
      } else {
        if (isEmptyString(this.inputTime)) {
          this.clear()
        } else {
          this.setTime()
        }
        this.$emit('blur', this.time)
      }
    },
    value () {
      let res = this.initTime()
      this.inputTime = res
      this.time = res
      if (res) this.setSeparateTime(res.split(':'))
    },
    time (v) {
      this.$emit('input', v)
      this.$emit('change', v)
    },
    inputTime (v) {
      if (isEmptyString(v)) { // clear
        this.clear()
      }
      let res = this.formatTime(v)
      if (res) {
        this.setSeparateTime(res)
        this.scrollTo(res)
      }
    }
  },
  computed: {
    validTime () {
      let res = {
        start: {
          h: 0,
          m: 0,
          s: 0
        },
        end: {
          h: 23,
          m: 59,
          s: 59
        }
      }
      let start = this.start ? this.start.split(':') : ''
      let end = this.end ? this.end.split(':') : ''
      if (start) {
        res.start.h = Number(start[0])
        if (Number(this.hour) < res.start.h) {
          res.start.m = ''
          res.start.s = ''
        }
        if (Number(this.hour) > res.start.h) {
          res.start.m = 0
          res.start.s = 0
        }
        if (Number(this.hour) === res.start.h) {
          res.start.m = Number(start[1])
          if (Number(this.minute) < res.start.m) res.start.s = ''
          if (Number(this.minute) > res.start.m) res.start.s = 0
          if (Number(this.minute) === res.start.m) res.start.s = start[2] ? start[2] : 0
        }
      }
      if (end) {
        res.end.h = Number(end[0])
        if (Number(this.hour) > res.end.h) {
          res.end.m = ''
          res.end.s = ''
        }
        if (Number(this.hour) < res.end.h) {
          res.end.m = 59
          res.end.s = 59
        }
        if (Number(this.hour) === res.end.h) {
          res.end.m = Number(end[1])
          if (Number(this.minute) > res.end.m) res.end.s = ''
          if (Number(this.minute) < res.end.m) res.end.s = 59
          if (Number(this.minute) === res.end.m) res.end.s = end[2] ? end[2] : 59
        }
      }
      return res
    }
  },
  methods: {
    formatNum (num) {
      return Number(num) < 10 ? ('0' + Number(num)) : Number(num)
    },
    selectTime (num, type) {
      // hour, minute, second
      if (!this.isValid(num, type[0])) return
      this[type] = this.formatNum(num - 1)
      this.setTime()
    },
    setTime () {
      // handle start and end
      function getTime (h, m, s = 0) {
        return new Date(2018, 1, 1, h, m, s).getTime()
      }
      let input = getTime(this.hour, this.minute, this.second)
      let time = null
      let start = this.start ? this.formatTime(this.start) : ''
      let end = this.end ? this.formatTime(this.end) : ''
      if (start) {
        if (input < getTime(...start)) {
          time = start
        } else {
          if (end) {
            if (input > getTime(...end)) {
              time = end
            }
          }
        }
      } else {
        if (end) {
          if (input > getTime(...end)) {
            time = end
          }
        }
      }
      if (time) {
        this.time = this.formatNum(time[0]) +
          ':' + this.formatNum(time[1]) +
          (this.seconds ? (':' + this.formatNum(time[2])) : '')
      } else {
        this.time =
          this.formatNum(this.hour) +
          ':' + this.formatNum(this.minute) +
          (this.seconds ? (':' + this.formatNum(this.second ? this.second : 0)) : '')
      }
      this.inputTime = this.time
    },
    setSeparateTime (timeArr) {
      this.hour = timeArr[0] ? this.formatNum(timeArr[0]) : ''
      this.minute = timeArr[1] ? this.formatNum(timeArr[1]) : ''
      this.second = timeArr[2] ? this.formatNum(timeArr[2]) : ''
    },
    listScroll (e, type) {
      e.stopPropagation()
      let direction = e.deltaY || e.detail // chrome,edge / firefox
      if (!direction) return
      let speedy = SPEED * ((direction < 0 ? -direction : direction) / direction)
      let range = type === 'hour' ? HOURSRANGE : MSRANGE
      if (this[type + 'sOffset'] >= 0) {
        this[type + 'sOffset'] -= speedy > 0 ? speedy : 0
      } else if (this[type + 'sOffset'] <= -range) {
        this[type + 'sOffset'] -= speedy < 0 ? speedy : 0
      } else {
        this[type + 'sOffset'] -= speedy
      }
    },
    scrollTo (timeArr) {
      this.hour = timeArr[0]
      this.minute = timeArr[1]
      this.second = timeArr[2]

      this.hoursOffset =
        Number(this.hour) * SPEED > HOURSRANGE
          ? -HOURSRANGE
          : -Number(this.hour) * SPEED
      this.minutesOffset =
        Number(this.minute) * SPEED > MSRANGE
          ? -MSRANGE
          : -Number(this.minute) * SPEED
      this.secondsOffset =
        Number(this.second) * SPEED > MSRANGE
          ? -MSRANGE
          : -Number(this.second) * SPEED
    },
    clear () {
      this.inputTime = ''
      this.time = ''
      this.hour = ''
      this.minute = ''
      this.second = ''
    },
    formatTime (value) {
      if (value.indexOf(':') === -1) return false

      let timeArr = value.split(':')
      timeArr = timeArr.map((num) => {
        return Number(num)
      })
      for (let i = 0; i < 2; i++) {
        if (!timeArr[i] && timeArr[i] !== 0) return false
      }

      if (timeArr[0] > 23 || timeArr[0] < 0) return false
      if (timeArr[1] > 59 || timeArr[1] < 0) return false
      if (timeArr[2]) if (timeArr[2] > 59 || timeArr[2] < 0) return false

      timeArr.forEach(num => {
        return this.formatNum(num)
      })

      return timeArr.slice(0, 3)
    },
    initTime () {
      return this.formatTime(this.value) ? this.formatTime(this.value).map(num => {
        return this.formatNum(num)
      }).join(':') : ''
    },
    initSeparateTime () {
      let res = ['', '', '']
      if (this.value) {
        res = this.formatTime(this.value) ? this.formatTime(this.value).map(num => {
          return this.formatNum(num)
        }) : false
      }
      this.setSeparateTime(res)
    },
    popupBlur (e) {
      if (e.relatedTarget !== this.$refs.core.$refs.core) this.popup = false
    },
    coreFocus () {
      if (this.readonly) return
      this.popup = true
    },
    coreBlur (v, e) {
      if (e.relatedTarget !== this.$refs.popup) this.popup = false
    },
    isValid (value, type) {
      value = value - 1
      if (this.validTime.end[type] === '' || this.validTime.start[type] === '') {
        return false
      }
      return Number(value) <= this.validTime.end[type] && Number(value) >= this.validTime.start[type]
    }
  }
}
</script>
