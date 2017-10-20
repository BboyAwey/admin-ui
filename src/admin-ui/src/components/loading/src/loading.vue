<style lang="scss">
  @import "../../../style/vars";
  .au-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .au-loading:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .75;
  }
  .au-loading-core-container {
    position: relative;
  }
  .au-loading-svg {
    position: relative;
    left: 50%;
  }
  .au-loading-text {
    position: relative;
    margin: 0;
    padding: 0;
    border: none;
    width: auto;
    height: auto;
    text-align: center;
    font-size: $normal;
  }
</style>
<template>
  <div class="au-loading" :class="{
    'au-theme-font-color--primary-3': true,
    'au-theme-before-background-color--base-12': true
  }">
    <div class="au-loading-core-container" ref="coreContainer">
      <svg ref="svg" viewBox="0 0 50 50" class="au-loading-svg"
        :width="size" :height="size"
        :style="{
          animation: '1.33333s linear 0s normal none infinite running Rotate',
          marginLeft: size / 2 * -1 + 'px'
        }">
        <circle ref="core" fill="none" :stroke="stroke" stroke-width="5" stroke-linecap="round" cx="25" cy="25" r="20" style="
        transform-origin: center center 0px;
        animation: 1s ease 0s normal none infinite running CircularBarDash;"></circle>
      </svg>
      <p class="au-loading-text" v-if="text">{{ text }}</p>
    </div>
  </div>
</template>
<script>
  import { getElementSize } from '../../../helpers/dom'

  export default {
    name: 'au-loading',
    mounted () {
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
    props: {
      size: Number,
      text: String
    },
    data () {
      return {
        stroke: '#4197ff'
      }
    },
    methods: {
      rgbToHex (color) {
        var rgb = color.split(',')
        var r = parseInt(rgb[0].split('(')[1])
        var g = parseInt(rgb[1])
        var b = parseInt(rgb[2].split(')')[0])
        var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        return hex
      },
      setColor () {
        this.stroke = this.rgbToHex(getComputedStyle(this.$el).color)
      },
      setTop (elHeight) {
        let containerHeight = getElementSize(this.$refs.coreContainer).height
        if (containerHeight > elHeight) this.$refs.coreContainer.style.height = elHeight + 'px'
        this.$refs.coreContainer.style.top = (elHeight - getElementSize(this.$refs.coreContainer).height) / 2 + 'px'
      },
      close () {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

