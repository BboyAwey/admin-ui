<style lang="scss">
  @import '../../../style/vars';
  .au-menu {
    list-style: none;
    & > li {
      position: relative;
    }
    .menu {
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
        'active au-theme-font-color--primary-3 au-theme-background-color--primary-5 au-theme-before-background-color--primary-3': item.active,
        'au-theme-font-color--base-8': !item.url,
      }"
      :key="i">
      <div
        class="menu au-theme-hover-background-color--primary-5"
        :class="{
          'au-theme-hover-font-color--primary-3': !item.active && item.url
        }"
        :style="{ paddingLeft: calcPaddingLeft(item)  }"
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
          @select="item => { $emit('select', item) }"></au-menu>
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
      }
    },
    methods: {
      select (item) {
        if (item.url) {
          this.deactivate(this.isTopLevel ? this.localItems : this.all)
          item.active = true
        }
        item.collapse = !item.collapse
        this.$emit('select', item)
      },
      deactivate (localItems) {
        localItems.forEach(item => {
          item.active = false
          if (item.children && item.children.length) {
            this.deactivate(item.children)
          }
        })
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

            if (item.url && this.isCurrent(item.url)) {
              item.active = true
            }
          })
        }
        return result
      },
      toggleCollapse (item) {
        item.collapse = !item.collapse
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
      }
    }
  }
</script>
