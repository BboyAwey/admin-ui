<style lang="scss">
  @import '../../../style/vars';
  .au-menu {
    position: relative;
    min-width: 150px;
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
      transition: transform .2s ease-out;
    }
  }
  .au-menu.top-level {
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
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
  }
</style>
<template>
  <au-collapse :collapse="localCollapse" :horizontal="true" min="80px" max="300px">
    <ul
      class="au-menu au-theme-font-color--base-3"
      :class="{
        'top-level au-theme-background-color--base-12': isTopLevel,
        'collapse': localCollapse
      }">
      <li
        v-for="(item, i) in localItems"
        :class="{
          'active au-theme-font-color--primary-3 au-theme-background-color--primary-5 au-theme-before-background-color--primary-3': item.active,
          'au-theme-font-color--base-7': !item.url,
        }" :key="i">
        <div
          class="menu"
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
            v-if="item.children && item.children.length"
            v-show="!localCollapse"
            :style="{transform: `rotate(${item.collapse ? '-90' : '0'}deg)`}"
            @click.native.stop="toggleCollapse(item)"></au-icon>
        </div>
        <au-collapse
          class="next-level-container"
          :class="item.icon ? 'self-has-icon' : 'self-no-icon'"
          :collapse="item.collapse"
          v-show="!localCollapse"
          v-if="item.children && item.children.length">
          <au-menu
            :items="item.children"
            :is-top-level="false"
            :all="isTopLevel ? localItems : all"
            @select="item => { $emit('select', item) }"></au-menu>
        </au-collapse>
      </li>
      <li
        class="collapse-handle au-theme-border-color--base-8-important au-theme-font-color--base-3"
        @click="toggle"
        v-if="isTopLevel">
        <au-icon type="angle-double-right" class="collapse-handle-icon" :style="{
          transform: localCollapse ? '' : 'rotate(180deg)'
        }"></au-icon>
      </li>
    </ul>
  </au-collapse>
</template>
<script>
  import AuIcon from '../../au-icon'
  import AuCollapse from '../../au-collapse'
  import { deepClone } from '../../../helpers/utils'
  
  export default {
    name: 'au-menu',
    components: { AuIcon, AuCollapse },
    data () {
      return {
        localItems: [],
        localCollapse: this.collapse
      }
    },
    props: {
      items: Array,
      collapse: Boolean,

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
            if (item.children && item.children.length) {
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
      }
    }
    // TODO: toolbox
  }
</script>
