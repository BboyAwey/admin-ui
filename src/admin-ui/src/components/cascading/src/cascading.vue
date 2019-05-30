<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/label";
  @import "../../../style/warnings";
  .au-cascading {
    display: inline-block;
    .au-cascading-core-inline {
      display: inline-block;
    }
    .au-cascading-core-block {
      display: block;
    }
    .au-cascading-core-inline:not(:last-child) {
      margin-right: 10px;
    }
    .au-cascading-core-block:not(:last-child) {
      margin-bottom: 8px;
    }
  }
</style>
<template>
  <div class="au-cascading au-theme-color--base-3" :style="{display: listType === 'block' && fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="listType === 'inline'"
      :warnings="warnings || localWarnings">
      <div>
        <au-select
          class="au-cascading-core"
          :class="'au-cascading-core' + (listType === 'block' ? '-block' : '-inline')"
          :size="size"
          v-for="(levelArr, index) in cascadingData"
          :key="index"
          :options="filterOptions(levelArr, index)"
          v-model="selectedOptions[index]"
          :placeholder="placeholder instanceof Array ? placeholder[index] : placeholder"
          @select="select"
          @focus="focus"
          @blur="blur"
          :warning="hasWarnings"
          :disabled="disabled"
          :inline="false"
          :full-width="listType === 'block' && fullWidth"
          :width="singleWidth"
          :max-width="singleMaxWidth"
          :min-width="singleMinWidth"
          ref="au-select"/>
      </div>
    </form-item>
  </div>
</template>
<script>
import FormApiMixin from 'helpers/form-api-mixin'
import ValidatorMixin from 'helpers/validator-mixin'
import AuSelect from 'components/select'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-cascading',
  mixins: [FormApiMixin, ValidatorMixin],
  components: { AuSelect, FormItem },
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
    },
    placeholder: {
      type: [Array, String]
    },
    listType: {
      type: String,
      default: 'inline'
    },
    fullWidth: Boolean,
    singleWidth: String,
    singleMaxWidth: String,
    singleMinWidth: String
  },
  computed: {
    cascadingData () {
      return this.calcCascadingData(this.options)
    },
    selectedData () {
      let cascadingData = this.cascadingData
      let res = []
      this.selectedOptions.forEach((e, i) => {
        if (cascadingData[i] instanceof Array) {
          for (let j = 0; j < cascadingData[i].length; j++) {
            if (cascadingData[i][j].value === e) {
              res.push(cascadingData[i][j])
              break
            }
          }
        }
      })
      return res
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
      // this.change()
      this.$emit('change', v, this.selectedOptions, this.selectedData)
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
