
<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/size';
  .au-button {
    position: relative;
    // min-width: 88px;
    // height: $size-normal;
    padding: 0 10px;
    border-width: 0;
    outline: none;
    font-size: $normal;
    // line-height: $size-normal;
    cursor: pointer;
    font-family: $fontFamily;
    word-break:keep-all;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .au-button + .au-button {
    margin-left: 10px;
  }
  .au-button:disabled {
    cursor: not-allowed;
  }
  .after-mask {
    display: none;
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
  // .au-button:not(.plain):not(:disabled):focus > .before-mask,
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
  .au-button-icon + *:not(:empty) {
    margin-left: 4px;
  }
</style>
<template>
  <button
    class="
      au-button
      au-theme-border-radius--small"
    :class="buttonClasses"
    :style="{
      cursor: loading ? 'wait' : '',
      padding: size === 'small' || size === 'mini' ? '0 8px' : '0 10px'
    }"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick" ref="button">
    <span class="before-mask au-theme-background-color--base-12"></span>
    <icon v-if="icon" :type="icon" class="au-button-icon"/>
    <span><slot></slot></span>
    <span class="after-mask au-theme-background-color--base-12"
      :class="{'au-theme-border-color--base-12': plain}"></span>
  </button>
</template>
<script>
import Loading from 'components/loading'
import Icon from 'components/icon'

export default {
  name: 'au-button',
  components: { Icon },
  mounted () {
    this.load()
  },
  data () {
    return {
      loadingIns: null
    }
  },
  props: {
    type: String,
    size: {
      type: String,
      default: 'normal'
    },
    icon: String,
    plain: Boolean,
    disabled: Boolean,
    loading: Boolean,
    nativeType: String // button,submit,reset
  },
  watch: {
    loading () {
      // this.$nextTick(this.setPos)
      this.load()
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
    canActivate () {
      return !(this.disabled || this.loading)
    },
    buttonClasses () {
      let res = []
      if (this.plain) {
        res = [
          `plain`,
          `au-theme-background-color--base-12`,
          `au-theme-border-color--base-9`,
          this.canActivate ? `au-theme-hover-border-color--${this.isDefault ? 'primary' : this.type}` : '',
          // this.canActivate ? `au-theme-focus-border-color--${this.isDefault ? 'primary' : this.type}-3` : '',
          this.canActivate ? `au-theme-active-border-color--${this.isDefault ? 'primary' : this.type}-down-important` : '',
          `au-theme-color--base-3`,
          this.canActivate ? `au-theme-hover-color--${this.isDefault ? 'primary' : this.type}` : '',
          // this.canActivate ? `au-theme-focus-color--${this.isDefault ? 'primary' : this.type}-3` : '',
          this.canActivate ? `au-theme-active-color--${this.isDefault ? 'primary' : this.type}-down-important` : ''
        ]
      } else {
        res = [
          `au-theme-background-color--${this.isDefault ? 'base-5' : this.type}`,
          `au-theme-color--base-12`
        ]
      }

      res.push('au-size-' + this.size + (this.plain ? '-bordered' : ''))

      return res.join(' ')
    },
    loadingSize () {
      switch (this.size) {
        case 'mini': // 20
          return 16
        case 'small': // 26
          return 20
        case 'normal': // 32
          return 24
        case 'large': // 38
          return 28
      }
      return 24
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    },
    load () {
      if (this.loading) {
        this.loadingIns = Loading({
          target: this.$refs.button,
          color: this.type === 'default' ? 'primary' : this.type,
          size: this.loadingSize
        })
      } else {
        if (this.loadingIns) this.loadingIns.close()
      }
    }
  }
}
</script>
