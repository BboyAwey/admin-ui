<style lang="scss">
  .au-scroller {
    position: relative;
    overflow: hidden;
    border: 1px solid red;
  }
  .au-scroller-content {
    position: absolute;
    top: 0;
    left: 0;
    transition: top .3s ease-out;
  }
  .au-scroller-bar-container,
  .au-scroller-bar,
  .au-scroller-bar-core {
    position: absolute;
    width: 6px;
    top: 0;
  }
  .au-scroller-bar-container {
    right: 0;
    height: 100%;
  }
  .au-scroller-bar {
    right: 1px;
    width: 4px;
    height: 50px;
    opacity: .3;

  }
</style>
<template>
  <div class="au-scroller" :style="{ height }" ref="self">
    <div class="au-scroller-content" ref="content" :style="{ top: top + 'px' }">
      <slot></slot>
    </div>
    <div class="au-scroller-bar-container" ref="container">
      <div class="au-scroller-bar au-theme-radius au-theme-background-color--base-1" ref="bar"></div>
      <div class="au-scroller-bar-core au-theme-radius" ref="core"></div>
    </div>
  </div>
</template>
<script>
  import { getElementSize, mousewheel } from '../../../helpers/dom'
  console.log(getElementSize)
  export default {
    name: 'au-scroller',
    mounted () {
      mousewheel('add', this.$refs.self, (e) => {
        let direction = e.deltaY || e.detail // chrome,edge / firefox
        let step = 100 * ((direction < 0 ? -direction : direction) / direction)
        this.move(step)
      })
    },
    destroyed () {
      mousewheel('remove', this.$refs.self)
    },
    props: {
      height: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        top: 0,
        clock: null
      }
    },
    methods: {
      move (step) {
        let vm = this
        let selfHeight = getElementSize(vm.$refs.self).height
        let contentHeight = getElementSize(vm.$refs.content).height
        let diff = selfHeight - contentHeight
        if (step > 0 && vm.top > diff) {
          vm.top = vm.top - step < diff ? diff : vm.top - step
        } else if (step < 0 && vm.top < 0) {
          vm.top = vm.top - step > 0 ? 0 : vm.top - step
        }
      }
    }
  }
</script>


