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

    thead > tr:last-child {
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
    au-theme-background-color--base-12
    au-theme-color--base-3"
    :class="{ 'au-bordered' : bordered }">
    <slot></slot>
  </table>
</template>

<script>
import { addClass, removeClass } from 'helpers/dom'

export default {
  name: 'au-table',
  props: {
    striped: Boolean,
    bordered: Boolean,
    hovered: {
      type: Boolean,
      default: true
    }
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
    },
    hovered () {
      this.handleAllStyle()
    }
  },
  methods: {
    handleAllStyle () {
      let table = this.$el

      let theads = table.querySelectorAll('thead')
      let tbodys = table.querySelectorAll('tbody')
      let tfoots = table.querySelectorAll('tfoot')

      let allTr = table.querySelectorAll('tr')
      let allTd = table.querySelectorAll('td')
      let allTh = table.querySelectorAll('th')

      for (let i = 0; i < allTr.length; i++) {
        addClass(allTr[i], 'au-theme-border-color--base-9')
      }
      for (let i = 0; i < allTh.length; i++) {
        addClass(allTh[i], 'au-theme-color--base-3')
      }
      for (let i = 0; i < allTd.length; i++) {
        addClass(allTd[i], 'au-theme-color--base-3 au-theme-border-color--base-9')
      }

      for (let i = 0; i < tfoots.length; i++) {
        let tds = tfoots[i].querySelectorAll('td')
        for (let i = 0; i < tds.length; i++) {
          addClass(tds[i], 'au-theme-color--base-7')
        }
      }

      for (let i = 0; i < theads.length; i++) {
        let ths = theads[i].querySelectorAll('th')
        for (let i = 0; i < ths.length; i++) {
          addClass(ths[i], 'au-theme-color--base-7 au-theme-border-color--base-9')
        }
      }
      // handle hovered color
      if (this.hovered) {
        if (tbodys.length) {
          for (let i = 0; i < tbodys.length; i++) {
            let trs = table.querySelectorAll('tbody > tr')
            let tbody = tbodys[i]
            for (let i = 0; i < trs.length; i++) {
              if (trs[i].parentNode === tbody) {
                addClass(trs[i], 'au-theme-hover-background-color--primary-bottom')
              }
            }
          }
        } else {
          for (let i = 0; i < allTr.length; i++) {
            if (allTr[i].parentNode === table) addClass(allTr[i], 'au-theme-hover-background-color--primary-bottom')
          }
        }
      } else {
        for (let i = 0; i < allTr.length; i++) {
          removeClass(allTr[i], 'au-theme-hover-background-color--primary-bottom')
        }
      }
      // add tbody seprator line color
      if (tfoots.length && tbodys.length) {
        for (let i = 0; i < tbodys.length; i++) {
          let lastTr = tbodys[i].querySelector('tr:last-child')
          if (lastTr) addClass(lastTr, 'au-theme-border-bottom-color--base-8-important')
        }
      }
      if (tfoots.length) {
        for (let i = 0; i < tfoots.length; i++) {
          let firstTr = tfoots[i].querySelector('tr:first-child')
          if (firstTr) addClass(firstTr, 'au-theme-border-top-color--base-8-important')
        }
      }
      if (theads.length) {
        for (let i = 0; i < theads.length; i++) {
          let lastTr = theads[i].querySelector('tr:last-child')
          if (lastTr) addClass(lastTr, 'au-theme-border-bottom-color--base-8-important')
        }
      }
    },
    handleStripe () {
      let table = this.$el
      let tbodys = table.querySelectorAll('tbody')
      // tbodys = Array.prototype.filter.call(tbodys, b => b.parentNode === table)
      let allTrs = table.querySelectorAll('tr')
      for (let tr of allTrs) {
        removeClass(tr, 'au-theme-background-color--base-11')
      }

      if (this.striped) {
        if (tbodys.length) {
          for (let i = 0; i < tbodys.length; i++) {
            let tbody = tbodys[i]
            let trs = tbody.querySelectorAll('tr')
            for (let i = 0; i < trs.length; i++) {
              if (trs[i].parentNode === tbody && i % 2 === 0) addClass(trs[i], 'au-theme-background-color--base-11')
            }
          }
        } else {
          let allTr = table.querySelectorAll('tr')
          for (let i = 0; i < allTr.length; i++) {
            if (allTr[i].parentNode === table) {
              if (i % 2 === 0) addClass(allTr[i], 'au-theme-background-color--base-11')
            }
          }
        }
      }
    }
  }
}
</script>
