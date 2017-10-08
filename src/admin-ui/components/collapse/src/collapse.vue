<style lang="scss">
  .au-collapse {
    overflow: hidden;
    width: 100%;
  }
  .au-collapse-transition {
    transition-property: width, height;
    transition-timing-function: ease-out;
    transition-duration: .1s;
  }
</style>
<template>
  <div class="au-collapse" :class="{'au-collapse-transition': transition}" :style="{ height, width }" ref="el">
    <slot></slot>
  </div>
</template>
<script>
  import { getElementSize } from '../../../helpers/dom'

  export default {
    name: 'au-collapse',
    mounted () {
      this.calculate()
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      if (MutationObserver) {
        this.observer = new MutationObserver((mutations) => {
          if (mutations.find((mutation) => {
            return mutation.target !== this.$refs.el
          })) this.calculate()
        })
        let config = { attributes: true, childList: true, subtree: true }
        this.observer.observe(this.$refs.el, config)
      }
    },
    destroyed () {
      if (this.observe) this.observer.disconnect()
      this.observer = null
    },
    data () {
      return {
        height: '',
        width: '',
        observer: null
      }
    },
    props: {
      collapse: Boolean,
      horizontal: Boolean,
      min: String,
      max: String,
      transition: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      collapse () {
        this.calculate()
      },
      min () {
        this.calculate()
      },
      max () {
        this.calculate()
      }
    },
    methods: {
      calculate () {
        let key = this.horizontal ? 'width' : 'height'
        if (this.collapse) this[key] = this.min || 0 + 'px'
        else {
          this[key] = this.max || this.getContentSize()[key] + 'px'
          // this[key] = this.max
          //   ? (Math.min(parseInt(this.max), this.getContentSize()[key]) + 'px')
          //   : this.getContentSize()[key] + 'px'
        }
      },
      getContentSize () {
        let el = this.$refs.el
        let copy = el.cloneNode(true)
        copy.style.height = 'auto'
        el.parentNode.insertBefore(copy, el)
        let size = getElementSize(copy)
        el.parentNode.removeChild(copy)
        return size
      }
    }
  }
</script>



