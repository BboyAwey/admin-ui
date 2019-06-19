<style lang="scss">
  @import "../../../style/vars";
  .au-message {
    position: fixed;
    z-index: $z-level-3;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    // width: 380px;
    min-height: 32px;
    // margin-left: -190px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 0;
    overflow: hidden;
    .au-message-icon-container,
    .au-message-close-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 16px;
      vertical-align: middle;
      font-size: $normal;
    }
    .au-message-close-container {
      left: auto;
      right: 0;
    }
    .au-message-icon,
    .au-message-close {
      width: 18px;
      height: 18px;
      border-radius: 100%;
      text-align: center;
      vertical-align: middle;
      font-size: $small;
      line-height: 18px;
    }
    .au-message-close {
      cursor: pointer;
    }
    .au-message-message {
      overflow: hidden;
      vertical-align: middle;
      font-size: $normal;
    }
  }
  .au-message-border {
    border-width: 1px;
    border-style: solid;
  }

  .au-message-enter-active,
  .au-message-leave-active {
    transition:
      transform .2s ease-in-out,
      opacity .2s ease-in-out;
  }
  .au-message-enter,
  .au-message-leave-to {
    opacity: 0;
    transform: translate(-50%, -100px);
  }

</style>
<template>
  <transition
    name="au-message"
    @after-leave="afterLeave">
    <div
      class="au-message"
      :class="customClass || `
        au-theme-border-radius--large
        au-theme-before-radius
        au-theme-color--base-3
        au-theme-background-color--base-12
        au-theme-box-shadow--base
        au-message-border
        au-theme-border-color--base-10
      `"
        v-if="visible">
        <div class="au-message-icon-container" v-show="iconType">
          <au-icon
            class="au-message-icon au-theme-color--base-12"
            :class="`au-theme-background-color--${type || 'info'}`"
            :type="iconType"></au-icon>
        </div>
        <div
          class="au-message-message"
          :style="{
            paddingLeft: iconType ? '32px' : '',
            paddingRight: closeable ? '32px' : ''
          }">
          {{ message }}
        </div>
        <div class="au-message-close-container" v-show="closeable" @click="visible = false">
          <au-icon
            class="au-message-close au-theme-color--base-8 au-theme-hover-color--base-3"
            size="16px"
            type="times"></au-icon>
        </div>
    </div>
  </transition>
</template>
<script>
import AuIcon from 'components/icon'

export default {
  name: 'au-message',
  components: { AuIcon },
  props: {
    visible: Boolean,
    message: String,
    customClass: String,
    icon: String,
    type: {
      type: String,
      default: 'info' // info, success, warning, danger
    },
    closeable: Boolean
  },
  computed: {
    iconType () {
      if (this.icon) return this.icon
      switch (this.type) {
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
    afterLeave () {
      this.$emit('close', this)
    }
  }
}
</script>
