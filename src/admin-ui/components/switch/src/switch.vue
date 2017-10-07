<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/warnings';
  .au-switch {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    transition: all .1s ease-in-out;
  }
  .au-switch-core {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    transition: all .1s ease-in-out;
  }
  .au-switch-disabled-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .1s ease-in-out;
  }
</style>
<template>
  <div class="au-switch" :class="{
    [` au-theme-background-color--${bg}`]: true
  }" :style="{ cursor: disabled ? 'not-allowed' : 'pointer'}" @click="handleClick" ref="switch">
    <div class="au-switch-disabled-cover au-theme-background-color--base-12" :style="{opacity: disabled && localValue ? '.5' : '0'}"></div>
    <div class="au-switch-core" :style="{left}" :class="{
     'au-theme-background-color--base-12': !disabled,
     'au-theme-background-color--base-9': disabled
    }"></div>
  </div>
</template>
<script>
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import { getElementSize } from '../../../helpers/dom'
  export default {
    name: 'au-switch',
    mixins: [FormApiMixin, ValidatorMixin],
    mounted () {
      this.getBg()
      this.getLeft()
    },
    data () {
      return {
        bg: 'base-8',
        left: '2px'
      }
    },
    props: {
      color: {
        type: String,
        default: 'success'
      }
    },
    watch: {
      value () {
        this.getBg()
        this.getLeft()
      },
      localValue (v) {
        this.input()
        this.change()
      },
      color () {
        this.getBg()
      }
    },
    methods: {
      getBg () {
        this.bg = this.localValue ? this.color + '-3' : 'base-8'
      },
      getLeft () {
        if (this.localValue) {
          let width = getElementSize(this.$refs.switch).width
          this.left = width - 4 - 16 + 1 + 'px'
        } else this.left = '2px'
      },
      handleClick () {
        if (this.disabled) return
        this.localValue = !this.localValue
      }
    }
  }
</script>

