<style lang="scss">
  @import '../../../style/_vars.scss';
  @import '../../../style/_size.scss';
  .au-tag {
    display: inline-block;
    padding: 0 10px;
    border-width: 1px;
    border-style: solid;
    font-size: $normal;
  }
  .au-tag-close {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 100%;
    margin-left: 5px;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
</style>
<template>
  <div class="au-tag au-theme-border-radius--small" :class="classes" :style="{
    border: active ? 'none' : '',
    cursor: hoverable ? 'pointer' : ''
  }">
    <slot></slot>
    <span class="au-tag-close au-theme-color--base-7" v-show="closable" :class="{
      [`au-theme-hover-color--${localType}-3`]: !active,
      [`au-theme-hover-color--base-12`]: active
    }" @click="$emit('close', $event)"><au-icon class="au-tag-close-icon" type="times"/></span>
    <!-- <span class="au-tag-close au-theme-color--base-5" v-show="closable" :class="{
      [`au-theme-hover-background-color--${localType}-3`]: !active,
      [`au-theme-hover-background-color--base-12`]: active,
      [`au-theme-hover-color--base-12`]: !active,
      [`au-theme-hover-color--${localType}-3`]: active
    }" @click="$emit('close')"><au-icon class="au-tag-close-icon" type="times"/></span> -->
  </div>
</template>
<script>
import auIcon from '../../icon'
export default {
  name: 'au-tag',
  components: { auIcon },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    closable: Boolean,
    hoverable: Boolean,
    size: {
      type: String,
      default: 'normal'
    },
    active: Boolean
  },
  data () {
    return {}
  },
  computed: {
    localType () {
      if (this.type === 'default') return 'base'
      else return this.type
    },
    classes () {
      let normal = ''
      let hover = ''
      let size = this.size ? `au-size-${this.size}${this.active ? '' : '-bordered'}` : ''
      if (this.active) {
        normal = `au-theme-color--base-12 au-theme-background-color--${this.localType}-3`
      } else {
        if (this.hoverable) {
          normal = 'au-theme-border-color--base-8 au-theme-color--base-3'
          hover = `au-theme-hover-border-color--${this.localType}-3 au-theme-hover-color--${this.localType}-3`
        } else {
          normal = `au-theme-border-color--${this.localType}-3 au-theme-color--${this.localType}-3`
        }
      }

      return normal + ' ' + hover + ' ' + size
    }
  }
}
</script>
