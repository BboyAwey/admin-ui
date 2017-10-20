<style lang="scss">
  @import '../../../style/vars';
  .au-menu {
    position: relative;
    min-width: 150px;
    // padding-top: 10px;
    list-style: none;
    & > li {
      position: relative;
      transition-property: height, padding, line-height;
      transition-duration: .2s;
      transition-timing-function: ease-out;
    }
    .menu {
      position: relative;
      height: 40px;
      padding: 0 16px 0 0;
      line-height: 40px;
      font-size: $normal;
      cursor: pointer;
      transition-property: height, padding, line-height;
      transition-duration: .2s;
      transition-timing-function: ease-out;
    }
    .menu-text {
      display: inline-block;
      // transition: all .2s ease-in-out;
    }
    .menu-icon {
      position: relative;
      top: 1px;
      margin-right: 10px;
      font-size: 18px;
      transition-property: top, margin-right, font-size;
      transition-duration: .2s;
      transition-timing-function: ease-out;
    }
    .menu-fold-icon {
      float: right;
      height: 100%;
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
      padding: 0 10px;
      line-height: 40px;
      border-bottom: 1px solid;
      text-align: right;
      font-size: $huge;
      cursor: pointer;
    }
    .collapse-handle-icon {
      // transition: transform .2s ease-out;
    }
  }
  .au-menu.top-level {
    padding-top: 10px;
  }
  .au-menu.collapsable {
    padding-top: 40px;
  }
  .au-menu.collapse {
    min-width: auto;
    .menu {
      height: 60px;
      padding: 0;
      line-height: 60px;
      cursor: pointer;
    }
    & > li {
      height: 60px;
      line-height: 60px;
    }
    .menu-icon {
      top: 4px;
      left: 10px;
      margin-right: 10px;
      font-size: $huge;
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
  // .au-menu-has-children-triangle,
  // .au-menu-has-children-pop {
  //   border-width: 1px;
  //   border-style: solid;
  // }
  .au-menu-children-popup {
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 1;
    border: 1px solid red;
  }
</style>
<template>
  <div>
    <au-collapse :collapse="localCollapse" :horizontal="true" min="80px" :max="!isPopover ? '250px' : ''">
      <ul
        class="au-menu au-theme-font-color--base-3"
        :class="{
          'top-level au-theme-background-color--base-12': isTopLevel,
          'collapsable': collapsable && isTopLevel,
          'collapse': localCollapse
        }"
        v-if="localItems.length">
        <!-- <li
          v-for="(item, i) in localItems"
          @mouseenter="popupChildren(item.children, $event)" -->
        <li
          v-for="(item, i) in localItems"
          :class="{
            'active au-theme-font-color--primary-3 au-theme-background-color--primary-5 au-theme-before-background-color--primary-3': item.active,
            'au-theme-font-color--base-7': !item.url,
          }"
          :key="i">
          <!-- <au-popover
            :plain="hasChildren(item)"
            :placement="hasChildren(item) ? 'right top' : 'right middle'" -->
          <au-popover
            :disabled="!localCollapse"
            placement="right middle"
            :fix="hasChildren(item) ? 0 : '-2px'">
            <div class="menu"
              slot="target"
              :class="{
                'au-theme-hover-background-color--base-10' : !item.active,
                'au-theme-hover-font-color--primary-3': !item.active && item.url
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
                :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`}"
                @click.native.stop="toggleCollapse(item)"></au-icon>
            </div>
            <div slot="content" class="au-menu-pop-content">
              {{ item.text }}
            </div>
            <!-- <div v-if="!item.children || !item.children.length" slot="content" class="au-menu-pop-content">
              {{ item.text }}
            </div> -->
            <!-- <div v-if="hasChildren(item)" slot="content" class="au-theme-font-color--base-3">
              <au-menu :items="item.children" :collapsable="false" :isPopover="true"></au-menu>
            </div> -->
          </au-popover>
          <au-collapse
            class="next-level-container"
            :class="item.icon ? 'self-has-icon' : 'self-no-icon'"
            :collapse="item.collapse"
            v-show="!localCollapse"
            v-if="hasChildren(item)">
            <au-menu
              :items="item.children"
              :is-top-level="false"
              :all="isTopLevel ? localItems : all"
              @select="item => { $emit('select', item) }"></au-menu>
          </au-collapse>
          <!-- <div class="au-menu-children-popup" v-show="item.childrenPopup">
            <au-menu :items="item.children" :collapsable="false"></au-menu>
          </div> -->
        </li>
        <li
          class="collapse-handle au-theme-border-color--base-8-important au-theme-font-color--base-3"
          @click="toggle"
          v-if="collapsable && isTopLevel">
          <au-icon type="angle-double-right" class="collapse-handle-icon" :style="{
            transform: localCollapse ? '' : 'rotate(180deg)'
          }"></au-icon>
        </li>
      </ul>
    </au-collapse>
    <!-- <div ref="childrenPop" class="au-menu-children-popup" v-show="currPopupChildren.length">
      <au-menu v-if="currPopupChildren.length" :items="currPopupChildren" :collapsable="false"></au-menu>
    </div> -->
  </div>
</template>
<script>
  import Icon from '../../icon'
  import Popover from '../../popover'
  import Collapse from '../../collapse'
  import { deepClone } from '../../../helpers/utils'
  // import { getElementSize, getElementPagePos } from '../../../helpers/dom'

  export default {
    name: 'au-menu',
    components: { Icon, Collapse, Popover },
    data () {
      return {
        localItems: [],
        localCollapse: this.collapse,
        currPopupChildren: []
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
      if (this.isTopLevel) this.localItems = this.setInfo(this.items, [])
      else this.localItems = this.items
    },
    watch: {
      items: {
        deep: true,
        handler () {
          if (this.isTopLevel) this.localItems = this.setInfo(this.items, [])
          else this.localItems = this.items
        }
      },
      collapse (v) {
        this.localCollapse = v
      },
      localCollapse (v) {
        this.$emit('collapse', v)
      }
    },
    methods: {
      select (item) {
        if (item.url) {
          this.deactivate(this.isTopLevel ? this.localItems : this.all)
          this.$set(item, 'active', true)
        }
        item.collapse = !item.collapse
        this.$emit('select', item)
      },
      deactivate (allItems) {
        let deactive = (items) => {
          items.forEach(item => {
            this.$set(item, 'active', false)
            if (this.hasChildren(item)) {
              deactive(item.children)
            }
          })
        }
        deactive(allItems)
      },
      setInfo (items, parentIndex) {
        let result = []
        if (items instanceof Array && items.length) {
          result = deepClone(items)
          result.forEach((item, indexes) => {
            let res = [].concat(parentIndex)
            res.push(indexes)
            item.indexes = res
            item.children = this.setInfo(item.children, item.indexes)
            item.childrenPopup = false

            if (item.url && this.isCurrent(item.url)) {
              item.active = true
            }
          })
        }
        return result
      },
      toggleCollapse (item) {
        this.$set(item, 'collapse', !item.collapse)
      },
      calcPaddingLeft (item) {
        return (20 + 32 * (item.indexes.length - 1) + (item.icon ? 0 : 14)) + 'px'
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
      }
      // popupChildren (items, e) {
      //   let targetSize = getElementSize(e.target)
      //   let targetPos = getElementPagePos(e.target)
      //   console.log(targetSize, targetPos)
      //   this.currPopupChildren = items
      //   document.body.appendChild(this.$refs.childrenPop)
      //   this.$refs.childrenPop.style.top = targetSize.width + targetPos.left + 10 + 'px'
      //   this.$refs.childrenPop.style.left = targetSize.height + 'px'
      // },
      // popdownChildren () {
      //   this.currPopupChildren = []
      // }
    }
  }
  // TODO: popover显示子集菜单，被注释部分代码为已经实现的部分代码
</script>
