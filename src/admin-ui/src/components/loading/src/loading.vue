<style lang="scss">
  @import "../../../style/vars";
  .au-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: $z-level-2;
  }
  .au-loading-mask {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .75;
  }
  .au-loading-core-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .au-loading-svg {
    display: inline-block;
    // position: relative;
    // left: 50%;
  }
  .au-loading-message {
    position: relative;
    margin: 0;
    padding: 0;
    border: none;
    width: auto;
    height: auto;
    text-align: center;
    font-size: $normal;
  }
  .au-loading-position-fixed {
    position: relative !important;
  }
  .au-loading-z-index-fixed {
    z-index: 0 !important;
  }
</style>
<template>
  <div class="au-loading" :class="{
    [`au-theme-color--${color}`]: true,
  }">
    <div class="au-loading-mask au-theme-background-color--base-12" v-show="mask"></div>
    <div class="au-loading-core-container" ref="coreContainer">
      <div>
        <svg ref="svg" viewBox="0 0 50 50" class="au-loading-svg"
          :width="size || 0" :height="size || 0"
          :style="{
            animation: '1.33333s linear 0s normal none infinite running Rotate',
          }">
          <circle ref="core" fill="none" :stroke="stroke" stroke-width="5" stroke-linecap="round" cx="25" cy="25" r="20" style="
          transform-origin: center center 0px;
          animation: 1s ease 0s normal none infinite running CircularBarDash;"></circle>
        </svg>
        <p class="au-loading-message" v-show="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { namespace } from 'helpers/utils'
import { removeClass } from 'helpers/dom'

export default {
  name: 'au-loading',
  data () {
    return {
      closed: false,
      el: null
    }
  },
  mounted () {
    this.insertSvgStyleTag()
  },
  beforeDestroy () {
    this.close()
  },
  props: {
    size: Number,
    message: String,
    color: {
      type: String,
      default: 'primary'
    },
    mask: Boolean,
    resetPosition: String,
    resetZIndex: String
  },
  computed: {
    stroke () {
      return namespace.get('theme').theme.colors[this.color]
    }
  },
  methods: {
    insertSvgStyleTag () {
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
    close () {
      if (!this.closed) {
        let el = this.el ? this.el : this.$el
        if (!el) return
        removeClass(el.parentNode, 'au-loading-z-index-fixed')
        removeClass(el.parentNode, 'au-loading-position-fixed')
        el.parentNode.removeChild(el)
        this.closed = true
      }
    }
  }
}
</script>
