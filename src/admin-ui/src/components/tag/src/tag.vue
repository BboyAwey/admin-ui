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
  .au-tag + .au-tag {
    margin-left: 10px;
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
    cursor: hoverable ? 'pointer' : ''
  }" @click="$emit('click', $event)">
    <slot></slot>
    <span class="au-tag-close au-theme-color--base-3" v-show="closable" :class="{
      [`au-theme-hover-color--${type}`]: !active,
      [`au-theme-hover-color--base-12`]: active
    }" @click.stop="$emit('close', $event)"><au-icon class="au-tag-close-icon" type="times"/></span>
    <!-- <span class="au-tag-close au-theme-color--base-5" v-show="closable" :class="{
      [`au-theme-hover-background-color--${type}-3`]: !active,
      [`au-theme-hover-background-color--base-12`]: active,
      [`au-theme-hover-color--base-12`]: !active,
      [`au-theme-hover-color--${type}-3`]: active
    }" @click="$emit('close')"><au-icon class="au-tag-close-icon" type="times"/></span> -->
  </div>
</template>
<script>
import auIcon from 'components/icon'
export default {
  name: 'au-tag',
  components: { auIcon },
  props: {
    type: {
      type: String,
      default: 'primary',
      validator (v) {
        switch (v) {
          case 'primary':
          case 'info':
          case 'danger':
          case 'warning':
          case 'success':
            return true
          default:
            console.error(`Admin UI @ tag @ type of tag should be primary, info, danger, warning, or success. The default type is primary.`)
            return false
        }
      }
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
    classes () {
      let normal = ''
      let hover = ''
      let size = `au-size-${this.size}-bordered`
      if (this.active) {
        normal = `au-theme-border-color--${this.type} au-theme-color--base-12 au-theme-background-color--${this.type}`
      } else {
        if (this.hoverable) {
          normal = 'au-theme-border-color--base-8 au-theme-color--base-3'
          hover = `au-theme-hover-border-color--${this.type} au-theme-hover-color--${this.type}`
        } else {
          normal = `au-theme-border-color--${this.type} au-theme-color--${this.type}`
        }
      }
      console.log(normal + ' ' + hover + ' ' + size)
      return normal + ' ' + hover + ' ' + size
    }
  }
}
</script>
