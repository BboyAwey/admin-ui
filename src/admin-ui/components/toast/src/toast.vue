<style lang="scss">
  @import "../../../style/vars";
  .au-toast {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    max-width: 80%;
    height: 68px;
    padding: 18px 32px;
    box-sizing: border-box;
    line-height: 32px;
    overflow: hidden;
    text-align: center;
    transition:
      // transform .2s ease-in-out,
      opacity .2s ease-in-out;
    & > span {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      line-height: inherit;
    }
    .au-toast-icon {
      display: inline-block;
      position: absolute;
      height: 100%;
      left: 0;
      font-size: 32px;
    }
  }
  .au-toast:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .8;
  }
  .au-toast-fade-enter,
  .au-toast-fade-leave-active {
    opacity: 0;
  }
</style>
<template>
  <transition name="au-toast-fade">
    <div class="au-toast au-theme-radius au-theme-before-radius au-theme-font-color--base-12 au-theme-before-background-color--base-0" :class="toastClass" :style="toastStyle" v-show="display">
      <span :style="{paddingLeft: icon ? '48px' : ''}"><au-icon class="au-toast-icon" :class="iconClass" :type="icon"></au-icon>{{ message }}</span>
    </div>
  </transition>
</template>
<script>
  import AuIcon from '../../icon'

  export default {
    name: 'au-toast',
    components: { AuIcon },
    props: {
      display: Boolean,
      message: '',
      icon: String,
      iconClass: String,
      toastClass: String,
      top: [String, Number],
      left: [String, Number]
    },
    computed: {
      toastStyle () {
        return {
          transform: `translateX(${parseInt(this.left)}px) translateY(${parseInt(this.top)}px)`
        }
      }
    }
  }
</script>
