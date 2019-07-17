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
    .menu-item {
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
      position: absolute;
      right: 12px;
      // float: right;
      // height: 40px;
      // width: 40px;
      text-align: center;
      line-height: 40px;
      font-size: $large;
      // color: $grayDarken25;
    }
    .active-dec {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      height: 100%;
      width: 4px;
      // background-color: $primary;
    }
    .collapse-handle-top,
    .collapse-handle-bottom {
      position: absolute;
      left: 0;
      width: 100%;
      height: 40px;
      padding: 0 22px;
      line-height: 40px;
      // border-bottom: 1px solid;
      text-align: right;
      font-size: $large;
      cursor: pointer;
    }
    .collapse-handle-top {
      top: 0;
      border-bottom: 1px solid;
    }
    .collapse-handle-bottom {
      bottom: 0;
      border-top: 1px solid;
    }
    .collapse-handle-icon {
      // transition: transform .2s ease-out;
    }
  }
  .au-menu.top-level {
    padding: 10px 0;
  }
  .au-menu.collapsable-top {
    padding-top: 40px;
  }
  .au-menu.collapsable-bottom {
    padding-bottom: 40px;
  }
  .au-menu.collapse {
    width: 60px !important;
    .menu-item {
      // height: 60px;
      padding: 0;
      // line-height: 60px;
      cursor: pointer;
    }
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
    font-size: $normal;
  }

  .au-menu-children-triangle,
  .au-menu-has-children-pop {
    border-width: 1px;
    border-style: solid;
  }
  .au-menu-popover-content {
    padding: 10px 0;
    max-height: 320px;
  }
</style>
<template>
  <div class="au-menu au-theme-color--base-3"
    :class="{
      [`top-level au-theme-background-color--${backgroundColor || 'base-12'}`]: isTopLevel,
      'collapsable-top': collapsable && isTopLevel && collapseHandlebarPosition !='bottom',
      'collapsable-bottom': collapsable && isTopLevel && collapseHandlebarPosition =='bottom',
      'collapse': localCollapse
    }" ref="self">
    <div
      class="collapse-handle-top"
      :class="{
        [`au-theme-border-color--${collapseHandlebarSepratorColor || 'base-9'}-important`]: true,
        [`au-theme-color--${itemFontColor || 'base-3'}`] : true,
        [`au-theme-hover-color--${itemHoverFontColor || 'primary'}`] : true
      }"
      @click="toggle"
      v-if="collapsable && isTopLevel && collapseHandlebarPosition != 'bottom'">
      <au-icon type="angle-double-right" class="collapse-handle-icon" :style="{
        transform: localCollapse ? '' : 'rotate(180deg)'
      }" unify-size/>
    </div>
    <au-scroller v-if="isTopLevel" style="height: 100%;">
      <ul>
        <li
          v-for="(item, i) in localItems"
          :key="i">
          <au-popover
            ref="popover"
            :disabled="!isTopLevel || !localCollapse || !hasChildren(item)"
            :trigger="'click'"
            :hide-on-blur="true"
            :placement="'right bottom'"
            :plain="true"
            @show="_ => handlePopoverHide(i)">
            <au-popover
              ref="tipPopover"
              slot="target"
              :disabled="!localCollapse"
              :trigger="'hover'"
              :placement="'right middle'">
              <div class="menu-item"
                slot="target"
                :class="{
                  [`au-theme-background-color--${itemBackgroundColor}`]: !!itemBackgroundColor && !isItemActive(item),
                  [`au-theme-color--${itemFontColor}`]: !!itemFontColor && !isItemActive(item) && item.url,
                  [`au-theme-hover-background-color--${itemHoverBackgroundColor || 'primary-bottom'}`]: !isItemActive(item),
                  [`au-theme-hover-color--${itemHoverFontColor || 'primary'}`]: !isItemActive(item) && item.url,
                  [`au-theme-color--${itemUnlinkTextColor || 'base-7'}`]: !item.url && !isItemActive(item) && !localCollapse,
                  [`au-theme-color--${itemActiveFontColor || 'primary'} au-theme-background-color--${itemActiveBackgroundColor || 'primary-bottom'}`]: isItemActive(item),
                }"
                :style="{
                  paddingLeft: calcPaddingLeft(item)
                }"
                @click="select(item, i)">
                <div
                  v-show="isItemActive(item)"
                  class="active-dec"
                  :class="`au-theme-background-color--${itemActiveFontColor || 'primary'}`"
                ></div>
                <au-icon class="menu-icon" v-if="item.icon" :type="item.icon" unify-size/>
                <span class="menu-text" :style="{ marginRight: hasChildren(item) ? '16px' : ''}">{{ item.text }}</span>
                <au-icon class="menu-fold-icon
                  au-theme-color--base-3
                  au-theme-hover-color--primary"
                  type="angle-down"
                  v-if="hasChildren(item)"
                  v-show="!localCollapse"
                  :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`, right: item.collapse ? '12px' : ''}"
                  @click.native.stop="toggleCollapse(item)"/>
              </div>
              <div slot="content" class="au-menu-pop-content">
                {{ item.text }}
              </div>
            </au-popover>
            <au-scroller v-if="hasChildren(item)" ref="scroller" slot="content" class="au-menu-popover-content au-theme-color--base-3">
              <au-menu
                :items="item.children"
                :collapsable="false"
                :is-popover="true"
                :is-top-level="false"
                :all="isTopLevel ? localItems : all"
                @select="handlePopSelect"
                :background-color="backgroundColor"
                :item-font-color="itemFontColor"
                :item-background-color="itemBackgroundColor"
                :item-unlink-font-color="itemUnlinkTextColor"
                :item-hover-font-color="itemHoverFontColor"
                :item-hover-background-color="itemHoverBackgroundColor"
                :item-active-font-color="itemActiveFontColor"
                :item-active-background-color="itemActiveBackgroundColor"
                :collapse-handlebar-seprator-color="collapseHandlebarSepratorColor"/>
            </au-scroller>
          </au-popover>
          <au-menu
            v-if="hasChildren(item)"
            v-show="!localCollapse && !item.collapse"
            :items="item.children"
            :is-top-level="false"
            :all="isTopLevel ? localItems : all"
            @select="handlePopSelect"
            :background-color="backgroundColor"
            :item-font-color="itemFontColor"
            :item-background-color="itemBackgroundColor"
            :item-unlink-font-color="itemUnlinkTextColor"
            :item-hover-font-color="itemHoverFontColor"
            :item-hover-background-color="itemHoverBackgroundColor"
            :item-active-font-color="itemActiveFontColor"
            :item-active-background-color="itemActiveBackgroundColor"
            :collapse-handlebar-seprator-color="collapseHandlebarSepratorColor"/>
        </li>
      </ul>
    </au-scroller>
    <ul v-if="!isTopLevel">
      <li
        v-for="(item, i) in localItems"
        :key="i">
        <div class="menu-item"
          slot="target"
          :class="{
            [`au-theme-background-color--${itemBackgroundColor}`]: !!itemBackgroundColor && !isItemActive(item),
            [`au-theme-color--${itemFontColor}`]: !!itemFontColor && !isItemActive(item) && item.url,
            [`au-theme-hover-background-color--${itemHoverBackgroundColor || 'primary-bottom'}`]: !isItemActive(item),
            [`au-theme-hover-color--${itemHoverFontColor || 'primary'}`]: !isItemActive(item) && item.url,
            [`au-theme-color--${itemUnlinkTextColor || 'base-7'}`]: !item.url && !isItemActive(item) && !localCollapse,
            [`au-theme-color--${itemActiveFontColor || 'primary'} au-theme-background-color--${itemActiveBackgroundColor || 'primary-bottom'}`]: isItemActive(item),
          }"
          :style="{
            paddingLeft: calcPaddingLeft(item)
          }"
          @click="select(item, i)">
          <div
            v-show="isItemActive(item)"
            class="active-dec"
            :class="`au-theme-background-color--${itemActiveFontColor || 'primary'}`"
          ></div>
          <au-icon class="menu-icon" v-if="item.icon" :type="item.icon" unify-size/>
          <span class="menu-text" :style="{ marginRight: hasChildren(item) ? '16px' : ''}">{{ item.text }}</span>
          <au-icon class="menu-fold-icon
            au-theme-color--base-3
            au-theme-hover-color--primary"
            type="angle-down"
            v-if="hasChildren(item)"
            v-show="!localCollapse"
            :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`, right: item.collapse ? '12px' : ''}"
            @click.native.stop="toggleCollapse(item)"/>
        </div>
        <au-menu
          v-if="hasChildren(item)"
          v-show="!localCollapse && !item.collapse"
          :items="item.children"
          :is-top-level="false"
          :all="isTopLevel ? localItems : all"
          @select="handlePopSelect"
          :background-color="backgroundColor"
          :item-font-color="itemFontColor"
          :item-background-color="itemBackgroundColor"
          :item-unlink-font-color="itemUnlinkTextColor"
          :item-hover-font-color="itemHoverFontColor"
          :item-hover-background-color="itemHoverBackgroundColor"
          :item-active-font-color="itemActiveFontColor"
          :item-active-background-color="itemActiveBackgroundColor"
          :collapse-handlebar-seprator-color="collapseHandlebarSepratorColor"/>
      </li>
    </ul>
    <div
      class="collapse-handle-bottom"
      :class="{
        [`au-theme-border-color--${collapseHandlebarSepratorColor || 'base-10'}-important`]: true,
        [`au-theme-color--${itemFontColor || 'base-3'}`] : true,
        [`au-theme-hover-color--${itemHoverFontColor || 'primary'}`] : true
      }"
      @click="toggle"
      v-if="collapsable && isTopLevel && collapseHandlebarPosition === 'bottom'">
      <au-icon type="angle-double-right" class="collapse-handle-icon" :style="{
        transform: localCollapse ? '' : 'rotate(180deg)'
      }" unify-size/>
    </div>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
import AuPopover from 'components/popover'
import AuScroller from 'components/scroller'
import { isEmptyString } from 'helpers/utils'

function plainObjectEqual (o1, o2) {
  return JSON.stringify(o1) === JSON.stringify(o2)
}

export default {
  name: 'au-menu',
  components: { AuIcon, AuScroller, AuPopover },
  data () {
    return {
      localItems: [],
      localCollapse: this.collapse,
      currentItem: {},
      originWidth: '',
      scrollTop: 0,
      urlMap: {}
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
    isPopover: Boolean,
    collapseHandlebarPosition: {
      type: String,
      default: 'top'
    },
    reactivateOnHashchange: {
      type: Boolean,
      default: true
    },
    backgroundColor: String,
    itemFontColor: String,
    itemUnlinkTextColor: String,
    itemBackgroundColor: String,
    itemHoverFontColor: String,
    itemHoverBackgroundColor: String,
    itemActiveFontColor: String,
    itemActiveBackgroundColor: String,
    collapseHandlebarSepratorColor: String
  },
  mounted () {
    if (this.isTopLevel) {
      this.localItems = this.setInfo(this.items)
      this.activate(this.currentItem)
      if (!this.$route) window.addEventListener('hashchange', this.handleHashchange)
    } else this.localItems = this.items
  },
  beforeDestroy () {
    if (this.isTopLevel && !this.$route) window.removeEventListener('hashchange', this.handleHashchange)
  },
  watch: {
    items: {
      deep: true,
      handler (v, o) {
        if (plainObjectEqual(this.localItems, this.items)) return
        if (this.isTopLevel) {
          this.localItems = this.setInfo(this.items)
          this.activate(this.currentItem)
        } else {
          this.localItems = this.items
        }
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
    },
    $route (v) {
      if (this.isTopLevel) {
        this.handleHashchange()
      }
    }
  },
  methods: {
    select (item, i) {
      this.currentItem = item
      this.activate()
      this.toggleCollapse(item)
      if (i !== undefined && this.localCollapse && item.children && item.children.length) this.$refs.tipPopover[i].hide()
      if (i !== undefined) this.$emit('select', item)
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
    reactivate (url) {
      if (url === this.currentItem.url) return
      if (url && this.urlMap[url]) {
        this.select(this.urlMap[url])
      }
    },
    handleHashchange (e) {
      if (this.reactivateOnHashchange) {
        this.localItems = this.setInfo(this.items)
        this.activate(this.currentItem)
      }
    },
    isItemActive (item) {
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
        result = items
        result.forEach((item, i) => {
          let res = [].concat(parentIndex)
          res.push(i)
          item.indexes = res
          if (item.url) this.urlMap[item.url] = item
          item.children = this.setInfo(item.children, item.indexes)

          if (this.isCurrent(item)) {
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
    isCurrent (item) {
      let { url, isRouteName } = item
      if (isRouteName) {
        if (this.$route.matched.length) {
          return this.$route.matched.find(r => r.name === url + '')
        } else {
          let pathName = this.$route ? this.$route.name : ''
          if (!pathName) return false
          return pathName === item.url + ''
        }
      } else {
        let href = location.href
        let pos = href.indexOf(url)
        if (pos !== -1) {
          let rest = href.slice(pos + url.length).trim()
          return !rest || /^[/#?]/.test(rest) || isEmptyString(rest)
        }
        return false
      }
    },
    toggle () {
      this.localCollapse = !this.localCollapse
    },
    hasChildren (item) {
      return !!(item.children && item.children.length)
    },
    handlePopSelect (item) {
      // hide children container popover
      if (this.isCurrent(item)) return
      if (this.$refs.popover) {
        this.$refs.popover.forEach(p => p.hide())
      }
      this.$emit('select', item)
    },
    handlePopoverHide (i) {
      if (this.$refs.scroller && this.$refs.scroller.length) {
        for (let s of this.$refs.scroller) {
          s.scrollTo({ scrollTop: 0 })
        }
      }
    },
    isColorNum (color) {
      return /^#/.test(color)
    }
  }
}
</script>
