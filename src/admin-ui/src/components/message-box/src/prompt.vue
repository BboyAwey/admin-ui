<style lang="scss">
  @import "../../../style/vars";
  .au-prompt {
    padding-bottom: 4px;
  }
  .au-prompt-message {
    margin-bottom: 10px;
    font-size: $normal;
  }
  .au-prompt-core-container {
    padding: 0 2px;
    .au-prompt-core {
      width: 100%;
      input {
        width: 100%;
      }
      .au-input-container {
        width: 100%;
      }
    }
  }
</style>
<template>
  <div class="au-prompt au-theme-font-color--base-3">
    <div class="au-prompt-message">{{ message }}</div>
    <div class="au-prompt-core-container">
      <au-input class="au-prompt-core" v-model="value" :placeholder="placeholder" :validators="validators" ref="core"></au-input>
    </div>
  </div>
</template>
<script>
  import AuInput from '../../input'

  export default {
    name: 'au-prompt',
    components: { AuInput },
    data () {
      return {
        value: ''
      }
    },
    props: {
      message: String,
      trigger: Boolean,
      validators: Array,
      placeholder: String
    },
    methods: {
      validate () {
        return this.$refs.core.validate()
      }
    }
  }
</script>
