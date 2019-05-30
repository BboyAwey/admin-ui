<style lang="scss">
  .au-paginator {
    display: inline-block;
    user-select: none;
    & > ul:after {
      content: "";
      display: block;
      clear: both;
    }
    & > ul > li {
      float: left;
      min-width: 32px;
      height: 32px;
      padding: 0 5px;
      border-width: 1px;
      border-style: solid;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
    }
    & > ul > .ellipsis{
      // border-bottom: none;
      // border-top: none;
      // border: none;
    }
    .fast-ward {
      display: none;
    }
    .ellipsis:hover {
      .ellipsis-text {
        display: none;
      }
      .fast-ward {
        display: inline;
      }
    }
    & > ul > .current{
      border: none;
    }
    & > ul > .disabled{
      cursor: not-allowed;
    }
    & > ul > li:not(.current):not(.disabled):hover{
      cursor: pointer;
    }
    & > ul > li:not(:last-child) {
      margin-right: 8px;
    }
    // & > ul > li:first-child {
    //   border-left-width: 1px;
    //   border-left-style: solid;
    //   border-top-left-radius: 3px;
    //   border-bottom-left-radius: 3px;
    // }
    // & > ul > li:last-child {
    //   border-top-right-radius: 3px;
    //   border-bottom-right-radius: 3px;
    // }
  }
</style>
<template>
  <div class="au-paginator">
    <ul>
      <li class="
        au-theme-border-color--base-9
        au-theme-color--base-3
        au-theme-border-radius--large"
        :class="{
          'disabled': !canPrev,
          'au-theme-border-color--base-9': true,
          'au-theme-color--base-3': canPrev,
          'au-theme-color--base-8': !canPrev,
          'au-theme-background-color--base-10': !canPrev,
          'au-theme-hover-color--primary': canPrev,
          'au-theme-hover-border-color--primary': canPrev
        }" @click="prev">
        <au-icon type="angle-left" size="16px"></au-icon>
      </li>
      <li
        v-for="(num, i) in nums"
        :key="i"
        class="au-theme-border-radius--large"
        :class="{
          'current': num == localCurrent,
          'ellipsis': num == '···',
          'au-theme-color--base-12': num == localCurrent,
          'au-theme-background-color--primary': num == localCurrent,
          'au-theme-border-color--base-9': num != localCurrent,
          'au-theme-color--base-3': num != localCurrent,
          'au-theme-background-color--base-12': num != localCurrent,
          'au-theme-hover-border-color--primary': num != localCurrent,
          'au-theme-hover-color--primary': num != localCurrent
        }"
        @click="paginate(num, i)">
          <span class="ellipsis-text">{{ num }}</span>
          <span class="fast-ward"><au-icon :type="i < nums.indexOf(localCurrent) ? 'angle-double-left' : 'angle-double-right'" /></span>
        </li>
      <li class="
        au-theme-border-color--base-9
        au-theme-color--base-3
        au-theme-border-radius--large"
        :class="{
          'disabled': !canNext,
          'au-theme-border-color--base-9': true,
          'au-theme-color--base-3': canNext,
          'au-theme-color--base-8': !canNext,
          'au-theme-background-color--base-10': !canNext,
          'au-theme-hover-color--primary': canNext,
          'au-theme-hover-border-color--primary': canNext
        }" @click="next">
        <au-icon type="angle-right" size="16px"></au-icon>
      </li>
    </ul>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
export default {
  name: 'au-paginator',
  components: { AuIcon },
  mounted () {
    if (this.pageCount <= this.localCurrent) this.localCurrent = this.pageCount
  },
  data () {
    return {
      localCurrent: this.current
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  computed: {
    pageCount () {
      return this.total <= this.size ? 1 : Math.ceil(this.total / this.size)
    },
    nums () {
      if (this.pageCount < 10) {
        let res = []
        for (let i = 1; i <= this.pageCount; i++) {
          res.push(i)
        }
        return res
      } else {
        let left = []
        if (this.localCurrent - 5 > 1) {
          let offset = []
          let temp = this.localCurrent + 5 - this.pageCount
          for (let i = 1; i <= 3 + (temp > 0 ? temp : 0); i++) {
            offset.unshift(this.localCurrent - i)
          }
          left = [
            1,
            '···',
            ...offset
          ]
        } else {
          for (let i = 1; i < this.localCurrent; i++) {
            left.push(i)
          }
        }

        let right = []
        if (this.localCurrent + 5 < this.pageCount) {
          let offset = []
          let temp = 5 - this.localCurrent
          for (let i = 1; i <= 3 + (temp > 0 ? temp : 0); i++) {
            offset.push(this.localCurrent + i)
          }
          right = [
            ...offset,
            '···',
            this.pageCount
          ]
        } else {
          for (let i = this.localCurrent + 1; i <= this.pageCount; i++) {
            right.push(i)
          }
        }

        return [
          ...left,
          this.localCurrent,
          ...right
        ]
      }
    },
    canPrev () {
      return this.localCurrent > 1
    },
    canNext () {
      return this.localCurrent < this.pageCount
    }
  },
  watch: {
    current (v) {
      this.localCurrent = v
    },
    localCurrent (v) {
      this.$emit('toggle', v)
    },
    pageCount (v) {
      if (v < this.localCurrent) this.localCurrent = v
    }
  },
  methods: {
    paginate (num, i) {
      if (num !== '···') this.localCurrent = num
      else if (i) {
        if (i < this.nums.indexOf(this.localCurrent)) {
          this.paginate(this.localCurrent - 5)
        } else {
          this.paginate(this.localCurrent + 5)
        }
      }
    },
    next () {
      if (this.canNext) this.localCurrent++
    },
    prev () {
      if (this.canPrev) this.localCurrent--
    }
  }
}
</script>
