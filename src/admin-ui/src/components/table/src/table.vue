<style lang="scss">
  @import '../../../style/vars';
  .border {
    border-width: 1px;
    border-style: solid;
  }
  .border-bottom {
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .border-right {
    border-right-width: 1px;
    border-right-style: solid;
  }
  .border-top {
    border-top-width: 1px;
    border-top-style: solid;
  }
  .au-table {
    // the border around table
    // every tr except the last one in tbody has a bottom line
    width: 100%;
    // border-top-width: 1px;
    // border-top-style: solid;
    // border-bottom-width: 1px;
    // border-bottom-style: solid;
    & > tr:not(:last-child),
    tbody > tr,
    tfoot > tr:not(:last-child),
    thead > tr:not(:last-child) {
      @extend .border-bottom;
    }

    tbody > tr:first-child {
      @extend .border-top;
    }

    th, td {
      padding: 12px;
      text-align: left;
    }
    th {
      font-size: $normal;
    }
    td {
      font-size: $normal;
    }
    tfoot td:only-child {
      font-size: $small;
      text-align: right;
    }

    thead > tr:last-child, {
      @extend .border-bottom;
    }
    tfoot > tr:first-child {
      @extend .border-top;
    }
  }

  .au-bordered {
    @extend .border;
    th,
    td {
      @extend .border-right;
    }
  }
</style>

<template>
  <table class="
    au-table au-theme-border-color--base-9
    au-theme-background-color--base-12"
    :class="{ 'au-bordered' : bordered }" ref="table">
    <slot></slot>
  </table>
</template>

<script>
import { addClass, removeClass } from 'helpers/dom'

export default {
  name: 'au-table',
  props: {
    striped: Boolean,
    bordered: Boolean
  },
  mounted () {
    this.handleAllStyle()
    this.handleStripe()
  },
  updated () {
    this.handleAllStyle()
  },
  watch: {
    striped () {
      this.handleStripe()
    }
  },
  methods: {
    handleAllStyle () {
      let table = this.$refs.table

      let thead = table.querySelectorAll('thead')
      let tbody = table.querySelectorAll('tbody')
      let tfoot = table.querySelectorAll('tfoot')

      // console.log(thead)
      let allTr = table.querySelectorAll('tr')
      let allTd = table.querySelectorAll('td')
      let allTh = table.querySelectorAll('th')
      // let allTd = table.querySelectorAll('td')

      // let theadTr = thead.querySelectorAll('tr')
      // let tbodyTr = tbody.querySelectorAll('tr')
      // let tfootTr = tfoot.querySelectorAll('tr')
      for (let i = 0; i < allTr.length; i++) {
        addClass(allTr[i], 'au-theme-border-color--base-9')
      }
      for (let i = 0; i < allTh.length; i++) {
        addClass(allTh[i], 'au-theme-color--base-3')
      }
      for (let i = 0; i < allTd.length; i++) {
        addClass(allTd[i], 'au-theme-color--base-3 au-theme-border-color--base-9')
      }

      for (let i = 0; i < tfoot.length; i++) {
        let tds = tfoot[i].querySelectorAll('td')
        for (let i = 0; i < tds.length; i++) {
          addClass(tds[i], 'au-theme-color--base-7')
        }
      }

      for (let i = 0; i < thead.length; i++) {
        let ths = thead[i].querySelectorAll('th')
        for (let i = 0; i < ths.length; i++) {
          addClass(ths[i], 'au-theme-color--base-7 au-theme-border-color--base-9')
        }
      }

      if (tbody.length) {
        for (let i = 0; i < tbody.length; i++) {
          let trs = table.querySelectorAll('tbody > tr')
          for (let i = 0; i < trs.length; i++) {
            addClass(trs[i], 'au-theme-hover-background-color--primary-bottom')
          }
          if (this.striped) {
            for (let i = 0; i < trs.length; i++) {
              if (i % 2 === 0) addClass(trs[i], 'au-theme-background-color--base-11')
            }
          }
        }
      } else {
        for (let i = 0; i < allTr.length; i++) {
          if (allTr[i].parentNode === table) addClass(allTr[i], 'au-theme-hover-background-color--primary-bottom')
        }
        if (this.striped) {
          for (let i = 0; i < allTr.length; i++) {
            if (i % 2 === 0) addClass(allTr[i], 'au-theme-background-color--base-11')
          }
        }
      }

      if (tfoot.length && tbody.length) {
        for (let i = 0; i < tbody.length; i++) {
          let lastTr = tbody[i].querySelector('tr:last-child')
          if (lastTr) addClass(lastTr, 'au-theme-border-bottom-color--base-8-important')
        }
      }
      if (tfoot.length) {
        for (let i = 0; i < tfoot.length; i++) {
          let firstTr = tfoot[i].querySelector('tr:first-child')
          if (firstTr) addClass(firstTr, 'au-theme-border-top-color--base-8-important')
        }
      }
      if (thead.length) {
        for (let i = 0; i < thead.length; i++) {
          let lastTr = thead[i].querySelector('tr:last-child')
          if (lastTr) addClass(lastTr, 'au-theme-border-bottom-color--base-8-important')
        }
      }
    },
    handleStripe () {
      let table = this.$refs.table
      let tbody = table.querySelectorAll('tbody')
      if (tbody.length) {
        for (let i = 0; i < tbody.length; i++) {
          let trs = table.querySelectorAll('tbody > tr')
          // clean classes
          for (let i = 0; i < trs.length; i++) {
            removeClass(trs[i], 'au-theme-background-color--base-11')
          }
          if (this.striped) {
            for (let i = 0; i < trs.length; i++) {
              if (i % 2 === 0) addClass(trs[i], 'au-theme-background-color--base-11')
            }
          } else {
            for (let i = 0; i < trs.length; i++) {
              if (i % 2 === 0) removeClass(trs[i], 'au-theme-background-color--base-11')
            }
          }
        }
      } else {
        let allTr = table.querySelectorAll('tr')
        for (let i = 0; i < allTr.length; i++) {
          if (allTr[i].parentNode === table) {
            removeClass(allTr[i], 'au-theme-background-color--base-11')
            if (this.striped) {
              if (i % 2 === 0) addClass(allTr[i], 'au-theme-background-color--base-11')
            } else {
              if (i % 2 === 0) removeClass(allTr[i], 'au-theme-background-color--base-11')
            }
          }
        }
      }
    }
  }
}
</script>
