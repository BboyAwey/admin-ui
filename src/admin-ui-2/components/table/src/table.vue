<style lang="scss">
  @import '../../../style/vars';
  .au-table {
    // margin: 8px 0;
    // border-radius: 4px;
    // the border around table
    // every tr except the last one in tbody has a bottom line
    width: 100%;
    & > tr:not(:last-child),
    tbody > tr,
    tfoot > tr:not(:last-child),
    thead > tr {
      // border-bottom: 1px solid $grayBrighten15;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
    th, td {
      padding: 12px;
      text-align: left;
    }
    th {
      // color: $grayDarken25;
      font-size: $normal;
    }
    td {
      // color: $grayDarken45;
      font-size: $normal;
    }
    tfoot td:only-child {
      // color: $grayDarken25;
      font-size: $small;
      text-align: right;
    }
    tfoot td:not(:only-child) {
      // color: $grayDarken25;
    }
    tbody > tr:hover {
      // background-color: $grayBrighten20;
    }
  }
  // stripe table
  .au-striped {
    tbody>tr:nth-child(2n) {
      // background-color: rgba($grayBrighten20, .3);
    }
  }
  .au-bordered {
    // border: 1px solid $grayBrighten15;
    border-width: 1px;
    border-style: solid;
    th:not(:last-child), td:not(:last-child) {
      // border-right: 1px solid $grayBrighten15;
      border-right-width: 1px;
      border-right-style: solid;
    }
    thead > tr:last-child, tbody > tr:last-child {
      // border-bottom-color: $grayBrighten10;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
  }
</style>

<template>
  <table class="
    au-table au-theme-border-color--base-8
    au-theme-background-color--base-12"
    :class="{ 'au-bordered' : bordered }" ref="table">
    <slot></slot>
  </table>
</template>

<script>
  import { addClass } from '../../../helpers/dom'

  export default {
    name: 'au-table',
    props: {
      striped: Boolean,
      bordered: Boolean
    },
    mounted () {
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
        addClass(allTr[i], 'au-theme-border-color--base-8')
      }
      for (let i = 0; i < allTh.length; i++) {
        addClass(allTh[i], 'au-theme-font-color--base-3')
      }
      for (let i = 0; i < allTd.length; i++) {
        addClass(allTd[i], 'au-theme-font-color--base-3 au-theme-border-color--base-8')
      }

      for (let i = 0; i < tfoot.length; i++) {
        let tds = tfoot[i].querySelectorAll('td')
        for (let i = 0; i < tds.length; i++) {
          addClass(tds[i], 'au-theme-font-color--base-6')
        }
      }

      for (let i = 0; i < thead.length; i++) {
        let ths = thead[i].querySelectorAll('th')
        for (let i = 0; i < ths.length; i++) {
          addClass(ths[i], 'au-theme-font-color--base-6 au-theme-border-color--base-8')
        }
      }

      if (tbody.length) {
        for (let i = 0; i < tbody.length; i++) {
          let trs = tbody[i].querySelectorAll('tr')
          for (let i = 0; i < trs.length; i++) {
            addClass(trs[i], 'au-theme-hover-background-color--base-10')
          }
          if (this.striped) {
            for (let i = 0; i < trs.length; i++) {
              if (i % 2 === 0) addClass(trs[i], 'au-theme-background-color--base-11')
            }
          }
        }
      } else {
        for (let i = 0; i < allTr.length; i++) {
          addClass(allTr[i], 'au-theme-hover-background-color--base-10')
        }
        if (this.striped) {
          for (let i = 0; i < allTr.length; i++) {
            if (i % 2 === 0) addClass(allTr[i], 'au-theme-background-color--base-11')
          }
        }
      }

      if (thead.length) {
        addClass(thead[thead.length - 1].querySelector('tr:last-child'), 'au-theme-border-color--base-6-important')
      }
      if (tbody.length && tfoot.length) {
        addClass(tbody[thead.length - 1].querySelector('tr:last-child'), 'au-theme-border-color--base-6-important')
      }
    }
  }
</script>

