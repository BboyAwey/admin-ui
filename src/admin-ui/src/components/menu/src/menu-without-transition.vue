<style lang="scss">
  @import '../../../style/vars';
  .au-menu {
    position: relative;
    height: 100%;
    // width: 200px;
    // padding-top: 10px;
    list-style: none;
    li {
      position: relative;
    }
    .menu {
      position: relative;
      height: 40px;
      padding: 0 20px 0 0;
      overflow: hidden;
      line-height: 40px;
      font-size: $normal;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
    }
    .menu-text {
      display: inline-block;
    }
    .menu-icon {
      position: relative;
      top: 1px;
      margin-right: 10px;
      font-size: 18px;
    }
    .menu-fold-icon {
      position: relative;
      left: 12px;
      float: right;
      height: 40px;
      width: 40px;
      text-align: center;
      line-height: 40px;
      font-size: $large;
      // color: $grayDarken25;
    }
    .active:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      height: 100%;
      width: 4px;
      // background-color: $primary;
    }
    .collapse-handle {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      padding: 0 22px;
      line-height: 40px;
      border-bottom: 1px solid;
      text-align: right;
      font-size: $large;
      cursor: pointer;
    }
    .collapse-handle-icon {
      // transition: transform .2s ease-out;
    }
  }
  .au-menu.top-level {
    padding: 10px 0;
  }
  .au-menu.collapsable {
    padding-top: 40px;
  }
  .au-menu.collapse {
    width: 60px;
    .menu {
      // height: 60px;
      padding: 0;
      // line-height: 60px;
      cursor: pointer;
    }
    // & > li {
    //   height: 60px;
    //   line-height: 60px;
    // }
    .menu-icon {
      // top: 4px;
      // left: 10px;
      margin-right: 10px;
      // font-size: $huge;
    }
    .menu-text {
      display: none;
    }
    .collapse-handle {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .au-menu-pop-content {
    padding: 12px;
  }

  .au-menu-children-triangle,
  .au-menu-has-children-pop {
    border-width: 1px;
    border-style: solid;
  }
  .au-menu-children-popup {
    position: absolute;
    top: 0;
    left: 65px;
    left: 100%;
    z-index: 1;
  }
  .au-menu-popover-content {
    padding: 10px 0;
    max-height: 320px;
  }
</style>
<template>
  <div class="au-menu au-theme-font-color--base-3"
    :class="{
      'top-level au-theme-background-color--base-12': isTopLevel,
      'collapsable': collapsable && isTopLevel,
      'collapse': localCollapse
    }" ref="self">
    <div
      class="collapse-handle au-theme-border-color--base-8-important au-theme-font-color--base-3"
      @click="toggle"
      v-if="collapsable && isTopLevel">
      <au-icon type="angle-double-right" class="collapse-handle-icon" :style="{
        transform: localCollapse ? '' : 'rotate(180deg)'
      }"></au-icon>
    </div>
    <au-scroller style="height: 100%;" :scroll-top="scrollTop" @scroll="v　=>　scrollTop = v">
      <ul>
        <li
          v-for="(item, i) in localItems"
          :key="i">
          <au-popover
            ref="popover"
            :disabled="!localCollapse"
            :trigger="hasChildren(item) ? 'click' : 'hover'"
            :placement="hasChildren(item) ? (i < 5 ? 'right top' : 'right bottom') : 'right middle'"
            :plain="hasChildren(item)"
            :fix="hasChildren(item) ? 0 : '-2px'">
            <au-popover
              slot="target"
              :disabled="!localCollapse"
              :trigger="'hover'"
              :placement="'right middle'"
              :fix="'-2px'">
              <div class="menu"
                slot="target"
                :class="{
                  'au-theme-hover-background-color--base-10' : !decoration(item),
                  'au-theme-hover-font-color--primary-3': !decoration(item) && item.url,
                  'active au-theme-font-color--primary-3 au-theme-background-color--primary-5 au-theme-before-background-color--primary-3': decoration(item),
                  'au-theme-font-color--base-7': !item.url && !decoration(item) && !localCollapse,
                }"
                :style="{ paddingLeft: calcPaddingLeft(item)  }"
                @click="select(item)">
                <au-icon class="menu-icon" v-if="item.icon" :type="item.icon"></au-icon>
                <span class="menu-text">{{ item.text }}</span>
                <au-icon class="menu-fold-icon
                  au-theme-font-color--base-3
                  au-theme-hover-font-color--primary-3"
                  type="angle-down"
                  v-if="hasChildren(item)"
                  v-show="!localCollapse"
                  :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`, left: item.collapse ? '14px' : ''}"
                  @click.native.stop="toggleCollapse(item)"></au-icon>
              </div>
              <div slot="content" class="au-menu-pop-content">
                {{ item.text }}
              </div>
            </au-popover>

            <div v-if="!hasChildren(item)" slot="content" class="au-menu-pop-content">
              {{ item.text }}
            </div>
            <au-scroller v-if="hasChildren(item)" slot="content" class="au-menu-popover-content au-theme-font-color--base-3">
              <au-menu
                :items="item.children"
                :collapsable="false"
                :is-popover="true"
                :popover-ins="$refs.popover"
                :is-top-level="false"
                :all="isTopLevel ? localItems : all"
                @select="handlePopSelect"></au-menu>
            </au-scroller>
          </au-popover>
          <au-menu
            v-if="hasChildren(item)"
            v-show="!localCollapse && !item.collapse"
            :items="item.children"
            :is-top-level="false"
            :all="isTopLevel ? localItems : all"
            @select="handlePopSelect"></au-menu>
        </li>
      </ul>
    </au-scroller>
  </div>
</template>
<script>
  import AuIcon from '../../icon'
  import AuPopover from '../../popover'
  import AuScroller from '../../scroller'
  import { deepClone } from '../../../helpers/utils'
  import { hasClass } from '../../../helpers/dom'
  // import { getElementSize, getElementPagePos } from '../../../helpers/dom'

  export default {
    name: 'au-menu',
    components: { AuIcon, AuScroller, AuPopover },
    data () {
      return {
        localItems: [],
        localCollapse: this.collapse,
        currentItem: {},
        originWidth: '',
        scrollTop: 0
      }
    },
    props: {
      items: Array,
      collapse: Boolean,
      collapsable: {
        type: Boolean,
        default: true
      },

      all: Array,
      isTopLevel: {
        type: Boolean,
        default: true
      },
      isPopover: Boolean
    },
    mounted () {
      if (this.isTopLevel) {
        this.localItems = this.setInfo(this.items)
        this.activate(this.currentItem)
      } else this.localItems = this.items
    },
    watch: {
      items: {
        deep: true,
        handler () {
          if (this.isTopLevel) {
            this.localItems = this.setInfo(this.items)
            this.activate(this.currentItem)
          } else this.localItems = this.items
        }
      },
      collapse (v) {
        this.localCollapse = v
      },
      localCollapse (v) {
        if (v) {
          this.originWidth = this.$refs.self.style.width
          this.$refs.self.style.width = '60px'
          this.scrollTop = 0
        } else {
          this.$refs.self.style.width = this.originWidth
        }
        this.$emit('toggle', v)
      }
    },
    methods: {
      select (item) {
        this.currentItem = item
        this.activate()
        this.toggleCollapse(item)
        this.$emit('select', item)
      },
      deactivate () {
        let allItems = this.isTopLevel ? this.localItems : this.all
        let deactive = (items) => {
          items.forEach(item => {
            this.$set(item, 'active', false)
            this.$set(item, 'childrenActive', false)
            if (this.hasChildren(item)) {
              deactive(item.children)
            }
          })
        }
        deactive(allItems)
      },
      activate () {
        let item = this.currentItem
        if (item.url && !item.active) {
          this.deactivate()
          this.$set(item, 'active', true)
          let allItems = this.isTopLevel ? this.localItems : this.all
          let parent = null
          for (let i = 0; i < item.indexes.length - 1; i++) {
            parent = !parent ? allItems[item.indexes[i]] : parent.children[item.indexes[i]]
            this.$set(parent, 'childrenActive', true)
          }
        }
      },
      decoration (item) {
        if (this.localCollapse) {
          return item.active || item.childrenActive
        } else {
          if (item.collapse) {
            return item.childrenActive || item.active
          } else {
            return !item.childrenActive && item.active
          }
        }
      },
      setInfo (items, parentIndex = []) {
        let result = []
        if (items instanceof Array && items.length) {
          result = deepClone(items)
          result.forEach((item, i) => {
            let res = [].concat(parentIndex)
            res.push(i)
            item.indexes = res
            item.children = this.setInfo(item.children, item.indexes)

            if (this.isCurrent(item.url)) {
              this.currentItem = item
            }
          })
        }
        return result
      },
      toggleCollapse (item) {
        this.$set(item, 'collapse', !item.collapse)
      },
      calcPaddingLeft (item) {
        let res = 20
        if (!this.isTopLevel) {
          if (!item.icon) {
            res += 14
          }
          // parent icon
          let allItems = this.isTopLevel ? this.localItems : this.all
          let parentItem = null
          item.indexes.forEach((e, i) => {
            // if (this.isPopover) console.log(e, i)
            parentItem = !parentItem ? allItems[e] : parentItem.children[e]
            if (parentItem.icon) {
              res += 18
            } else {
              res += 14
            }
          })
        }
        let isPopover = false
        let self = this
        while (true) {
          if (self.isPopover) {
            isPopover = true
            break
          } else {
            if (self.$parent) {
              self = self.$parent
            } else break
          }
        }
        if (isPopover) {
          res -= 46
        }
        return res + 'px'
      },
      isCurrent (url) {
        let href = location.href
        let pos = href.indexOf(url)
        if (pos !== -1) {
          let rest = href.slice(href.indexOf(url) + url.length)
          return rest.indexOf('/') === -1 ||
            (/^\/\?/g.test(rest) && rest.substring(2).indexOf('/') === -1) ||
            (/\/$/g.test(rest))
        }
        return false
      },
      toggle () {
        this.localCollapse = !this.localCollapse
      },
      hasChildren (item) {
        return !!(item.children && item.children.length)
      },
      handlePopSelect (item) {
        function hidePop (children) {
          children.forEach(child => {
            if (hasClass(child.$el, 'au-popover')) {
              child.hide()
            }
            if (child.$children && child.$children.length) {
              hidePop(child.$children)
            }
          })
        }
        hidePop(this.$root.$children)
        this.$emit('select', item)
      }
    }
  }
  // TODO: popover显示子集菜单，被注释部分代码为已经实现的部分代码
</script>
