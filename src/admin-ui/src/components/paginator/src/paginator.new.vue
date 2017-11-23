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
      min-width: 40px;
      height: 32px;
      padding: 0 5px;
      border-top-width: 1px;
      border-top-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-right-width: 1px;
      border-right-style: solid;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
    }
    & > ul > .ellipsis{
      border-bottom: none;
      border-top: none;
    }
    & > ul > .current{
      border: none;
    }
    & > ul > .disabled{
      cursor: not-allowed;
    }
    & > ul > li:not(.current):not(.disabled):not(.ellipsis):hover{
      cursor: pointer;
    }
    & > ul > li:first-child {
      border-left-width: 1px;
      border-left-style: solid;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    & > ul > li:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
</style>
<template>
  <div class="au-paginator">
    <ul>
      <li class="au-theme-border-color--base-8 au-theme-font-color--base-3"
        :class="{
          'disabled': !canPrev,
          'au-theme-border-color--base-8': true,
          'au-theme-font-color--base-3': canPrev,
          'au-theme-font-color--base-6': !canPrev,
          'au-theme-background-color--base-9': !canPrev,
          'au-theme-hover-background-color--base-10': canPrev,
          'au-theme-hover-font-color--primary-3': canPrev
        }" @click="prev">
        <au-icon type="angle-left" size="16px"></au-icon>
      </li>
      <li
        v-for="num in nums"
        :key="num"
        :class="{
          'current': num == localCurrent,
          'ellipsis': num == '···',
          'au-theme-font-color--primary-3': num == localCurrent,
          'au-theme-background-color--primary-5': num == localCurrent,
          'au-theme-border-color--base-8': num != localCurrent,
          'au-theme-font-color--base-3': num != localCurrent,
          'au-theme-background-color--base-12': num != localCurrent,
          'au-theme-hover-background-color--base-10': num != localCurrent && num != '···',
          'au-theme-hover-font-color--primary-3': num != localCurrent && num != '···'
        }"
        @click="paginate(num)">{{ num }}</li>
      <li class="au-theme-border-color--base-8 au-theme-font-color--base-3"
        :class="{
          'disabled': !canNext,
          'au-theme-border-color--base-8': true,
          'au-theme-font-color--base-3': canNext,
          'au-theme-font-color--base-6': !canNext,
          'au-theme-background-color--base-9': !canNext,
          'au-theme-hover-background-color--base-10': canNext,
          'au-theme-hover-font-color--primary-3': canNext
        }" @click="next">
        <au-icon type="angle-right" size="16px"></au-icon>
      </li>
    </ul>
  </div>
</template>
<script>
  import AuIcon from '../../icon'
  export default {
    name: 'au-paginator',
    components: { AuIcon },
    data () {
      return {
        localCurrent: this.current
      }
    },
    props: {
      total: {
        type: [Number, String],
        default: 0
      },
      current: {
        type: [Number, String],
        default: 1
      },
      size: {
        type: [Number, String],
        default: 10
      }
    },
    computed: {
      pageCount () {
        return this.total < this.size ? 1 : this.total / this.size
      },
      nums () {
        if (this.pageCount < 10) {
          let res = []
          for (let i = 1; i < this.pageCount; i++) {
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
      }
    },
    methods: {
      paginate (num) {
        if (num !== '···') this.localCurrent = num
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

