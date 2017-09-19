<style lang="scss">
  .au-grid {
    display: block;
    transition-property: width, margin-left;
    transition-duration: .2s;
    transition-timing-function: ease-out;
  }
  // 12 sizes of grid cell
  @for $i from 1 through 12 {
    .au-grid-cell-#{$i} {
      flex: 0 0 $i/12*100%;
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
  <div class="au-grid" :class="`au-grid-cell-${cellNumber} au-grid-offset-${offsetNumber}`">
    <slot></slot>
  </div>
</template>

<script>
  import { hasClass, getElementSize } from '../../../helpers/dom'

  function validateWidth (v) { return v >= 1 && v <= 12 && parseInt(v) === Number(v) }

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
        }
      }
    },
    mounted () {
      if (!hasClass(this.$parent.$el, 'au-grid-container')) {
        throw new Error('Admin UI@<au-grid> should be a child of <au-grid-container>')
      }
      if (!(this.widthLg || this.widthMd || this.widthSm || this.widthXs)) {
        throw new Error('Admin UI@ Atleast you should pass one width-* prop to grid')
      }
      this.getNumber()
      window.addEventListener('resize', this.getNumber)
    },
    destroyed () {
      window.removeEventListener('resize', this.getNumber)
    },
    watch: {
      widthLg () {
        this.getNumber()
      },
      widthMd () {
        this.getNumber()
      },
      widthSm () {
        this.getNumber()
      },
      widthXs () {
        this.getNumber()
      }
    },
    methods: {
      getNumber () {
        this.getCellNumber()
        this.getOffsetNumber()
      },
      getCellNumber () {
        let containerWidth = getElementSize(this.$parent.$el).width

        if (this.widthLg && containerWidth >= this.breakPoint.lg) {
          this.cellNumber = this.widthLg
          this.offsetNumber = this.offsetLg
        } else if (this.widthMd && containerWidth >= this.breakPoint.md) {
          this.cellNumber = this.widthMd
          this.offsetNumber = this.offsetMd
        } else if (this.widthSm && containerWidth >= this.breakPoint.sm) {
          this.cellNumber = this.widthSm
          this.offsetNumber = this.offsetSm
        } else if (this.widthXs) {
          this.cellNumber = this.widthXs
          this.offsetNumber = this.offsetXs
        } else {
          this.cellNumber = 12
          this.offsetNumber = 0
        }
      },
      getOffsetNumber () {
        let containerWidth = getElementSize(this.$parent.$el).width

        if (this.offsetLg && containerWidth >= this.breakPoint.lg) {
          this.offsetNumber = this.offsetLg
        } else if (this.offsetMd && containerWidth >= this.breakPoint.md) {
          this.offsetNumber = this.offsetMd
        } else if (this.offsetSm && containerWidth >= this.breakPoint.sm) {
          this.offsetNumber = this.offsetSm
        } else if (this.offsetXs) {
          this.offsetNumber = this.offsetXs
        } else {
          this.offsetNumber = 0
        }
      }
    }
  }
</script>

