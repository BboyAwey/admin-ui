<style lang="scss" scoped>
  .au-grid-examples {
    .cell {
      border-width: 1px;
      border-style: solid;
    }
  }
</style>

<template>
  <div class="au-grid-examples">
    <au-button @click="test = !test">toggle</au-button>
    <div v-show="test">
      <au-grid class="cell au-theme-border-color--danger-3" width-sm="6" width-md="3" width-lg="1" offset-sm="3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est consequatur fugiat fugit eos dolores iusto quo sint atque quasi cupiditate optio ipsum eum laborum, maiores dolorum ratione quae aliquam?
      </au-grid>
      <au-grid class="cell au-theme-border-color--danger-3" width-sm="6" width-md="3" width-lg="1" offset-sm="3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est consequatur fugiat fugit eos dolores iusto quo sint atque quasi cupiditate optio ipsum eum laborum, maiores dolorum ratione quae aliquam?
      </au-grid>
      <au-grid class="cell au-theme-border-color--danger-3" width-sm="6" width-md="3" width-lg="1" offset-sm="3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est consequatur fugiat fugit eos dolores iusto quo sint atque quasi cupiditate optio ipsum eum laborum, maiores dolorum ratione quae aliquam?
      </au-grid>
      <au-grid class="cell au-theme-border-color--danger-3" width-sm="6" width-md="3" width-lg="1" offset-sm="3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est consequatur fugiat fugit eos dolores iusto quo sint atque quasi cupiditate optio ipsum eum laborum, maiores dolorum ratione quae aliquam?
      </au-grid>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'au-grid-examples',
    data () {
      return {
        test: true
      }
    }
  }
</script>

