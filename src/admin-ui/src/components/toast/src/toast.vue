<style lang="scss">
  @import "../../../style/vars";
  .au-toast {
    position: fixed;
    z-index: $z-level-3;
    top: 100px;
    left: 50%;
    width: 380px;
    min-height: 32px;
    margin-left: -190px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 0;
    overflow: hidden;
    .au-toast-icon-container,
    .au-toast-close-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 16px;
      vertical-align: middle;
      font-size: $normal;
    }
    .au-toast-close-container {
      left: auto;
      right: 0;
    }
    .au-toast-icon,
    .au-toast-close {
      width: 18px;
      height: 18px;
      border-radius: 100%;
      text-align: center;
      vertical-align: middle;
      font-size: $small;
      line-height: 18px;
    }
    .au-toast-close {
      cursor: pointer;
    }
    .au-toast-message {
      overflow: hidden;
      vertical-align: middle;
      font-size: $normal;
    }
  }
  .au-toast-border {
    border-width: 1px;
    border-style: solid;
  }

  .au-toast-enter-active,
  .au-toast-leave-active {
    transition:
      transform .2s ease-in-out,
      opacity .2s ease-in-out;
  }
  .au-toast-enter,
  .au-toast-leave-to {
    opacity: 0;
    transform: translateY(-100px)
  }

</style>
<template>
  <transition
    name="au-toast"
    @after-leave="afterLeave"
    @before-enter="beforeEnter">
    <div
      class="au-toast"
      :class="customClass || `
        au-theme-border-radius--large
        au-theme-before-radius
        au-theme-font-color--base-3
        au-theme-background-color--base-12
        au-theme-box-shadow--level-3
        au-toast-border
        au-theme-border-color--base-8
      `"
        v-if="visible">
        <div class="au-toast-icon-container" v-show="iconType">
          <au-icon
            class="au-toast-icon au-theme-font-color--base-12"
            :class="`au-theme-background-color--${mood || 'info'}-3`"
            :type="iconType"></au-icon>
        </div>
        <div
          class="au-toast-message"
          :style="{
            paddingLeft: iconType ? '32px' : '',
            paddingRight: closeable ? '32px' : ''
          }">
          {{ message }}
        </div>
        <div class="au-toast-close-container" v-show="closeable" @click="visible = false">
          <au-icon
            class="au-toast-close au-theme-font-color--base-3 au-theme-hover-font-color--base-6"
            size="16px"
            type="times"></au-icon>
        </div>
    </div>
  </transition>
</template>
<script>
  import AuIcon from '../../icon'

  export default {
    name: 'au-toast',
    components: { AuIcon },
    props: {
      visible: Boolean,
      message: String,
      customClass: String,
      icon: String,
      mood: {
        type: String,
        default: 'info' // info, success, warning, danger
      },
      closeable: Boolean
    },
    computed: {
      iconType () {
        if (this.icon) return this.icon
        switch (this.mood) {
          case 'info': return 'info'
          case 'warning': return 'exclamation'
          case 'success': return 'check'
          case 'danger': return 'times'
          default: return null
        }
      }
    },
    methods: {
      beforeEnter () {
        this.$emit('show', this)
      },
      afterLeave () {
        this.$emit('hide', this)
      }
    }
  }
</script>
