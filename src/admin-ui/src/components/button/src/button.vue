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
    line-height: 30px;
  }
  .au-button-loading-mask:before,
  .au-button-loading-mask {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .au-button-loading-svg {
    position: relative;
  }
  .au-button-loading-mask:before {
    content: "";
    opacity: .5;
  }
</style>
<template>
  <button
    class="
      au-button
      au-theme-radius"
    :class="buttonClasses"
    :style="{
      cursor: loading ? 'wait' : ''
    }"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick">
    <span class="before-mask au-theme-background-color--base-12"></span>
    <slot></slot>
    <span class="after-mask au-theme-background-color--base-12"
      :class="{'au-theme-border-color--base-12': plain}"></span>
    <span class="au-button-loading-mask au-theme-before-background-color--base-12" v-show="loading"
      :class="{'au-theme-border-color--base-12': plain}">
      <svg ref="svg" viewBox="0 0 50 50" class="au-button-loading-svg"
        :width="loadingSize" :height="loadingSize"
        :style="{
          animation: '1.33333s linear 0s normal none infinite running Rotate',
          top: loadingSvgTop
        }">
        <circle ref="core" fill="none" :stroke="loadingStroke" stroke-width="5" stroke-linecap="round" cx="25" cy="25" r="20" style="
        transform-origin: center center 0px;
        animation: 1s ease 0s normal none infinite running CircularBarDash;"></circle>
      </svg>
    </span>
  </button>
</template>
<script>
  export default {
    name: 'au-button',
    mounted () {
      this.insertLoadingSvgStyle()
      this.setPos()
    },
    data () {
      return {
        loadingSize: 12,
        loadingStroke: '#1c86e2',
        loadingSvgTop: '0px'
      }
    },
    props: {
      type: String,
      size: {
        type: String,
        default: 'normal'
      },
      plain: Boolean,
      disabled: Boolean,
      loading: Boolean,
      nativeType: String // button,submit,reset
    },
    watch: {
      loading () {
        this.$nextTick(this.setPos)
      }
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
      },
      insertLoadingSvgStyle () {
        let style = document.createElement('style')
        style.innerHTML = `
          /* &lt;![CDATA[ */
            @keyframes Rotate { 100% { transform: rotate(360deg); } }

            @keyframes CircularBarDash {
              0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -35;
            }
            100% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -124;
            }
            }
          /* ]]&gt; */
        `

        let styles = this.$refs.svg.querySelectorAll('style')
        for (let i = 0; i < styles.length; i++) {
          styles[i].parentNode.removeChild(styles[i])
        }
        this.$refs.svg.insertBefore(style, this.$refs.core)
      },
      setPos () {
        if (this.loading) {
          switch (this.size) {
            case 'mini': // 20
              this.loadingSize = '16px'
              this.loadingSvgTop = '2px'
              break
            case 'small': // 26
              this.loadingSize = '18px'
              this.loadingSvgTop = '4px'
              break
            case 'normal': // 32
              this.loadingSize = '20px'
              this.loadingSvgTop = '6px'
              break
            case 'large': // 38
              this.loadingSize = '22px'
              this.loadingSvgTop = '8px'
              break
          }
        }
      }
    }
  }
</script>


