<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/sizegap';
  .au-timepicker {
    display: inline-block;
    position: relative;
    width: 198px;
  }
  .au-timepicker-label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: $normal;
  }
  .au-timepicker-container {
    position: relative;
  }
  .au-timepicker-core {
    width: 100%;
  }
  .au-timepicker-popup {
    position: absolute;
    z-index: 9990;
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
      text-align: center;
      user-select: none;
    }
    & > .selected {
      // color: $primary;
    }
    & > li:hover {
      // background-color: rgba($primary, .1);
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
  .active .au-input-icon {
    // color: $primary;
  }
</style>
<template>
  <div class="au-timepicker">
    <div class="au-form-label" :class="{
      'au-theme-font-color--base-3': !hasWarnings || disabled,
      'au-theme-font-color--danger-3': hasWarnings,
    }" :style="{
      cursor: disabled ? 'not-allowed' : 'default'
    }" @click="labelClick" v-show="label">{{ label }}</div>
    <div class="au-timepicker-container">
      <au-input
        class="au-timepicker-core"
        icon="clock-o"
        v-model="inputTime"
        @input="input"
        :warnings="calcedWarnings"
        :size="size"
        :disabled="disabled"
        :placeholder="placeholder"
        @focus="coreFocus"
        @blur="coreBlur"
        ref="core"/>
      <div class="au-timepicker-popup" :class="`
        au-theme-border-color--base-8
        au-theme-font-color--base-3
        au-theme-background-color--base-12
        au-sizegap-${size}
      `" ref="popup" v-show="popup" tabindex="0" @blur="popupBlur">
        <ul
          class="au-timepicker-timelist au-timepicker-hours au-theme-border-color--base-8"
          :class="{'au-timepicker-no-seconds': !seconds}"
          ref="hours"
          @click.stop
          :style="{ top: hoursOffset + 'px' }">
          <li
            v-for="num in 24"
            :key="num"
            @click.stop="selectTime(num - 1, 'hour')"
            :class="{
              'au-theme-font-color--primary-3': num - 1 == hour
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
            @click.stop="selectTime(num - 1, 'minute')"
            :class="{
              'au-theme-font-color--primary-3': num - 1 == minute
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
            @click.stop="selectTime(num - 1, 'second')"
            :class="{
              'au-theme-font-color--primary-3': num - 1 == second
            }">{{ formatNum(num - 1) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import { mousewheel } from '../../../helpers/dom'
  import { isEmptyString } from '../../../helpers/utils'
  import AuInput from '../../input'

  const SPEED = 32
  const HOURSRANGE = 736
  const MSRANGE = 1888

  export default {
    name: 'au-timepicker',
    mixins: [FormApiMixin, ValidatorMixin],
    components: { AuInput },
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
      }
    },
    watch: {
      popup (v) {
        if (v) {
          let now = new Date()
          this.scrollTo([
            this.hour || this.formatNum(now.getHours()),
            this.minute || this.formatNum(now.getMinutes()),
            this.second || this.formatNum(now.getSeconds())])
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
      calcedWarnings () {
        if (this.warnings) return this.warnings
        let res = []
        for (let key in this.localWarnings) {
          res.push(this.localWarnings[key])
        }
        return res.length ? res : null
      }
    },
    methods: {
      formatNum (num) {
        return Number(num) < 10 ? ('0' + Number(num)) : Number(num)
      },
      selectTime (num, type) {
        // hour, minute, second
        this[type] = this.formatNum(num)
        this.setTime()
      },
      setTime () {
        this.time =
          this.formatNum(this.hour) +
          ':' + this.formatNum(this.minute) +
          (this.seconds ? (':' + this.formatNum(this.second ? this.second : 0)) : '')
        this.inputTime = this.time
      },
      setSeparateTime (timeArr) {
        this.hour = this.formatNum(timeArr[0])
        this.minute = this.formatNum(timeArr[1])
        this.second = this.formatNum(timeArr[2])
      },
      listScroll (e, type) {
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
      labelClick () {
        if (!this.disabled) this.$refs.core.$refs.core.focus()
      },
      popupBlur (e) {
        if (e.relatedTarget !== this.$refs.core.$refs.core) this.popup = false
      },
      coreFocus () {
        this.popup = true
      },
      coreBlur (v, e) {
        if (e.relatedTarget !== this.$refs.popup) this.popup = false
      }
    }
  }
</script>

