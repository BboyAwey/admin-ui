<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/size';
  .au-button {
    position: relative;
    // min-width: 88px;
    // height: $size-normal;
    padding: 0 16px;
    border-width: 0;
    outline: none;
    font-size: $normal;
    // line-height: $size-normal;
    cursor: pointer;
    font-family: $fontFamily;
  }
  .au-button:disabled {
    cursor: not-allowed;
  }
  .au-button:disabled > .after-mask,
  .au-button:not(.plain) > .before-mask {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .au-button:disabled > .after-mask {
    opacity: .5;
  }
  .au-button:not(.plain):not(:disabled):hover > .before-mask {
    opacity: .15;
  }
  .au-button:not(.plain):not(:disabled):active > .before-mask  {
    opacity: 0;
  }
  .au-button.plain:disabled > .after-mask {
    top: -1px;
    left: -1px;
    box-sizing: content-box;
    border-width: 1px;
    border-style: solid;
  }
  .au-button.plain {
    border-width: 1px;
    border-style: solid;
  }
</style>
<template>
  <button
    class="
      au-button
      au-theme-radius"
    :class="buttonClasses"
    :type="nativeType"
    :disabled="disabled"
    @click="handleClick">
    <span class="before-mask au-theme-background-color--base-12"></span>
    <slot></slot>
    <span class="after-mask au-theme-background-color--base-12"
      :class="{'au-theme-border-color--base-12': plain}"></span>
  </button>
</template>
<script>
  export default {
    name: 'au-button',
    data () {
      return {}
    },
    props: {
      type: String,
      size: {
        type: String,
        default: 'normal'
      },
      plain: Boolean,
      disabled: Boolean,
      nativeType: String // button,submit,reset
    },
    computed: {
      isDefault () {
        return [
          'success',
          'danger',
          'warning',
          'info',
          'primary'
        ].indexOf(this.type) === -1
      },
      buttonClasses () {
        let res = []
        if (this.plain) {
          if (this.isDefault) {
            res = [
              `plain`,
              `au-theme-background-color--base-12`,
              `au-theme-border-color--base-5`,
              `au-theme-hover-border-color--primary-4`,
              `au-theme-active-border-color--primary-2-important`,
              `au-theme-font-color--base-3`,
              `au-theme-hover-font-color--primary-4`,
              `au-theme-active-font-color--primary-2-important`
            ]
          } else {
            res = [
              `plain`,
              `au-theme-background-color--base-12`,
              `au-theme-border-color--base-5`,
              !this.disabled ? `au-theme-hover-border-color--${this.type}-4` : '',
              !this.disabled ? `au-theme-active-border-color--${this.type}-2-important` : '',
              `au-theme-font-color--base-3`,
              !this.disabled ? `au-theme-hover-font-color--${this.type}-4` : '',
              !this.disabled ? `au-theme-active-font-color--${this.type}-2-important` : ''
            ]
          }
        } else {
          if (this.isDefault) {
            res = [
              `au-theme-background-color--base-5`,
              `au-theme-font-color--base-12`
            ]
          } else {
            res = [
              `au-theme-background-color--${this.type}-3`,
              `au-theme-font-color--base-12`
            ]
          }
        }

        res.push('au-size-' + this.size)

        return res.join(' ')
      }
    },
    methods: {
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>


