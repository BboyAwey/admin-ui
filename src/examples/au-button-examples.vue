<style lang="scss">
.global-style {
  padding: 40px;
}
.button {
  margin: 10px;
}
</style>
<template>
  <div class="global-style">
    <au-button class="button" size="large">large</au-button>
    <au-button class="button" type="primary" @click="handleClick">normal</au-button>
    <au-button class="button" size="small" type="success">small</au-button>
    <au-button class="button" size="mini" disabled type="danger" @click="handleClick">mini</au-button>
    <au-button class="button" size="" type="info">{{ test }}</au-button>
    <au-button class="button" type="warning">{{ test }}</au-button>
    <p>-----------------------------------</p>
    <au-button class="button" :plain="true" size="large">large</au-button>
    <au-button class="button" :plain="true" type="primary" @click="handleClick">normal</au-button>
    <au-button class="button" :plain="true" :disabled="true" size="small" type="success">small</au-button>
    <au-button class="button" :plain="true" size="mini" type="danger">mini</au-button>
    <au-button class="button" :plain="true" size="" type="info">{{ test }}</au-button>
    <au-button class="button" :plain="true" type="warning">{{ test }}</au-button>
  </div>
</template>
<script>
  export default {
    name: 'global-style',
    data () {
      return {
        test: 'hello world~'
      }
    },
    methods: {
      handleClick (e) {
        console.log(e)
      }
    }
  }
</script>
