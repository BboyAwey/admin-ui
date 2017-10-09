<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/label";
  @import "../../../style/warnings";
  .au-cascading {
    display: inline-block;
  }
  .au-cascading-core {
    min-width: 60px;
  }
  .au-cascading-core:not(:last-child) {
    margin-right: 12px;
  }
</style>
<template>
  <div class="au-cascading">
    <div class="au-form-label" :class="{
      'au-theme-font-color--base-3': !hasWarnings,
      'au-theme-font-color--danger-3': hasWarnings
    }" :style="{
      cursor: disabled ? 'not-allowed' : 'default'
    }">{{ label }}</div>
    <div class="au-cascading-core-container"><au-select
      class="au-cascading-core"
      :warnings=" hasWarnings ? [] : null"
      :size="size"
      v-for="(levelArr, index) in cascadingData"
      :key="index"
      :options="filterOptions(levelArr, index)"
      v-model="selectedOptions[index]"
      @select="select"
      @change="change"
      @focus="focus"
      @blur="blur"
      :disabled="disabled"
      ref="au-select"></au-select></div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, i) in warnings" :key="i">{{ warning }}</div>
    <div class="au-from-warning au-theme-font-color--danger-3" v-for="(warning, i) in localWarnings" :key="i">{{ warning }}</div>
  </div>
</template>
<script>
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import auSelect from '../../select'

  export default {
    name: 'au-cascading',
    mixins: [FormApiMixin, ValidatorMixin],
    components: {
      auSelect
    },
    data () {
      return {
        // ancestor chain, used to save selected value
        selectedOptions: this.initAncestorsLink(this.value),
        level: 0
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    computed: {
      cascadingData () {
        return this.calcCascadingData(this.options)
      }
    },
    watch: {
      options: {
        handler (v) {
          this.cascadingData = this.calcCascadingData(v)
        },
        deep: true
      },
      value (v) {
        this.selectedOptions = this.initAncestorsLink(v)
      },
      localValue (v) {
        this.input() // input first to ensure changes of father comp
        this.change()
      }
    },
    methods: {
      calcCascadingData (originArr) {
        // reconstruct the tree data into two-dimensional array based on the level of tree data
        let container = []
        let level = 0
        function resolve (arr, parent) {
          if (!container[level]) container[level] = []
          // traverse current level
          for (let i = 0; i < arr.length; i++) {
            container[level].push(Object.assign(arr[i], { level, parent }))
            // if has child level
            if (arr[i].children && arr[i].children.length) {
              level++
              // traverse child level
              resolve(arr[i].children, arr[i])
            }
          }
          level--
        }
        resolve(originArr)
        this.level = container.length
        return container
      },
      initAncestorsLink (bottomNodeValue) {
        if (!bottomNodeValue) return []
        // use the bottom level to calc ancestor chain
        let res = []
        let cascadingData = this.calcCascadingData(this.options)
        let bottomNodes = cascadingData[cascadingData.length - 1]
        let bottomNode = null
        // find the last node
        for (let i = 0; i < bottomNodes.length; i++) {
          if (bottomNodes[i].value === bottomNodeValue) {
            bottomNode = bottomNodes[i]
            break
          }
        }
        function calcLink (node) {
          res.unshift(node.value)
          let parent = node.parent
          if (parent) calcLink(parent)
        }
        calcLink(bottomNode)
        return res
      },
      select (node) {
        // if some node in the ancestor chain changed then all the descendant node should change
        let vm = this
        function revalueNextLevel (node) {
          if (node.children && node.children.length) {
            // set the corresponding node in ancestor chain if has child node
            vm.$set(vm.selectedOptions, node.level + 1, node.children[0].value)
            revalueNextLevel(node.children[0], node.level + 1)
          } else {
            // if has no child node then it is the bottom level
            vm.$set(vm.selectedOptions, node.level, node.value)
          }
        }
        revalueNextLevel(node)
        vm.localValue = vm.selectedOptions[vm.selectedOptions.length - 1]
      },
      // filter the options in each level
      filterOptions (options, level) {
        if (!level) return options
        return options.filter(option => option.parent.value === this.selectedOptions[level - 1])
      }
    }
  }
</script>



