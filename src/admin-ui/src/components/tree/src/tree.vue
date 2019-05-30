<style lang="scss">
  @import '../../../style/vars.scss';
  .admin-tree-warp {
    li {
      line-height: 26px;
      position: relative;
    }
    .sub-toggle {
      display: none;
    }
    .tree-menu-open {
      font-size: 10px;
      margin-right: 10px;
      cursor: pointer;
      position: absolute;
      top: 7px;
      left: 10px;
    }
    .checkbox-warp-div{
      position: relative;
      z-index: 99;
      padding: 2px 0 3px 30px;
      cursor: pointer;
      &.close-tree +.admin-tree-sub-warp{
        display: none;
      }
    }
    .no-checkedbox-label {
      position: relative;
      z-index: 10;
      padding-left: 30px;
      display: block;
      line-height: 21px;
      margin-bottom: 5px;
      cursor: pointer;
      &.close-tree +.admin-tree-sub-warp{
        display: none;
      }
    }
  }
  .admin-tree-sub-warp {
    padding-left: 25px;
    position: relative;
  }
  .admin-tree-checkbox {
    margin-right: 5px;
  }
</style>
<script>
// Author: yuhaijun
// email: yuhaijun@rongcapital.cn
import { deepClone, getDataType } from 'helpers/utils'
export default {
  name: 'au-tree',
  created () {
    this.copyData = deepClone(this.treeData)
    this.setPos(this.copyData)
    this.showCheckbox && this.setCheckedType(this.copyData)
    this.computedTreeData = deepClone(this.copyData)
  },
  render (creatDom) {
    return this.createTree(creatDom, this.computedTreeData, true)
  },
  data () {
    return {
      computedTreeData: [],
      copyData: []
    }
  },
  watch: {
    treeData: {
      deep: true,
      handler (v) {
        this.copyData = deepClone(this.treeData)
        this.setPos(this.copyData)
        this.showCheckbox && this.setCheckedType(this.copyData)
        this.computedTreeData = deepClone(this.copyData)
      }
    }
  },
  props: {
    treeData: {
      type: Array,
      default () {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    showChildren: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    createTree (c, data, isTop) {
      return c(
        'ul',
        {
          class: {
            'admin-tree-warp': isTop,
            'au-theme-color--base-3': true,
            'admin-tree-sub-warp': !isTop,
            'sub-toggle': !isTop && !data.showChildren
            // 'list-inline': !isTop && this.displayInline(data)
          }
        },
        this.createTreeDom(c, isTop ? data : data.children)
      )
    },
    createTreeDom (c, data) {
      return data.map((item) => {
        return c(
          'li',
          {},
          [this.createChildren(c, item), item.children && item.children.length ? this.createTree(c, item, false) : null]
        )
      }, this)
    },
    createChildren (c, item) {
      if (this.showCheckbox) {
        return c(
          'div',
          {
            class: {
              'checkbox-warp-div': true,
              'au-theme-hover-background-color--base-11': true
            },
            on: {
              click: (e) => {
                this.toggleClass(item.index, e)
              }
            }
          },
          [item.children && item.children.length ? c(
            'i', {
              class: {
                'tree-menu-open': true,
                'au-theme-color--base-8': true,
                'fa': true,
                'fa-chevron-down': item.showChildren,
                'fa-chevron-right': !item.showChildren
              }
            }) : null, c(
            'au-checkbox', {
              props: {
                text: item.label,
                value: item.checked,
                indeterminate: item.checkedType === 'part'
              },
              ref: 'box-' + item.index.join('-'),
              nativeOn: {
                'click': (e) => {
                  // console.log(this.$refs['box-' + item.index.join('-')])
                  if (item.checkedType === 'part') this.$refs['box-' + item.index.join('-')].localValue = true
                  this.treeCheckedChange(!item.checked, item.index.join('-'), item.checkedType, e)
                  e.stopPropagation()
                }
              }
            }
          )]
        )
      } else {
        return c(
          'span',
          {
            class: {
              'no-checkedbox-label': true,
              'au-theme-hover-background-color--base-11': true
            },
            on: {
              click: (e) => {
                this.toggleClass(item.index, e)
              }
            }
          },
          [
            item.children && item.children.length ? c(
              'i',
              {
                class: {
                  'tree-menu-open': true,
                  'au-theme-color--base-8': true,
                  'fa': true,
                  'fa-chevron-down': item.showChildren,
                  'fa-chevron-right': !item.showChildren
                }
              }
            ) : null, item.label
          ]
        )
      }
    },
    displayInline (children) {
      var b = children.some((item) => {
        return item.children && item.children.length > 0
      })
      return !b
    },
    toggleClass (index, e) {
      var obj = this.getNodesByIndex(index, this.computedTreeData)
      this.$set(obj, 'showChildren', !obj.showChildren)
      this.$emit('node-click', this.parseData(this.getNodesByIndex(index, this.computedTreeData)), this.parseData(this.computedTreeData), e)
      if (obj.showChildren) {
        this.$emit('node-expand', this.parseData(this.getNodesByIndex(index, this.computedTreeData)), this.parseData(this.computedTreeData), e)
      } else {
        this.$emit('node-collapse', this.parseData(this.getNodesByIndex(index, this.computedTreeData)), this.parseData(this.computedTreeData), e)
      }
    },
    parseData (data) {
      var newData = deepClone(data)
      if (getDataType(newData) === 'array') {
        this.deletePropery(newData)
      } else {
        delete newData.index
        delete newData.checkedType
        delete newData.showChildren
        if (newData.children && newData.children.length) {
          this.deletePropery(newData.children)
        }
      }
      return newData
    },
    deletePropery (data) {
      data.forEach((item) => {
        delete item.index
        delete item.checkedType
        delete item.showChildren
        if (item.children && item.children.length) {
          this.deletePropery(item.children)
        }
      }, this)
    },
    treeCheckedChange (v, value, type, e) {
      // console.log(v, value, type)
      var checked = !v && type === 'part' ? true : v
      this.setCheckedTypeByNodes(value.split('-'), checked, this.computedTreeData)
      this.$emit('check-change', this.parseData(this.getNodesByIndex(value.split('-'), this.computedTreeData)), this.parseData(this.computedTreeData), e)
    },
    setPos (arr, pIndex) {
      arr.forEach((item, i) => {
        if (pIndex) {
          this.$set(item, 'index', pIndex.concat([i]))
        } else {
          this.$set(item, 'index', [i])
        }
        if (item.children && item.children.length) {
          this.$set(item, 'showChildren', this.showChildren)
          item.children.forEach((itemD, j) => {
            if (!pIndex) {
              this.$set(itemD, 'index', [i, j])
            } else {
              this.$set(itemD, 'index', item.index.concat([j]))
            }
            if (itemD.children && itemD.children.length) {
              this.$set(itemD, 'showChildren', this.showChildren)
              this.setPos(itemD.children, itemD.index)
            }
          }, this)
        }
      }, this)
    },
    // 设置全选半选状态
    setCheckedType (arr) {
      arr.forEach((item) => {
        !item.hasOwnProperty('checked') && this.$set(item, 'checked', true)
        if (item.checked) {
          if (item.children && item.children.length) {
            this.setCheckedType(item.children)
          } else {
            this.setAllCheckedType(item)
          }
        } else {
          this.setAllCheckedType(item)
        }
      })
    },
    // 根据节点设置checked
    setCheckedTypeByNodes (indexArr, checked, treeData) {
      var node = this.getNodesByIndex(indexArr, treeData)
      node.checked = checked
      checked ? node.checkedType = 'all' : node.checkedType = null
      if (node.children && node.children.length) {
        this.setChildrenChecked(node, checked)
      }
      this.setParentChecked(node, treeData)
    },
    // 递归设置所有节点选中类型
    setAllCheckedType (node) {
      var treeData = this.copyData
      var obj
      if (node.index && node.index.length > 1) {
        var indexArr = node.index.slice(0, -1)
        var parent = this.getNodesByIndex(indexArr, treeData)
        obj = this.getNodeCheckedType(parent)
        parent.checkedType = obj.checkedType
        this.setParentChecked(parent, treeData)
      } else {
        obj = this.getNodeCheckedType(node)
        node.checkedType = obj.checkedType
      }
    },
    // 根据index获取节点
    getNodesByIndex (indexArr, treeData) {
      var node
      indexArr.forEach((item, i) => {
        if (i === 0) {
          node = treeData[item]
        } else {
          node = node.children[item]
        }
      })
      return node
    },
    // 递归设置子节点选中状态
    setChildrenChecked (node, checked) {
      node.checked = checked
      checked && (node.checkedType = 'all')
      node.children.forEach((item, i) => {
        item.checked = checked
        checked ? item.checkedType = 'all' : item.checkedType = null
        if (item.children && item.children.length) {
          this.setChildrenChecked(item, checked)
        }
      })
    },
    // 递归设置父亲节点选中状态
    setParentChecked (node, treeData) {
      var obj
      if (node.index.length > 1) {
        var indexArr = node.index.slice(0, -1)
        var parent = this.getNodesByIndex(indexArr, treeData)
        obj = this.getNodeCheckedType(parent)
        parent.checked = obj.checked
        parent.checkedType = obj.checkedType
        this.setParentChecked(parent, treeData)
      } else {
        obj = this.getNodeCheckedType(node)
        node.checked = obj.checked
        node.checkedType = obj.checkedType
      }
    },
    // 获取节点的选中状态
    getNodeCheckedType (node) {
      if (!node.children || !node.children.length) {
        return {
          checked: node.checked,
          checkedType: 'all'
        }
      }
      var typeObj
      var f = 0
      var type
      var t = 0
      var len = node.children.length
      node.children.forEach((item) => {
        if (item.checked && item.checkedType === 'part') {
          type = 0
          // return
        } else if (!item.checked) {
          f++
          type = 1
        } else if (item.checked) {
          t++
          type = 2
        }
      })
      if (type === 0) {
        typeObj = {
          checked: true,
          checkedType: 'part'
        }
      } else if (type === 1 && f === len) {
        typeObj = {
          checked: false,
          checkedType: null
        }
      } else if (type === 2 && t === len) {
        typeObj = {
          checked: true,
          checkedType: 'all'
        }
      } else {
        typeObj = {
          checked: true,
          checkedType: 'part'
        }
      }
      return typeObj
    }
  }
}
</script>
