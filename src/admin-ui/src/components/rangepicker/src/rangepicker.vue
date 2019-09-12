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
      // width: 116px;
    }
    .au-rangepicker-time {
      // width: 99px;
    }
    & > * {
      vertical-align: middle;
    }
    & > *:not(:last-child):not(.au-button) {
      margin-right: 5px;
    }
    .au-button:not(:first-child) {
      margin-left: 5px;
    }
  }
  .au-rangepicker-relative {
    // margin-top: 10px;
    max-width: 653px;
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
    margin-left: 0 !important;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }
  .au-rangepicker-to {
    font-size: $normal;
  }
  // .au-rangepicker-pop {
  //   min-width: 633px;
  // }
</style>
<template>
  <div class="au-rangepicker">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="inline">
      <au-popover plain hide-on-blur
        trigger="click"
        :placement="placement"
        ref="popover"
        :disabled="disabled"
        :before-show="beforeShow">
        <au-button slot="target" plain :size="size" :disabled="disabled">
          {{ type !== 'time' ? localRange.startDate : '' }}
          {{ type !== 'date' ? localRange.startTime : '' }}
          <span class="au-theme-color--base-11">{{ !(localRange.startDate || localRange.startTime) ? startPlaceholder : '' }}</span>
          至
          {{ type !== 'time' ? localRange.endDate : '' }}
          {{ type !== 'date' ? localRange.endTime : '' }}
          <span class="au-theme-color--base-11">{{ !(localRange.endDate || localRange.endTime) ? endPlaceholder : '' }}</span>
        </au-button>
        <div class="au-rangepicker-pop"  slot="content" ref="popContent">
          <div class="au-rangepicker-absolute" v-show="absolute" ref="absolute">
            <au-datepicker
              v-show="type !== 'time'"
              class="au-rangepicker-date"
              placeholder="开始日期"
              v-model="startDate"
              :start="valid.startDate.start"
              :end="valid.startDate.end"/>
            <au-timepicker
              v-show="type !== 'date'"
              class="au-rangepicker-time"
              placeholder="开始时间"
              :seconds="seconds"
              width="99px"
              v-model="startTime"
              :start="valid.startTime.start"
              :end="valid.startTime.end"/>
            <span class="au-rangepicker-to">至</span>
            <au-datepicker
              v-show="type !== 'time'"
              class="au-rangepicker-date"
              placeholder="结束日期"
              v-model="endDate"
              :start="valid.endDate.start"
              :end="valid.endDate.end"/>
            <au-timepicker
              v-show="type !== 'date'"
              class="au-rangepicker-time"
              placeholder="结束时间"
              :seconds="seconds"
              width="99px"
              v-model="endTime"
              :start="valid.endTime.start"
              :end="valid.endTime.end"/>
            <au-button type="default" style="margin-left: 0" @click="clear" plain>清空</au-button>
            <au-button type="default" @click="handleCancel">取消</au-button>
            <au-button type="primary" @click="handleConfirm" :disabled="!fullfill">确定</au-button>
          </div>
          <div class="au-rangepicker-relative au-theme-border-color--base-10" v-show="relative && filteredRelatives.length">
            <!-- <div
              class="au-rangepicker-relative-tag au-theme-color--base-3 au-theme-border-color--base-10"
              v-for="(item, i) in filteredRelatives" :key="i"
              :class="{
                'au-theme-hover-color--primary': !isCurrent(item),
                'au-theme-hover-border-color--primary': !isCurrent(item),
                'au-theme-background-color--primary': isCurrent(item),
                'au-theme-color--base-12': isCurrent(item)
              }"
              :style="{
                border: isCurrent(item) ? 'none' : ''
              }"
              size="small"
              @click="handleRelativeTagClick(item)">
              {{ item.text }}
            </div> -->
            <au-tag
              class="au-rangepicker-relative-tag"
              v-for="(item, i) in filteredRelatives" :key="i"
              size="small"
              hoverable
              :active="isCurrent(item)"
              @click.native="handleRelativeTagClick(item)">
              {{ item.text }}
            </au-tag>
          </div>
        </div>
      </au-popover>
    </form-item>
  </div>
</template>
<script>
import Button from 'components/button'
import Popover from 'components/popover'
import Datepicker from 'components/datepicker'
import Timepicker from 'components/timepicker'
import Tag from 'components/tag'
import FormApiMixin from 'helpers/form-api-mixin'
import { isEmptyString } from 'helpers/utils'
import { getElementSize } from 'helpers/dom'
import FormItem from 'helpers/form-item.vue'

let formApiMixin = { props: FormApiMixin.props }
formApiMixin.props.value = null

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
  if (date) return date.split('-').map(e => padNum(e)).join('-')
  else return ''
}

function padTimeStr (time) {
  if (time) return time.split(':').map(e => padNum(e)).join(':')
  else return ''
}

function resolveRange (range) {
  let temp = {}
  if (range.relative) {
    temp = getRangeFromDateObj(new Date(), range.relative)
    temp.relative = range.relative
  } else {
    if (range.startDate || isEmptyString(range.startDate)) temp.startDate = padDateStr(range.startDate)
    if (range.startTime || isEmptyString(range.startTime)) temp.startTime = padTimeStr(range.startTime)
    if (range.endDate || isEmptyString(range.endDate)) temp.endDate = padDateStr(range.endDate)
    if (range.endTime || isEmptyString(range.endDate)) temp.endTime = padTimeStr(range.endTime)
  }
  return temp
}

function getRangeFromDateObj (dateObj, span = 30 * 60 * 1000) {
  // default range is 30 minutes
  let now = dateObj.getTime()
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
  if (!dateStr) return 0
  let dateArr = dateStr.split('-')
  dateArr[1] = dateArr[1] - 1
  return (new Date(...dateArr)).getTime()
}

function getMsFromTimeStr (timeStr) {
  if (!timeStr) return 0
  return timeStr.split(':').reverse().reduce((t, c, i) => Math.pow(60, i) * c + t, 0) * 1000
}

function getTimeStrFromMs (ms) {
  let h = Math.floor(ms / 1000 / 60 / 60)
  let m = Math.floor(((ms / 1000 / 60 / 60) - h) * 60)
  let s = Math.ceil((((ms / 1000 / 60 / 60) - h) * 60 - m) * 60)
  return `${padNum(h)}:${padNum(m)}:${padNum(s)}`
}

// function getSpanFromRange (range) {
//   if (range.startDate && range.endDate && !(range.startTime && range.endTime)) {
//     return getTimeFromDateStr(range.endDate) - getTimeFromDateStr(range.startDate)
//   }
//   if (range.startTime && range.endTime && !(range.startDate && range.endDate)) {
//     return getMsFromTimeStr(range.endTime) - getMsFromTimeStr(range.startTime)
//   }
//   if (range.startTime && range.endTime && range.startDate && range.endDate) {
//     return new Date(
//       getTimeFromDateStr(range.endDate) +
//       getMsFromTimeStr(range.endTime)) -
//       new Date(
//       getTimeFromDateStr(range.startDate) +
//       getMsFromTimeStr(range.startTime))
//   }
// }

function isRangeChange (a, b, type) {
  if (type === 'time') {
    return (
      padTimeStr(a.startTime) !== b.startTime ||
      padTimeStr(a.endTime) !== b.endTime ||
      a.relative !== b.relative
    )
  } else if (type === 'date') {
    return (
      padDateStr(a.startDate) !== b.startDate ||
      padDateStr(a.endDate) !== b.endDate ||
      a.relative !== b.relative
    )
  } else {
    return (
      padTimeStr(a.startTime) !== (b.startTime || '') ||
      padTimeStr(a.endTime) !== (b.endTime || '') ||
      padDateStr(a.startDate) !== (b.startDate || '') ||
      padDateStr(a.endDate) !== (b.endDate || '') ||
      a.relative !== b.relative
    )
  }
}

export default {
  name: 'au-rangepicker',
  mixins: [formApiMixin],
  components: {
    auButton: Button,
    auPopover: Popover,
    auDatepicker: Datepicker,
    auTimepicker: Timepicker,
    auTag: Tag,
    FormItem
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
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    span: [Number, String],
    seconds: {
      type: Boolean,
      default: true
    },
    startPlaceholder: {
      type: String,
      default: '请选择开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '请选择结束时间'
    },
    relative: {
      type: Boolean,
      default: true
    },
    relatives: {
      type: Array,
      default () {
        return [
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
          },
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
          },
          {
            text: '最近3个月',
            span: 7776000000
          },
          {
            text: '最近6个月',
            span: 15552000000
          }
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
    }
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
        startDate: startDate ? startDate.split('-').map((e, i) => i > 0 ? padNum(e) : e).join('-') : null,
        startTime: startTime ? startTime.split(':').map((e, i) => padNum(e)).join(':') : null,
        endDate: endDate ? endDate.split('-').map((e, i) => i > 0 ? padNum(e) : e).join('-') : null,
        endTime: endTime ? endTime.split(':').map((e, i) => padNum(e)).join(':') : null
      }
    },
    valid () {
      let {
        validRange,
        startDate,
        startTime,
        endDate,
        endTime,
        span,
        type
      } = this
      span = Number(span)

      let res = {
        startDate: {
          start: validRange.startDate,
          end: endDate || validRange.endDate
        },
        startTime: {
          start: startDate === validRange.startDate ? validRange.startTime : null,
          end: startDate === endDate ? endTime : (startDate === validRange.endDate ? validRange.endTime : null)
        },
        endDate: {
          start: startDate || validRange.startDate,
          end: validRange.endDate
        },
        endTime: {
          start: endDate === startDate ? startTime : (endDate === validRange.startDate ? validRange.startTime : null),
          end: endDate === validRange.endDate ? validRange.endTime : null
        }
      }

      if (type !== 'time' && span && endDate) {
        startTime = startTime || '00:00:00'
        endTime = endTime || '00:00:00'
        let validStartMs = getTimeFromDateStr(validRange.startDate) + getMsFromTimeStr(startTime)
        let endMs = getTimeFromDateStr(endDate) + getMsFromTimeStr(endTime)
        if (span < endMs - validStartMs) {
          let temp = resolveTimestamp(endMs - span)
          res.startDate.start = `${temp.Y}-${temp.M}-${temp.D}`
          if (startDate === res.startDate.start) {
            res.startTime.start = `${temp.h}:${temp.m}:${temp.s}`
          }
        }
      }

      if (type !== 'time' && span && startDate) {
        startTime = startTime || '00:00:00'
        endTime = endTime || '00:00:00'
        let validEndMs = getTimeFromDateStr(validRange.endDate) + getMsFromTimeStr(endTime)
        let startMs = getTimeFromDateStr(startDate) + getMsFromTimeStr(startTime)
        if (startMs + span < validEndMs) {
          let temp = resolveTimestamp(startMs + span)
          res.endDate.end = `${temp.Y}-${temp.M}-${temp.D}`
          if (endDate === res.endDate.end) {
            res.endTime.end = `${temp.h}:${temp.m}:${temp.s}`
          }
        }
      }

      if (span && type === 'time') {
        if (endTime) {
          let validStartMs = getMsFromTimeStr(validRange.startTime)
          let endMs = getMsFromTimeStr(endTime)
          if (span < endMs - validStartMs) {
            res.startTime.start = getTimeStrFromMs(endMs - span)
          }
        }
        if (startTime) {
          let validEndMs = getMsFromTimeStr(validRange.endTime)
          let startMs = getMsFromTimeStr(startTime)
          if (startMs + span < validEndMs) {
            res.endTime.end = getTimeStrFromMs(startMs + span)
          }
        }
      }

      return res
    },
    filteredRelatives () {
      return this.relatives.filter(e => {
        if (this.type === 'time') return e.span < 86400000 && (!this.span || e.span <= this.span)
        else if (this.type === 'date') return e.span >= 86400000 && (!this.span || e.span <= this.span)
        else return !this.span || e.span <= this.span
      })
    }
  },
  watch: {
    localRange: {
      deep: true,
      handler (v) {
        if (isRangeChange(v, this.range, this.type)) {
          this.$emit('change', resolveRange(v))
        }
      }
    },
    range: {
      deep: true,
      handler (v) {
        if (isRangeChange(v, this.localRange, this.type)) {
          this.localRange = Object.assign(
            { relative: v.relative },
            resolveRange(v.relative ? getRangeFromDateObj(new Date(), v.relative) : v)
          )
        }
      }
    }
  },
  methods: {
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
      let now = new Date()
      let temp = {}
      let endSpot = now.getTime()
      let span = item.span

      if (this.end) {
        let end = this.end.split(/\s+/)
        let endStamp =
          getTimeFromDateStr(end.find(e => e.indexOf('-') !== -1)) +
          getMsFromTimeStr(end.find(e => e.indexOf(':') !== -1))
        endSpot = endStamp < endSpot ? endStamp : endSpot
      }

      if (this.start) {
        let start = this.start.split(/\s+/)
        let startStamp =
          getTimeFromDateStr(start.find(e => e.indexOf('-') !== -1)) +
          getMsFromTimeStr(start.find(e => e.indexOf(':') !== -1))
        if (endSpot - span < startStamp) span = endSpot - startStamp
      }

      temp = getRangeFromDateObj(new Date(endSpot), span)
      let res = {}
      if (Object.keys(this.localRange).length) {
        for (let key in this.localRange) {
          res[key] = temp[key]
        }
      } else {
        res = temp
      }

      res.relative = item.span
      this.localRange = res
      this.$refs.popover.hide()
      this.splitRange(res)
    },
    isCurrent (item) {
      // return item.span === getSpanFromRange(this.localRange)
      return item.span === this.localRange.relative
    },
    clear () {
      // this.localRange = {}
      this.startDate = ''
      this.startTime = ''
      this.endDate = ''
      this.endTime = ''
    },
    splitRange (range, callback) { // to avoid memory overflow
      this.startDate = range.startDate || ''
      this.$nextTick(() => {
        this.startTime = range.startTime || ''
        this.$nextTick(() => {
          this.endDate = range.endDate || ''
          this.$nextTick(() => {
            this.endTime = range.endTime || ''
            if (typeof callback === 'function') {
              // eslint-disable-next-line
              callback({
                startDate: this.startDate,
                startTime: this.startTime,
                endDate: this.endDate,
                endTime: this.endTime
              })
            }
          })
        })
      })
    },
    beforeShow () {
      this.$refs.popContent.style.width = getElementSize(this.$refs.absolute).width + 'px'
      this.splitRange(this.localRange)
    }
  }
}
</script>
