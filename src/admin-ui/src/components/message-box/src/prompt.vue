<style lang="scss">
  .au-prompt {
    padding-bottom: 4px;
  }
  .au-prompt-message {
    margin-bottom: 16px;
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
  <div class="au-prompt">
    <div class="au-prompt-message">{{ message }}</div>
    <div class="au-prompt-core-container">
      <au-input class="au-prompt-core" v-model="value" :placeholder="placeholder" :validators="validators" validate-on-blur ref="core"></au-input>
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
      required: '',
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
