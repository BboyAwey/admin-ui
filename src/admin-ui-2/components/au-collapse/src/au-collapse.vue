<style lang="scss">
  .au-collapse {
    transition: height .2s ease-in-out;
    overflow: hidden;
  }
</style>
<template>
  <div class="au-collapse" :style="{ height }" ref="el">
    <slot></slot>
  </div>
</template>
<script>
  import { getElementSize } from '../../../helpers/dom'

  export default {
    name: 'au-collapse',
    data () {
      return {
        height: ''
      }
    },
    mounted () {
      this.calcHeight()
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let observer = new MutationObserver((mutations) => {
        if (mutations.find((mutation) => {
          return mutation.target !== this.$refs.el
        })) this.calcHeight()
      })
      let config = { attributes: true, childList: true, subtree: true }
      observer.observe(this.$refs.el, config)
    },
    destroyed () {},
    props: {
      collapse: {
        type: Boolean,
        defalut: false
      },
      min: String,
      max: String
    },
    watch: {
      collapse () {
        this.calcHeight()
      },
      min () {
        this.calcHeight()
      },
      max () {
        this.calcHeight()
      }
    },
    methods: {
      calcHeight () {
        if (this.collapse) this.height = this.min || 0 + 'px'
        else {
          this.height = this.max
            ? (Math.min(parseInt(this.max), this.getContentSize().height) + 'px')
            : this.getContentSize().height + 'px'
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



