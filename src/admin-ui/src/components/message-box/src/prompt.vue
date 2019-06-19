<style lang="scss">
  @import "../../../style/vars";
  .au-prompt {
    position: relative;
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
  .au-message-box-icon-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    vertical-align: middle;
    font-size: $large;
  }
  .au-message-box-icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 100%;
  }
  .au-prompt-right {
    max-width: 500px;
  }
</style>
<template>
  <div class="au-prompt au-theme-color--base-3">
    <div class="au-message-box-icon-container" v-show="iconType">
      <au-icon
        class="au-message-box-icon au-theme-color--base-12"
        :class="`au-theme-background-color--${messageType || 'info'}`"
        :type="iconType"/>
    </div>
    <div
      class="au-prompt-right"
      :style="{
        paddingTop: iconType ? '6px' : '',
        paddingLeft: iconType ? '48px' : ''
      }">
      <div class="au-prompt-message">{{ message }}</div>
      <div class="au-prompt-core-container">
        <au-input
          class="au-prompt-core"
          v-model="value"
          :placeholder="placeholder"
          :validators="validators"
          :full-width="true"
          ref="core"/>
      </div>
    </div>
  </div>
</template>
<script>
import AuInput from 'components/input'
import AuIcon from 'components/icon'

export default {
  name: 'au-prompt',
  components: { AuInput, AuIcon },
  data () {
    return {
      value: ''
    }
  },
  props: {
    message: String,
    trigger: Boolean,
    validators: Array,
    placeholder: String,
    icon: String,
    messageType: String
  },
  computed: {
    iconType () {
      if (this.icon) return this.icon
      switch (this.messageType) {
        case 'info':
        case 'primary': return 'info'
        case 'warning': return 'exclamation'
        case 'success': return 'check'
        case 'danger': return 'times'
        default: return null
      }
    }
  },
  methods: {
    validate () {
      return this.$refs.core.validate()
    }
  }
}
</script>
