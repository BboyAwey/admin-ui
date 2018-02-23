<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  .au-rangepicker {
    display: inline-block;
  }
  .au-rangepicker-absolute {
    display: inline-block;
    margin-bottom: 10px;
    padding: 10px 10px 0 10px;
    // letter-spacing: -4px; // safari
    // word-spacing: -4px;
    font-size: 0; // chrome firefox
    .au-rangepicker-date {
      width: 116px;
    }
    .au-rangepicker-time {
      width: 99px;
    }
    & > *:not(:last-child) {
      margin-right: 5px;
    }
  }
  .au-rangepicker-relative {
    // margin-top: 10px;
    padding: 10px;
    padding-bottom: 0;
    border-top-width: 1px;
    border-top-style: solid;
    font-size: $small;
  }
  .au-rangepicker-relative-tag {
    display: inline-block;
    height: 24px;
    padding: 0 8px;
    border-width: 1px;
    border-style: solid;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }
  .au-rangepicker-to {
    font-size: $normal;
  }
</style>
<template>
  <div class="au-rangepicker">
    <div class="au-form-label" :style="{
      cursor: disabled ? 'not-allowed' : 'default'
    }" v-show="label">{{ label }}</div>
    <au-popover plain hide-on-blur
      trigger="click"
      :placement="placement"
      ref="popover"
      :disabled="disabled"
      @show="handlePopup">
      <au-button slot="target" plain :size="size" :disabled="disabled">
        {{ type !== 'time' ? localRange.startDate : '' }}
        {{ type !== 'date' ? localRange.startTime : '' }}
        <span class="au-theme-font-color--base-7">{{ !(localRange.startDate || localRange.startTime) ? '请选择开始时间' : '' }}</span>
        至
        {{ type !== 'time' ? localRange.endDate : '' }}
        {{ type !== 'date' ? localRange.endTime : '' }}
        <span class="au-theme-font-color--base-7">{{ !(localRange.endDate || localRange.endTime) ? '请选择结束时间' : '' }}</span>
      </au-button>
      <div class="au-rangepicker-pop"  slot="content" ref="popContent">
        <div class="au-rangepicker-absolute" v-show="absolute" ref="absolute">
          <au-datepicker
            v-show="type !== 'time'"
            class="au-rangepicker-date"
            placeholder="开始日期"
            v-model="startDate"
            :start="validRange.startDate"
            :end="endDate ? endDate : null"/>
          <au-timepicker
            v-show="type !== 'date'"
            class="au-rangepicker-time"
            placeholder="开始时间"
            v-model="startTime"
            :start="startDate === validRange.startDate ? validRange.startTime : null"
            :end="startDate === endDate ? endTime : null"/>
          <span class="au-rangepicker-to">至</span>
          <au-datepicker
            v-show="type !== 'time'"
            class="au-rangepicker-date"
            placeholder="结束日期"
            v-model="endDate"
            :end="validRange.endDate"
            :start="startDate ? startDate : null"/>
          <au-timepicker
            v-show="type !== 'date'"
            class="au-rangepicker-time"
            placeholder="结束时间"
            v-model="endTime"
            :end="endDate === validRange.endDate ? validRange.endTime : null"
            :start="endDate === startDate ? startTime : null"/>
          <au-button type="default" @click="clear" plain>清空</au-button>
          <au-button type="default" @click="handleCancel">取消</au-button>
          <au-button type="primary" @click="handleConfirm" :disabled="!fullfill">确定</au-button>
        </div>
        <div class="au-rangepicker-relative au-theme-border-color--base-8" v-show="relative">
          <div
            class="au-rangepicker-relative-tag au-theme-font-color--base-3 au-theme-border-color--base-8"
            v-for="(item, i) in relatives" :key="i"
            :class="{
              'au-theme-hover-font-color--primary-3': !isCurrent(item),
              'au-theme-hover-border-color--primary-3': !isCurrent(item),
              'au-theme-background-color--primary-3': isCurrent(item),
              'au-theme-font-color--base-12': isCurrent(item)
            }"
            :style="{
              border: isCurrent(item) ? 'none' : ''
            }"
            size="small"
            @click="handleRelativeTagClick(item)">
            {{ item.text }}
          </div>
        </div>
      </div>
    </au-popover>
  </div>
</template>
<script>
import Button from '../../button'
import Popover from '../../popover'
import Datepicker from '../../datepicker'
import Timepicker from '../../timepicker'
import Tag from '../../tag'
// import { isEmptyString } from '../../../helpers/utils'
import { getElementSize } from '../../../helpers/dom'

function padNum (num) {
  return Number(num) < 10 ? ('0' + Number(num)) : Number(num)
}

function resolveTimestamp (timestamp) {
  let date = new Date(timestamp)
  return {
    Y: date.getFullYear(),
    M: padNum(date.getMonth() + 1),
    D: padNum(date.getDate()),
    h: padNum(date.getHours()),
    m: padNum(date.getMinutes()),
    s: padNum(date.getSeconds())
  }
}

function padDateStr (date) {
  return date.split('-').map(e => padNum(e)).join('-')
}

function padTimeStr (time) {
  return time.split(':').map(e => padNum(e)).join(':')
}

function resolveRange (range) {
  let temp = {}
  if (range.startDate) temp.startDate = padDateStr(range.startDate)
  if (range.startTime) temp.startTime = padTimeStr(range.startTime)
  if (range.endDate) temp.endDate = padDateStr(range.endDate)
  if (range.endTime) temp.endTime = padTimeStr(range.endTime)
  return temp
}

function getRangeFromNow (span = 30 * 60 * 1000) {
  // default range is 30 minutes
  let now = (new Date()).getTime()
  let start = resolveTimestamp(now - span)
  let end = resolveTimestamp(now)
  return {
    startDate: `${start.Y}-${start.M}-${start.D}`,
    startTime: `${start.h}:${start.m}:${start.s}`,
    endDate: `${end.Y}-${end.M}-${end.D}`,
    endTime: `${end.h}:${end.m}:${end.s}`
  }
}

function getTimeFromDateStr (dateStr) {
  let dateArr = dateStr.split('-')
  dateArr[1] = dateArr[1] - 1
  return (new Date(...dateArr)).getTime()
}

function getMsFromTimeStr (timeStr) {
  return timeStr.split(':').reverse().reduce((t, c, i) => Math.pow(60, i) * c + t, 0) * 1000
}

function getSpanFromRange (range) {
  if (range.startDate && range.endDate && !(range.startTime && range.endTime)) {
    return getTimeFromDateStr(range.endDate) - getTimeFromDateStr(range.startDate)
  }
  if (range.startTime && range.endTime && !(range.startDate && range.endDate)) {
    return getMsFromTimeStr(range.endTime) - getMsFromTimeStr(range.startTime)
  }
  if (range.startTime && range.endTime && range.startDate && range.endDate) {
    return new Date(
      getTimeFromDateStr(range.endDate) +
      getMsFromTimeStr(range.endTime)) -
      new Date(
      getTimeFromDateStr(range.startDate) +
      getMsFromTimeStr(range.startTime))
  }
}

export default {
  name: 'au-rangepicker',
  components: {
    auButton: Button,
    auPopover: Popover,
    auDatepicker: Datepicker,
    auTimepicker: Timepicker,
    auTag: Tag
  },
  model: {
    prop: 'range',
    event: 'change'
  },
  props: {
    range: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'all' // all, date, time
    },
    start: String,
    end: String,
    relative: {
      type: Boolean,
      default: true
    },
    relatives: {
      type: Array,
      default () {
        let hours = [
          {
            text: '最近15分钟',
            span: 900000
          },
          {
            text: '最近30分钟',
            span: 1800000
          },
          {
            text: '最近1小时',
            span: 3600000
          },
          {
            text: '最近3小时',
            span: 10800000
          },
          {
            text: '最近6小时',
            span: 21600000
          },
          {
            text: '最近12小时',
            span: 43200000
          }
        ]
        let days = [
          {
            text: '最近1天',
            span: 86400000
          },
          {
            text: '最近3天',
            span: 259200000
          },
          {
            text: '最近7天',
            span: 604800000
          },
          {
            text: '最近14天',
            span: 1209600000
          },
          {
            text: '最近1个月',
            span: 2592000000
          }
        ]
        return [
          ...this.type !== 'date' ? hours : [],
          ...this.type !== 'time' ? days : []
        ]
      }
    },
    absolute: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom left'
    },
    label: String,
    size: String,
    disabled: Boolean
  },
  data () {
    return {
      localRange: resolveRange(this.range),
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      currentRelative: {}
    }
  },
  computed: {
    fullfill () {
      if (this.type === 'time') {
        return this.startTime && this.endTime
      } else if (this.type === 'date') {
        return this.startDate && this.endDate
      } else {
        return this.startTime && this.endTime && this.startDate && this.endDate
      }
    },
    validRange () {
      let start = this.start.split(/\s+/)
      let end = this.end.split(/\s+/)

      let startDate = start.find(e => e.indexOf('-') !== -1)
      let startTime = start.find(e => e.indexOf(':') !== -1)
      let endDate = end.find(e => e.indexOf('-') !== -1)
      let endTime = end.find(e => e.indexOf(':') !== -1)

      return {
        startDate: startDate !== -1 ? startDate.split('-').map((e, i) => i > 0 ? padNum(e) : e).join('-') : null,
        startTime: startTime !== -1 ? startTime.split(':').map((e, i) => padNum(e)).join(':') : null,
        endDate: endDate !== -1 ? endDate.split('-').map((e, i) => i > 0 ? padNum(e) : e).join('-') : null,
        endTime: endTime !== -1 ? endTime.split(':').map((e, i) => padNum(e)).join(':') : null
      }
    }
  },
  watch: {
    localRange: {
      deep: true,
      handler (v) {
        this.$emit('change', resolveRange(v))
      }
    },
    range: {
      deep: true,
      handler (v) {
        if (
          v.startTime !== this.localRange.startTime ||
          v.endTime !== this.localRange.endTime ||
          v.startDate !== this.localRange.startDate ||
          v.endDate !== this.localRange.endDate
        ) {
          this.localRange = resolveRange(v)
        }
      }
    }
  },
  methods: {
    handlePopup () {
      for (let key in this.localRange) { this[key] = this.localRange[key] }
      this.$nextTick(() => {
        this.$refs.popContent.style.width = getElementSize(this.$refs.absolute).width + 'px'
      })
    },
    handleCancel () {
      this.$refs.popover.hide()
    },
    handleConfirm () {
      this.confirm()
      this.$refs.popover.hide()
    },
    confirm () {
      let temp = {}
      let setTime = () => {
        temp.startTime = this.startTime
        temp.endTime = this.endTime
      }
      let setDate = () => {
        temp.startDate = this.startDate
        temp.endDate = this.endDate
      }
      if (this.type === 'time') {
        setTime()
      } else if (this.type === 'date') {
        setDate()
      } else {
        setTime()
        setDate()
      }
      this.localRange = temp
    },
    handleRelativeTagClick (item) {
      let temp1 = getRangeFromNow(item.span)
      let temp2 = {}
      if (Object.keys(this.localRange).length) {
        for (let key in this.localRange) temp2[key] = temp1[key]
        this.localRange = temp2
      } else {
        this.localRange = temp1
      }
      this.$refs.popover.hide()
    },
    isCurrent (item) {
      return item.span === getSpanFromRange(this.localRange)
    },
    clear () {
      this.localRange = {}
      this.startDate = ''
      this.startTime = ''
      this.endDate = ''
      this.endTime = ''
    }
  }
}
</script>
