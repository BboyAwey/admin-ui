<style lang="scss">
  @import '../../../style/vars';
  .au-previewer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    padding-top: 56px;
    text-align: center;
    .au-previewer-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 56px;
      padding: 0 24px;
      line-height: 56px;
      text-align: left;
      font-size: $medium;
    }
    .au-previewer-close-icon {
      float: right;
      font-size: $large;
      height: 56px;
      line-height: 56px;
      cursor: pointer;
    }
    .au-previewer-content {
      position: relative;
      height: 100%;
      width: 100%;
      padding: 2% 0;
      vertical-align: middle;
      user-select: none;
    }
    .au-previewer-va-helper {
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .au-previewer-content > img {
      vertical-align: middle;
      max-width: 90%;
      max-height: 90%;
    }
    .au-previewer-next,
    .au-previewer-prev {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 50%;
      width: 72px;
      height: 96px;
      overflow: hidden;
      margin-top: -48px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
    }
    .au-previewer-next:before,
    .au-previewer-prev:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .au-previewer-next:hover:before,
    .au-previewer-prev:hover:before {
      opacity: .3;
    }
    .au-previewer-next:after,
    .au-previewer-prev:after {
      content: "";
      display: inline-block;
      position: relative;
      top: 50%;
      left: 6px;
      margin-top: -14px;
      width: 28px;
      height: 28px;
      border-left-width: 1px;
      border-left-style: solid;
      border-top-width: 1px;
      border-top-style: solid;
      transform: rotate(-45deg);
    }
    .au-previewer-next {
      left: auto;
      right: 0;
      transform: rotate(180deg);
    }
    .au-previewer-disabled:hover {
      cursor: not-allowed;
    }
    .au-previewer-disabled:hover:before,
    .au-previewer-disabled:hover:before {
      opacity: .1;
    }
    .au-previewer-disabled:after,
    .au-previewer-disabled:after {
      opacity: .2;
    }
  }
  .au-previewer:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .75;
  }
</style>
<template>
  <div
    class="au-previewer au-theme-before-background-color--base-0"
    ref="previewer" v-show="localDisplay">
    <div
      class="au-previewer-header au-theme-font-color--base-12 au-theme-background-color--base-0"
      ref="header">
      <span class="au-previewer-name">{{ currentImgAlt }}</span>
      <icon
        type="times"
        class="au-previewer-close-icon"
        @click.native="close"/>
    </div>
    <div class="au-previewer-content" ref="content" @click.stop="close">
      <span
        class="au-previewer-prev au-theme-before-background-color--base-0 au-theme-after-border-color--base-12"
        @click.stop="prev"
        :style="{
          cursor: allow('prev') ? 'pointer' : 'not-allowed'
        }"
        :class="{'au-previewer-disabled au-theme-': !allow('prev')}"></span>
      <i class="au-previewer-va-helper"></i>
      <img v-for="(img, i) in images" :src="img.src" v-show="i == localCurrent" :alt="img.alt" :key="i">
      <span
        class="au-previewer-next au-theme-before-background-color--base-0 au-theme-after-border-color--base-12"
        @click.stop="next"
        :style="{
          cursor: allow('next') ? 'pointer' : 'not-allowed'
        }"
        :class="{'au-previewer-disabled au-theme-': !allow('next')}"></span>
    </div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  import Icon from '../../icon'

  export default {
    name: 'au-previewer',
    components: { Icon },
    mounted () {
      // window.document.body.appendChild(this.$refs.previewer)
    },
    data () {
      return {
        localDisplay: this.display,
        localCurrent: this.isCurrentIllegal(this.current) ? this.current : 0
      }
    },
    props: {
      images: {
        type: Array,
        required: true
      },
      display: {
        required: true
      },
      current: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      currentImgAlt () {
        if (this.images && this.images.length) {
          return this.images[this.localCurrent].alt
        } else {
          return ''
        }
      }
    },
    watch: {
      display (v) {
        this.localDisplay = v
      },
      localDisplay (v) {
        if (v) {
          document.body.appendChild(this.$refs.previewer)
          this.$emit('show', this.images[this.localCurrent])
        } else {
          this.$emit('hide', this.images[this.localCurrent])
        }
      },
      current (v) {
        this.localCurrent = v
      },
      localCurrent (v) {
        this.$emit('toggle', this.images[this.localCurrent])
      }
    },
    methods: {
      close () {
        this.localDisplay = false
      },
      prev () {
        if (this.localCurrent > 0) --this.localCurrent
      },
      next () {
        if (this.localCurrent < this.images.length - 1) ++this.localCurrent
      },
      isCurrentIllegal (c) {
        if (!(this.images && this.images.length)) return true
        c = Number(c)
        return c >= 0 && c <= this.images.length - 1
      },
      allow (direc) {
        if (direc === 'prev') return this.images && this.images.length && this.localCurrent > 0
        else return this.images && this.images.length && this.localCurrent < this.images.length - 1
      }
    }
  }
</script>
