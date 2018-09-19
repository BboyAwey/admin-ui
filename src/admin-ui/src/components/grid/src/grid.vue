<style lang="scss">
  .au-grid {
    display: block;
    box-sizing: border-box;
    // transition-property: width, margin-left;
    // transition-duration: .2s;
    // transition-timing-function: ease-out;
  }
  // 12 sizes of grid cell
  @for $i from 1 through 12 {
    .au-grid-cell-#{$i} {
      flex: 0 0 $i/12*100%;
      flex-basis: auto;
      // width: $i/12*100%;
    }
  }
  // simple offset rule
  @for $i from 1 through 12 {
    .au-grid-offset-#{$i} {
      margin-left: $i/12*100%;
    }
  }
</style>

<template>
  <div
    class="au-grid"
    :class="`au-grid-cell-${cellNumber} au-grid-offset-${offsetNumber}`"
    :style="{
      margin: `0 ${row[row.length - 1] === $el ? 0 : space} ${isLastRow ? 0 : space} 0`,
      width: `${(containerWidth + parseInt(space)) / (12 / cellNumber) - parseInt(space)}px`
    }">
      <slot></slot>
  </div>
</template>

<script>
import getElementSize from '../../../helpers/dom/get-element-size'
import getWindowSize from '../../../helpers/dom/get-window-size'

function validateWidth (v) { return v >= 1 && v <= 12 && parseInt(v) === Number(v) }
function getElementInnerWidth (el) {
  let copy = el.cloneNode()
  copy.innerHTML = ''
  let div = document.createElement('div')
  div.style.width = '100%'
  copy.appendChild(div)
  el.parentNode.appendChild(copy)
  let res = getElementSize(div).width
  copy.parentNode.removeChild(copy)
  return res
}

export default {
  name: 'au-grid',
  props: {
    widthLg: {
      type: [String, Number],
      validator: validateWidth
    },
    widthMd: {
      type: [String, Number],
      validator: validateWidth
    },
    widthSm: {
      type: [String, Number],
      validator: validateWidth
    },
    widthXs: {
      type: [String, Number],
      validator: validateWidth
    },
    offsetLg: {
      type: [String, Number],
      default: 0
    },
    offsetMd: {
      type: [String, Number],
      default: 0
    },
    offsetSm: {
      type: [String, Number],
      default: 0
    },
    offsetXs: {
      type: [String, Number],
      default: 0
    },
    space: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      cellNumber: 12,
      offsetNumber: 0,
      breakPoint: { // base on this size to pile cells or list them horizontally
        lg: 1170,
        md: 970,
        sm: 750
      },
      observer: null,
      observerCount: 0,
      observerClock: null,
      containerWidth: 0,
      row: [],
      isLastRow: false,
      timer: null
    }
  },
  mounted () {
    // if (!(this.widthLg || this.widthMd || this.widthSm || this.widthXs)) {
    //   throw new Error('Admin UI@au-grid@ Atleast you should pass one width-* prop to grid')
    // }
    this.setContainer()
    this.getNumber(false)
    window.addEventListener('resize', this.getNumber)
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    if (MutationObserver) {
      let config = {
        attributes: true,
        childList: false,
        subtree: false,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false,
        attributeFilter: ['style']
      }
      let vm = this
      vm.observer = new MutationObserver(function (mutations) {
        let hasDisplayChange = false
        mutations.forEach(m => {
          if (m.attributeName === 'style' && m.target.style.display !== 'none') {
            hasDisplayChange = true
          }
        })
        if (hasDisplayChange) {
          vm.observer.disconnect() // need pause observe to prevent infinity loop
          vm.$el.parentNode.style.display = 'flex'
          vm.$nextTick(() => vm.observer.observe(vm.$el.parentNode, config)) // and after render the observing should continue
        }
      })
      vm.observer.observe(vm.$el.parentNode, config)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.getNumber)
    if (this.observe) this.observer.disconnect()
  },
  watch: {
    widthLg () {
      this.getNumber(false)
    },
    widthMd () {
      this.getNumber(false)
    },
    widthSm () {
      this.getNumber(false)
    },
    widthXs () {
      this.getNumber(false)
    },
    offsetLg () {
      this.getNumber(false)
    },
    offsetMd () {
      this.getNumber(false)
    },
    offsetSm () {
      this.getNumber(false)
    },
    offsetXs () {
      this.getNumber(false)
    }
  },
  methods: {
    setContainer () {
      let container = this.$el.parentNode
      container.style.display = 'flex'
      container.style.flexWrap = 'wrap'
    },
    getNumber (throttling = true) {
      let vm = this
      function getAll () {
        vm.getCellNumber()
        vm.getOffsetNumber()
        vm.getContainerWidth()
        vm.$nextTick(vm.gatherRow)
      }
      if (throttling) {
        if (vm.timer) {
          window.clearTimeout(vm.timer)
          vm.timer = window.setTimeout(getAll, 200)
        } else {
          window.setTimeout(getAll, 200)
        }
      } else {
        getAll()
      }
    },
    getCellNumber () {
      // let containerWidth = getElementSize(this.$el.parentNode).width
      let windowWidth = getWindowSize().width

      if (this.widthLg && windowWidth >= this.breakPoint.lg) {
        this.cellNumber = this.widthLg
        // this.offsetNumber = this.offsetLg
      } else if (this.widthMd && windowWidth >= this.breakPoint.md) {
        this.cellNumber = this.widthMd
        // this.offsetNumber = this.offsetMd
      } else if (this.widthSm && windowWidth >= this.breakPoint.sm) {
        this.cellNumber = this.widthSm
        // this.offsetNumber = this.offsetSm
      } else if (this.widthXs) {
        this.cellNumber = this.widthXs
        // this.offsetNumber = this.offsetXs
      } else {
        this.cellNumber = 12
        // this.offsetNumber = 0
      }
      this.$el.setAttribute('data-grid', this.cellNumber)
    },
    getOffsetNumber () {
      // let containerWidth = getElementSize(this.$el.parentNode).width
      let windowWidth = getWindowSize().width

      if (this.offsetLg && windowWidth >= this.breakPoint.lg) {
        this.offsetNumber = this.offsetLg
      } else if (this.offsetMd && windowWidth >= this.breakPoint.md) {
        this.offsetNumber = this.offsetMd
      } else if (this.offsetSm && windowWidth >= this.breakPoint.sm) {
        this.offsetNumber = this.offsetSm
      } else if (this.offsetXs) {
        this.offsetNumber = this.offsetXs
      } else {
        this.offsetNumber = 0
      }
    },
    getContainerWidth () {
      this.containerWidth = getElementInnerWidth(this.$el.parentNode)
    },
    gatherRow () {
      let allGrid = this.$el.parentNode.querySelectorAll('.au-grid')
      let cellCount = 0
      for (let i = 0; i < allGrid.length; i++) {
        cellCount += parseInt(allGrid[i].getAttribute('data-grid'))
        if (allGrid[i + 1] && cellCount + parseInt(allGrid[i + 1].getAttribute('data-grid')) > (parseInt(cellCount / 12) + 1) * 12) {
          cellCount = (parseInt(cellCount / 12) + 1) * 12
        }
        if (allGrid[i] === this.$el) break
      }
      let start = 0
      let end = 0
      if (cellCount % 12) {
        start = parseInt(cellCount / 12) * 12
      } else {
        start = parseInt(cellCount / 12 - 1) * 12
      }
      end = start + 12
      let cellCount2 = 0
      for (let i = 0; i < allGrid.length; i++) {
        cellCount2 += parseInt(allGrid[i].getAttribute('data-grid'))
        if (allGrid[i + 1] && cellCount2 + parseInt(allGrid[i + 1].getAttribute('data-grid')) > (parseInt(cellCount2 / 12) + 1) * 12) {
          cellCount2 = (parseInt(cellCount2 / 12) + 1) * 12
        }
        if (cellCount2 > start && cellCount2 <= end) {
          this.row.push(allGrid[i])
        }
      }
      if (cellCount2 > start && cellCount2 <= end) this.isLastRow = true
      else this.isLastRow = false
    }
  }
}
</script>
