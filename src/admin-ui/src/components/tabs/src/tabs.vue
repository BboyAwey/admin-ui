<template>
  <div class="au-tabs-wrapper">
    <div class="au-tabs-nav au-theme-border-color--base-8" v-show="tabs && tabs.length">
      <ul>
        <li
          v-for="(entry, index) in tabs"
          :key="index"
          :class="{
            'au-theme-font-color--base-7': entry.name !== localCurrent,
            'au-tabs-active au-theme-font-color--base-3 au-theme-border-color--primary-3': entry.name == localCurrent
          }"
          :name="['tab-'+entry.name]"
          @click="toggleTabs(entry.name, $event)">
          <a href="javascript:void(0);" :title="entry.text">{{entry.text}}</a>
        </li>
      </ul>
    </div>
    <div  class="au-tabs-container" v-show="tabs && tabs.length">
      <slot class="au-tabs-content"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'au-tabs',
    data () {
      return {
        localCurrent: this.current
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
        if (this.localCurrent !== this.current) {
          this.localCurrent = this.current
          this.toggleTabs(this.current)
        }
      }
    },
    methods: {
      toggleTabs (name, e) {
        if (e && e.target.parentNode.className === 'au-tabs-active') return false
        this.localCurrent = name
        this.$emit('toggle', name, e)
        var cons = this.$el.querySelectorAll('.au-tabs-container>*')
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
      var els = this.$el.querySelectorAll('.au-tabs-container > *')
      for (var i = 0, len = els.length; i < len; i++) {
        els[i].classList.add('au-tabs-content')
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../style/vars';
  .au-tabs-wrapper {
    position: relative;
    padding-top: 36px;
    width: 100%;
    height: 100%;
    display: block;
  }
  .au-tabs-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 40px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
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
      height: 35px;
      line-height: 35px;
      text-align: center;
      padding: 0 24px;
      cursor: pointer;
      min-width: 88px;
      overflow: hidden;
      max-width: 156px;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        text-decoration: none;
        font-size: $normal;
      }
    }
  }
  li.au-tabs-active {
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }
  .au-tabs-container {
    display: block;
    .au-tabs-content {
      display: none;
    }
    .au-tabs-content:first-child {
      display: block;
    }
  }
</style>
