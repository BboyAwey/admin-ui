<style lang="scss">
  .au-collapse {
    transition-property: width, height;
    transition-timing-function: ease-out;
    transition-duration: .2s;
    // transition: height .2s ease-in-out;
    overflow: hidden;
    width: 100%;
  }
</style>
<template>
  <div class="au-collapse" :style="{ height, width }" ref="el">
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
      let observer = new MutationObserver((mutations) => {
        if (mutations.find((mutation) => {
          return mutation.target !== this.$refs.el
        })) this.calculate()
      })
      let config = { attributes: true, childList: true, subtree: true }
      observer.observe(this.$refs.el, config)
    },
    data () {
      return {
        height: '',
        width: ''
      }
    },
    props: {
      collapse: {
        type: Boolean,
        defalut: false
      },
      horizontal: Boolean,
      min: String,
      max: String
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
        let computedStyle = getComputedStyle(el)
        let container = document.createElement(el.name)
        container.innerHTML = el.innerHTML
        let contentSize = getElementSize(container, true)
        return {
          width: contentSize.width + parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight),
          height: contentSize.height + parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom)
        }
      }
    }
  }
</script>



