<style lang="scss">
  @import '../../../style/vars';
  .au-confirm {
    position: relative;
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
  .au-confirm-message {
    max-width: 500px;
  }
</style>
<template>
  <div class="au-confirm">
    <div class="au-message-box-icon-container" v-show="iconType">
      <au-icon
        class="au-message-box-icon au-theme-color--base-12"
        :class="`au-theme-background-color--${messageType || 'info'}`"
        :type="iconType"/>
    </div>
    <div
      class="au-confirm-message au-theme-color--base-3"
      :style="{
        paddingTop: iconType ? '6px' : '',
        paddingLeft: iconType ? '48px' : '',
        minHeight: iconType ? '32px' : '24px'
      }">{{ message }}</div>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
export default {
  name: 'au-confirm',
  components: { AuIcon },
  props: {
    message: String,
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
  }
}
</script>
