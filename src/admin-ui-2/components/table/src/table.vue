<style lang="scss">
  @import '../../../style/vars';
  .au-table {
    margin: 8px 0;
    // border-radius: 4px;
    // the border around table
    // every tr except the last one in tbody has a bottom line
    & > tr,
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
    th:not(:last-child), td:not(:last-child) {
      // border-right: 1px solid $grayBrighten15;
    }
    thead > tr:last-child, tbody > tr:last-child {
      // border-bottom-color: $grayBrighten10;
    }
  }
</style>

<template>
  <table class="au-table" ref="table">
    <slot></slot>
  </table>
</template>

<script>
  import { addClass } from '../../../helpers/dom'

  export default {
    name: 'au-table',
    props: {
      // TODO:
    },
    mounted () {
      let table = this.$refs.table

      // let thead = table.querySelectorAll('thead')
      // let tbody = table.querySelectorAll('tbody')
      // let tfoot = table.querySelectorAll('tfoot')

      // console.log(thead)
      let allTr = table.querySelectorAll('tr')
      console.log(allTr)
      // let allTd = table.querySelectorAll('td')

      // let theadTr = thead.querySelectorAll('tr')
      // let tbodyTr = tbody.querySelectorAll('tr')
      // let tfootTr = tfoot.querySelectorAll('tr')
      for (let i = 0; i < allTr.length; i++) {
        addClass(allTr[i], 'au-theme-border-color--base-8')
        console.log(allTr[i])
      }

      // if (tbody) {
      //   for (let i = 0; i < theadTr.lenght; i++) {
      //     addClass(theadTr, 'au-theme-border-color--base-8')
      //   }
      //   for (let i = 0; i < tbodyTr.lenght; i++) {
      //     addClass(tbodyTr, 'au-theme-border-color--base-8')
      //   }
      //   for (let i = 0; i < tfootTr.lenght - 1; i++) {
      //     addClass(tfootTr, 'au-theme-border-color--base-8')
      //   }
      // } else {
      //   for (let i = 0; i < allTr.lenght - 1; i++) {
      //     addClass(allTr, 'au-theme-border-color--base-8')
      //   }
      // }
    }
  }
</script>

