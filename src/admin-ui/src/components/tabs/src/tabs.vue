<template>
  <div class="au-tabs">
    <div class="au-tabs-nav au-theme-border-color--base-8" v-show="tabs && tabs.length">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{
            'au-theme-font-color--base-7': tab.name !== localCurrent,
            'au-tabs-active au-theme-font-color--base-3 au-theme-border-color--primary-3': tab.name == localCurrent
          }"
          :name="['tab-'+tab.name]"
          @click="toggleTabs(tab.name, $event)">
          <a href="javascript:void(0);" :title="tab.text">{{ tab.text }}</a>
          <au-icon v-show="canRemove" @click.native.stop="$emit('remove', index, tab)" class="au-tabs-delete-btn au-theme-font-color--danger-3" type="times"></au-icon>
        </li>
      </ul>
      <au-icon v-show="canCreate" @click.native.stop="$emit('create')" class="au-tabs-create-btn au-theme-font-color--success-3" type="plus"></au-icon>
    </div>
    <div  class="au-tabs-container" v-show="tabs && tabs.length">
      <slot class="au-tabs-content"></slot>
    </div>
  </div>
</template>
<script>
  import AuIcon from '../../icon'

  export default {
    name: 'au-tabs',
    components: { AuIcon },
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
      current: [String, Number],
      canRemove: Boolean,
      canCreate: Boolean
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
  .au-tabs {
    // position: relative;
    // padding-top: 36px;
    // width: 100%;
    // height: 100%;
    // display: block;
  }
  .au-tabs-nav {
    position: relative;
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
      position: relative;
      float: left;
      height: 35px;
      line-height: 35px;
      text-align: center;
      padding: 0 24px;
      cursor: pointer;
      // min-width: 88px;
      overflow: hidden;
      max-width: 156px;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        text-decoration: none;
        font-size: $normal;
      }
    }
    li:hover > .au-tabs-delete-btn {
      display: inline-block;
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
  .au-tabs-create-btn {
    position: absolute;
    right: 15px;
    bottom: 8px;
    cursor: pointer;
    font-size: $normal;
  }
  .au-tabs-delete-btn {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: $normal;
    display: none;
  }
</style>
