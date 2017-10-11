<template>
  <div class="admin-tabs-wrapper">
    <div class="admin-tabs-nav" v-show="tabs && tabs.length">
      <ul>
        <li
          v-for="(entry, index) in tabs"
          :class="entry.name==activeTabName?'admin-tabs-active':''"
          :name="['tab-'+entry.name]"
          @click="toggleTabs(entry.name, $event)">
          <a href="javascript:void(0);" :title="entry.text">{{entry.text}}</a>
        </li>
      </ul>
    </div>
    <div  class="admin-tabs-container" v-show="tabs && tabs.length">
      <slot class="admin-tabs-content"></slot>
    </div>
  </div>
</template>
<script>
  // Author: Bearhotel
  // email: lilijing@rongcapital.cn
  // github:
  // blog:

  // Modifier: joeliiu
  // email: liuzhao@rongcapital.cn
  // github:https://github.com/joeliu926
  // blog:

  // Modifier: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // last Modifier: lianghao
  // email: lianghao@rongcapital.cn
  export default {
    name: 'au-tabs',
    data () {
      return {
        activeTabName: this.current
      }
    },
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      current: [String, Number]
    },
    watch: {
      current (v) {
        if (this.activeTabName !== this.current) {
          this.activeTabName = this.current
          this.toggleTabs(this.current)
        }
      }
    },
    methods: {
      toggleTabs (name, e) {
        if (e && e.target.parentNode.className === 'admin-tabs-active') return false
        this.activeTabName = name
        this.$emit('admin-tabs-toggle', name, e)
        var cons = this.$el.querySelectorAll('.admin-tabs-container>*')
        var activeEl = this.$el.querySelectorAll(`* [name="${name}"]`)
        if (activeEl && activeEl.length) {
          for (var i = 0, len = cons.length; i < len; i++) {
            cons[i].style.display = 'none'
          }
          activeEl[0].style.display = 'block'
        }
      }
    },
    mounted () {
      var els = this.$el.querySelectorAll('.admin-tabs-container > *')
      for (var i = 0, len = els.length; i < len; i++) {
        els[i].classList.add('admin-tabs-content')
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../style/vars';
  .admin-tabs-wrapper {
    position: relative;
    padding-top: 36px;
    width: 100%;
    height: 100%;
    display: block;
  }
  .admin-tabs-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 40px;
    border-bottom: 1px solid;
    & > ul {
      position: relative;
      top: 1px;
    }
    & > ul:after {
      content: '';
      display: block;
      clear: both;
    }
    li {
      float: left;
      height: 34px;
      line-height: 34px;
      text-align: center;
      padding: 0 24px;
      cursor: pointer;
      min-width: 88px;
      overflow: hidden;
      max-width: 156px;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {

        font-size: $normal;
      }
    }
    li:not(.admin-tabs-active):hover {
      a {

      }
    }
  }
  li.admin-tabs-active {

    height: 35px;
    a {

    }
  }
  .admin-tabs-container {
    display: block;
    .admin-tabs-content {
      display: none;
    }
    .admin-tabs-content:first-child {
      display: block;
    }
  }
</style>
