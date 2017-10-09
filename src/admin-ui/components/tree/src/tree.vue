<style lang="scss">
  @import '../../../style/vars.scss';
  .admin-tree-warp {
    li {
      line-height: 26px;
      position: relative;
    }
    input.admin-checkbox {
      display: none;
    }
    input.admin-checkbox:checked + .admin-checkbox-sub {
      position: relative;
      border: none;
      background-color: #0e9ee2;
    }
    input.admin-checkbox:checked + .admin-checkbox-sub:before {
      content: '';
      position: absolute;
      top: 4px;
      left: 3px;
      display: inline-block;
      width: 8px;
      height: 4px;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
      transform-origin: 50% 50%;
      transform: rotate(-45deg);
    }
    input.admin-checkbox + .admin-checkbox-sub {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-bottom: - 2px;
      border: 1px solid #d2d4d9;
      border-radius: 2px;
      outline: none;
    }
    input.admin-checkbox:checked + .tree-part-checked {
      background-color: rgba(#0e9ee2, .5) !important;
    }
    .tree-menu-open {
      font-size: 10px;
      color: #d2d4d9;
      margin-left: 10px;
      cursor: pointer;
    }
    .checkbox-warp-div{
      position: relative;
      z-index: 99;
      &.close-tree +.admin-tree-sub-warp{
        display: none;
      }
    }
    .no-checkedbox-label {
      position: relative;
      z-index: 10;
    }
  }
  .admin-tree-sub-warp {
    padding-left: 25px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -7px;
      left: 7px;
      height: 100%;
      border-left: solid #d2d4d9 1px;
      z-index: 1
    }
    li::before {
      content: '';
      position: absolute;
      top: 11px;
      left: -18px;
      height: 100%;
      width: 18px;
      border-top: solid #d2d4d9 1px;
      z-index: 1
    }
    li:last-child:before {
      background-color: #fff;
    }
    &.list-inline {
      &>li {
        margin-right: 18px;
        display: inline-block;
        &:not(:first-child)::before {
          background-color: #fff;
          border: none;
        }
        &:first-child::before {
          background-color: #fff;
        }
      }
    }
  }
  .admin-tree-checkbox {
    margin-right: 5px;
  }
</style>
<script>
  // Author: yuhaijun
  // email: yuhaijun@rongcapital.cn
  import { deepClone, getDataType } from '../../../helpers/utils'
  import { addClass, removeClass } from '../../../helpers/dom'
  export default {
    name: 'au-tree',
    created () {
      this.copyData = deepClone(this.treeData)
      this.setPos(this.copyData)
      this.setCheckedType(this.copyData)
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
          this.setCheckedType(this.copyData)
          this.computedTreeData = deepClone(this.copyData)
        }
      }
    },
    props: {
      treeData: {
        type: Array,
        default: []
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
              'admin-tree-sub-warp': !isTop,
              'list-inline': !isTop && this.displayInline(data)
            }
          },
          this.createTreeDom(c, data)
      )
      },
      createTreeDom (c, data) {
        return data.map((item) => {
          return c(
            'li',
            {},
            [this.createChildren(c, item), item.children && item.children.length ? this.createTree(c, item.children, false) : null]
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
                'close-tree': !this.showChildren
              }
            },
            [c(
              'label',
              [c(
                'input',
                {
                  attrs: {
                    type: 'checkbox',
                    'data-type': item.checkedType
                  },
                  domProps: {
                    checked: item.checked,
                    value: item.index.join('-')
                  },
                  class: {
                    'admin-checkbox': true
                  },
                  on: {
                    change: this.treeCheckedChange
                  }
                }
              ), c(
                'span',
                {
                  class: {
                    'admin-checkbox-sub': true,
                    'admin-tree-checkbox': true,
                    'tree-part-checked': item.checked && item.checkedType === 'part'
                  }
                }
              ), c('span', item.label)]
            ), item.children && item.children.length ? c(
              'i',
              {
                class: {
                  'tree-menu-open': true,
                  'fa': true,
                  'fa-chevron-down': this.showChildren,
                  'fa-chevron-right': !this.showChildren
                },
                on: {
                  click: this.toggleClass
                }
              }) : null]
          )
        } else {
          return c(
            'span',
            {
              class: {
                'no-checkedbox-label': true
              },
              domProps: {
                innerHTML: item.label
              }
            }
          )
        }
      },
      displayInline (children) {
        var b = children.some((item) => {
          return item.children && item.children.length > 0
        })
        return !b
      },
      toggleClass (evt) {
        var t = evt.target
        var target = t.parentNode
        if (target.className.indexOf('close-tree') > -1) {
          removeClass(target, 'close-tree')
          removeClass(t, 'fa-chevron-right')
          addClass(t, 'fa-chevron-down')
        } else {
          addClass(target, 'close-tree')
          removeClass(t, 'fa-chevron-down')
          addClass(t, 'fa-chevron-right')
        }
      },
      parseData (data) {
        var newData = deepClone(data)
        if (getDataType(newData) === 'array') {
          this.deletePropery(newData)
        } else {
          delete newData.index
          delete newData.checkedType
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
          if (item.children && item.children.length) {
            this.deletePropery(item.children)
          }
        }, this)
      },
      treeCheckedChange (evt) {
        var target = evt.target
        var value = target.value
        var type = target.dataset.type
        var checked = !target.checked && type === 'part' ? true : target.checked
        this.setCheckedTypeByNodes(value.split('-'), checked, this.computedTreeData)
        this.$emit('tree-change', this.parseData(this.getNodesByIndex(value.split('-'), this.computedTreeData)), this.parseData(this.computedTreeData))
      },
      setPos (arr, pIndex) {
        arr.forEach((item, i) => {
          if (pIndex) {
            this.$set(item, 'index', pIndex.concat([i]))
          } else {
            this.$set(item, 'index', [i])
          }
          if (item.children && item.children.length) {
            item.children.forEach((itemD, j) => {
              if (!pIndex) {
                this.$set(itemD, 'index', [i, j])
              } else {
                this.$set(itemD, 'index', item.index.concat([j]))
              }
              if (itemD.children && itemD.children.length) {
                this.setPos(itemD.children, itemD.index)
              }
            }, this)
          }
        }, this)
      },
      // 设置全选半选状态
      setCheckedType (arr) {
        arr.forEach((item) => {
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
            return
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
