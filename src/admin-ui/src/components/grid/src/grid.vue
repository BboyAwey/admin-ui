<style lang="scss">
  .au-grid {
    display: block;
    box-sizing: border-box;
    // transition-property: width, margin-left;
    // transition-duration: .2s;
    // transition-timing-function: ease-out;
  }
  // 24 sizes of grid cell
  @for $i from 1 through 24 {
    .au-grid-cell-#{$i} {
      flex: 0 0 $i/24*100%;
      flex-basis: auto;
      // width: $i/24*100%;
    }
  }
  // simple offset rule
  @for $i from 1 through 24 {
    .au-grid-offset-#{$i} {
      margin-left: $i/24*100%;
    }
  }
</style>

<template>
  <div
    class="au-grid"
    :class="`au-grid-cell-${cellNumber} au-grid-offset-${offsetNumber}`"
    :style="{
      margin: `0 ${row[row.length - 1] === $el ? 0 : space} ${isLastRow ? 0 : space} 0`,
      width: `${(containerWidth + parseInt(space)) / (24 / cellNumber) - parseInt(space)}px`
    }">
      <slot></slot>
  </div>
</template>

<script>
import { getElementSize, getWindowSize } from 'helpers/dom'
import { addListener, removeListener } from 'resize-detector'

function validateWidth (v) { return v >= 1 && v <= 24 && parseInt(v) === Number(v) }
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
    widthXl: {
      type: [String, Number],
      validator: validateWidth
    },
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
    offsetXl: {
      type: [String, Number],
      default: 0
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
      cellNumber: 24,
      offsetNumber: 0,
      breakPoint: { // base on this size to pile cells or list them horizontally
        xl: 1900,
        lg: 1180,
        md: 940,
        sm: 748,
        xs: 0
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
    this.reorder()
    addListener(this.$el.parentElement, this.reorder)
  },
  beforeDestroy () {
    if (this.observe) this.observer.disconnect()
    removeListener(this.$el.parentElement, this.reorder)
  },
  watch: {
    widthXl () {
      this.reorder()
    },
    widthLg () {
      this.reorder()
    },
    widthMd () {
      this.reorder()
    },
    widthSm () {
      this.reorder()
    },
    widthXs () {
      this.reorder()
    },
    offsetXl () {
      this.reorder()
    },
    offsetLg () {
      this.reorder()
    },
    offsetMd () {
      this.reorder()
    },
    offsetSm () {
      this.reorder()
    },
    offsetXs () {
      this.reorder()
    }
  },
  methods: {
    setContainer () {
      let container = this.$el.parentNode
      container.style.display = 'flex'
      container.style.flexWrap = 'wrap'
    },
    reorder () {
      if (window.getComputedStyle(this.$el.parentNode).display === 'none') return
      this.setContainer()
      this.getCellNumber()
      this.getOffsetNumber()
      this.getContainerWidth()
      this.$nextTick(this.gatherRow)
    },
    getCellNumber () {
      // let containerWidth = getElementSize(this.$el.parentNode).width
      let referenceWidth = getWindowSize().width

      if (this.widthXl && referenceWidth >= this.breakPoint.xl) {
        this.cellNumber = this.widthXl
      } else if (this.widthLg && referenceWidth >= this.breakPoint.lg) {
        this.cellNumber = this.widthLg
      } else if (this.widthMd && referenceWidth >= this.breakPoint.md) {
        this.cellNumber = this.widthMd
      } else if (this.widthSm && referenceWidth >= this.breakPoint.sm) {
        this.cellNumber = this.widthSm
      } else if (this.widthXs) {
        this.cellNumber = this.widthXs
      } else {
        this.cellNumber = 24
      }
      this.$el.setAttribute('data-grid', this.cellNumber)
    },
    getOffsetNumber () {
      // let containerWidth = getElementSize(this.$el.parentNode).width
      let referenceWidth = getWindowSize().width

      if (this.offsetXl && referenceWidth >= this.breakPoint.xl) {
        this.offsetNumber = this.offsetXl
      } else if (this.offsetLg && referenceWidth >= this.breakPoint.lg) {
        this.offsetNumber = this.offsetLg
      } else if (this.offsetMd && referenceWidth >= this.breakPoint.md) {
        this.offsetNumber = this.offsetMd
      } else if (this.offsetSm && referenceWidth >= this.breakPoint.sm) {
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
        if (allGrid[i + 1] && cellCount + parseInt(allGrid[i + 1].getAttribute('data-grid')) > (parseInt(cellCount / 24) + 1) * 24) {
          cellCount = (parseInt(cellCount / 24) + 1) * 24
        }
        if (allGrid[i] === this.$el) break
      }
      let start = 0
      let end = 0
      if (cellCount % 24) {
        start = parseInt(cellCount / 24) * 24
      } else {
        start = parseInt(cellCount / 24 - 1) * 24
      }
      end = start + 24
      let cellCount2 = 0
      for (let i = 0; i < allGrid.length; i++) {
        cellCount2 += parseInt(allGrid[i].getAttribute('data-grid'))
        if (allGrid[i + 1] && cellCount2 + parseInt(allGrid[i + 1].getAttribute('data-grid')) > (parseInt(cellCount2 / 24) + 1) * 24) {
          cellCount2 = (parseInt(cellCount2 / 24) + 1) * 24
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
