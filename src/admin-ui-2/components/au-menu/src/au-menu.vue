<style lang="scss">
  @import '../../../style/vars';
  .color-bg-transition {
    transition-property: background-color, color;
    transition-duration: .15s;
    transition-timing-function: ease-in-out;
  }
  .au-menu {
    list-style: none;
    & > li {
      position: relative;
      // @extend .color-bg-transition;
    }
    & > li.active {
      // color: $primary;
    }
    & > li > .menu:hover {
      // color: $primary;
    }
    .menu {
      // @extend .color-bg-transition;
      position: relative;
      height: 40px;
      padding: 0 16px 0 0;
      line-height: 40px;
      font-size: $normal;
      cursor: pointer;
    }
    .menu-icon {
      position: relative;
      top: 1px;
      margin-right: 10px;
      font-size: 18px;
    }
    .menu-fold-icon {
      float: right;
      height: 100%;
      line-height: 40px;
      font-size: $large;
      transition: transform .2s ease-in-out;
      // color: $grayDarken25;
    }
    .next-level-container {
      padding-left: $normal + 24px;
    }
    .self-has-icon {
      padding-left: $normal + 29px;
    }
    .self-no-icon {
      padding-left: $normal;
    }
  }
  .au-menu.top-level {
    // background-color: #fff;
    & > .children-active:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      // background-color: $primary;
    }
    & > .children-active {
      // background-color: rgba($primary, .05);
    }
    & > li > .menu {
      padding-left: 24px;
    }
    & > li:not(.children-active) > .menu:hover {
      // background-color: rgba($primary, .05);
    }
    // & > li > .next-level-container {
    //   padding-left: 38px;
    // }
    & > li > .self-has-icon {
      padding-left: $normal + 54px;
    }
    & > li > .self-no-icon {
      padding-left: $normal + 24px;
    }
  }
</style>
<template>
  <ul class="
    au-menu
    au-theme-font-color--base-4" :class="isTopLevel ? 'top-level au-theme-background-color--base-12 ' : ''">
    <li
      v-for="(item, i) in localItems"
      :class="{
        'collapse': item.active,
        'children-active au-theme-background-color--primary-5': item.childrenActive,
        'active au-theme-font-color--primary-3': item.active
      }"
      :key="i">
      <div
        class="menu au-theme-hover-font-color--primary-3"
        :class="{'au-theme-hover-background-color--primary-5': !item.active}"
        @click="select(item)">
        <au-icon class="menu-icon" v-if="item.icon" :type="item.icon"></au-icon>
        <span class="menu-text">{{ item.text }}</span>
        <au-icon class="menu-fold-icon
          au-theme-font-color--base-4
          au-theme-hover-font-color--primary-3"
          type="angle-down"
          v-if="item.children && item.children.length" 
          :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`}"
          @click.native.stop="toggleCollapse(item)"></au-icon>
      </div>
      <au-collapse
        class="next-level-container"
        :class="item.icon ? 'self-has-icon' : 'self-no-icon'"
        :collapse="item.collapse"
        v-if="item.children && item.children.length">
        <au-menu
          :items="item.children"
          :is-top-level="false"
          :all="isTopLevel ? localItems : all"
          @admin-menu-select="item => { $emit('admin-menu-select', item) }"></au-menu>
      </au-collapse>
    </li>
  </ul>
</template>
<script>
  import AuIcon from '../../au-icon'
  import Collapse from '../../../directives/src/collapse'
  import { deepClone } from '../../../helpers/utils'
  
  export default {
    name: 'au-menu',
    components: { AuIcon },
    directives: {
      collapse: Collapse
    },
    data () {
      return {
        localItems: []
      }
    },
    props: {
      items: Array,
      all: Array,
      isTopLevel: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      if (this.isTopLevel) this.localItems = this.setIndex(this.items, [])
      else this.localItems = this.items
      this.setTopLevelChildrenActiveDecFromTop(true)
    },
    watch: {
      items: {
        deep: true,
        handler () {
          if (this.isTopLevel) this.localItems = this.setIndex(this.items, [])
          else this.localItems = this.items
          this.setTopLevelChildrenActiveDecFromTop()
        }
      }
    },
    methods: {
      select (item) {
        if (item.url) {
          this.deactivate(this.isTopLevel ? this.localItems : this.all)
          this.setTopLevelChildrenActiveDec(item)
          item.active = true
        }
        item.collapse = !item.collapse
        this.$emit('admin-menu-select', item)
      },
      deactivate (localItems) {
        localItems.forEach(item => {
          item.active = false
          if (item.children && item.children.length) {
            this.deactivate(item.children)
          }
        })
      },
      setIndex (items, parentIndex) {
        let result = []
        if (items instanceof Array && items.length) {
          result = deepClone(items)
          result.forEach((item, index) => {
            let res = [].concat(parentIndex)
            res.push(index)
            item.index = res
            item.childrenActive = false
            if (item.active) {
              item.childrenActive = true
            }
            item.children = this.setIndex(item.children, item.index)
          })
        }
        return result
      },
      setTopLevelChildrenActiveDec (item) {
        let allItems = this.isTopLevel ? this.localItems : this.all
        allItems.forEach(it => {
          it.childrenActive = false
        })
        allItems[item.index[0]].childrenActive = true
      },
      setTopLevelChildrenActiveDecFromTop (trigger) {
        let allItems = this.isTopLevel ? this.localItems : this.all
        function isActive (items, _this) {
          items.forEach(item => {
            if (item.active) {
              allItems[item.index[0]].childrenActive = true
              if (trigger && !allItems.firstTrigger) {
                allItems.firstTrigger = true
                _this.$emit('admin-menu-select', item)
              }
            } else {
              if (item.children && item.children.length) isActive(item.children, _this)
            }
          })
        }
        isActive(allItems, this)
      },
      toggleCollapse (item) {
        item.collapse = !item.collapse
      }
    }
  }
</script>
