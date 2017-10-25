<style lang="scss">
  @import "../../../style/vars";
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .au-frame {
    height: 100%;
    overflow: hidden;
    // background-color: $grayBrighten20; // class
    .au-page-header {
      position: relative;
      display: block;
      z-index: 1;
      // padding: 12px 16px;
      // background-color: $primary; // class
      color: #fff;
    }
    .au-page-main:after {
      content: "";
      display: block;
      clear: both;
    }
    .au-page-sidebar {
      display: inline-block;
      position: relative;
      float: left;
      height: 100%;
      & > div {
        height: 100%;
      }
      // min-width: 200px;
      // width: 15%;
      // padding: 16px 0;
      // background-color: #fff;
      // box-shadow: $shadowLevel3; // class
    }
    // .adjustable:after {
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   right: 2px;
    //   top: 50%;
    //   margin-top: -10px;
    //   width: 2px;
    //   height: 24px;
    //   border-left: 2px solid $grayBrighten5;
    //   border-right: 2px solid $grayBrighten5;
    //   cursor: move;
    // }
    .au-page-content {
      // float: left;
      position: relative;
      height: 100%;
      overflow-x: auto;
    }
    .au-page-content.not-full {
      .au-page-footer {
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .au-page-content-main {
      // padding: 16px;
      height: 100%;
      & > div {
        height: 100%;
      }
    }
    .au-page-footer {
      width: 100%;
      // padding: 10px 16px;
      font-size: $small;
      // color: $grayDarken5; // class
      // background-color: $grayBrighten15; // class
    }
  }
</style>
<template>
  <div class="au-frame" ref="container">
    <div class="au-page-header au-theme-background-color--primary-3 au-theme-shadow--level-2" ref="header">
      <slot name="header"></slot>
    </div>
    <div class="au-page-main" ref="main">
      <div class="au-page-sidebar au-theme-background-color--base-12 au-theme-shadow--level-2" ref="sidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="au-page-content" ref="content">
        <div class="au-page-content-main" ref="contentMain">
          <slot name="content"></slot>
        </div>
        <div class="au-page-footer" ref="footer" v-show="footerShow">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getElementSize } from '../../../helpers/dom'
  import Scroller from '../../scroller'

  export default {
    name: 'au-frame',
    components: { Scroller },
    created () {
      window.addEventListener('resize', this.resize)
    },
    destroyed () {
      window.removeEventListener('resize', this.resize)
    },
    mounted () {
      this.resize()
      this.footerShow = this.$refs.footer.innerHTML !== ''
    },
    updated () {
      this.resize()
      this.footerShow = this.$refs.footer.innerHTML !== ''
    },
    data () {
      return {
        footerShow: true
      }
    },
    methods: {
      resize () {
        let headerSize = getElementSize(this.$refs.header)
        let containerSize = getElementSize(this.$refs.container)
        let contentMainSize = getElementSize(this.$refs.contentMain)
        let footerSize = null

        if (this.footerShow) footerSize = getElementSize(this.$refs.footer)

        // resize the container of page main part height to full the screen
        let pageMainheight = containerSize.height - headerSize.height
        this.$refs.main.style.height = pageMainheight + 'px'
        // resize the content part width to full the screen
        // if the content is not high enough
        if (this.footerShow && contentMainSize.height + footerSize.height < pageMainheight) {
          if (this.$refs.content.className.indexOf('not-full') === -1) {
            this.$refs.content.setAttribute('class', this.$refs.content.className + ' not-full')
          }
        } else {
          if (this.$refs.content.className.indexOf('not-full') !== -1) {
            this.$refs.content.setAttribute('class', this.$refs.content.className.replace('not-full', ''))
          }
        }
      }
    }
  }
</script>
