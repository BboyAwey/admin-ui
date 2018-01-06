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
          <au-icon v-show="canRemove && tabs.length > 1" @click.native.stop="remove(index, tab)" class="au-tabs-btn au-tabs-delete-btn au-theme-font-color--base-3 au-theme-hover-font-color--danger-3" type="times"></au-icon>
          <au-icon v-show="canRename" @click.native.stop="rename(index, tab)" class="au-tabs-btn au-tabs-rename-btn au-theme-font-color--base-3 au-theme-hover-font-color--info-3" type="pencil"></au-icon>
        </li>
      </ul>
      <au-button v-show="canCreate" type="success" @click="create" size="mini" class="au-tabs-btn au-tabs-create-btn">
        <au-icon class="au-theme-font-color--base-12" type="plus"></au-icon>
      </au-button>
    </div>
    <div class="au-tabs-container" v-show="tabs && tabs.length" ref="contents">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import AuIcon from '../../icon'
  import AuButton from '../../button'
  import MessageBox from '../../message-box'

  export default {
    name: 'au-tabs',
    components: { AuIcon, AuButton },
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
      canRename: Boolean,
      canCreate: Boolean,
      removeMessage: {
        type: String,
        default: '确定要删除吗？'
      },
      renameMessage: {
        type: String,
        default: '请输入新名称：'
      },
      renameValidators: {
        type: Array,
        default () { return [] }
      },
      createMessage: {
        type: String,
        default: '请输入新名称：'
      },
      createValidators: {
        type: Array,
        default () { return [] }
      }
    },
    watch: {
      current (v) {
        if (this.localCurrent !== v) {
          this.localCurrent = v
          this.toggleTabs(v)
        }
      }
    },
    mounted () {
      if (this.localCurrent) this.toggleContents()
    },
    methods: {
      toggleTabs (name, e) {
        if (e && e.target.parentNode.className === 'au-tabs-active') return false
        this.localCurrent = name
        this.$emit('toggle', name, e)
        this.$nextTick(() => this.toggleContents(name))
      },
      toggleContents () {
        let name = this.localCurrent
        let _cons = this.$el.querySelectorAll('.au-tabs-container>*')
        let _activeEl = this.$el.querySelectorAll(`.au-tabs-container>*[name="${name}"]`)
        let cons = []
        let activeEl = null
        for (let con of _cons) {
          if (con.parentNode === this.$refs.contents) cons.push(con)
        }
        for (let el of _activeEl) {
          if (el.parentNode === this.$refs.contents) {
            activeEl = el
            break
          }
        }
        if (activeEl) {
          for (var i = 0, len = cons.length; i < len; i++) {
            cons[i].style.display = 'none'
          }
          activeEl.style.display = 'block'
        }
      },
      remove (index, tab) {
        let vm = this
        MessageBox.confirm({
          'message': vm.removeMessage,
          confirm () {
            vm.$emit('remove', index, tab)
            vm.toggleContents()
          }
        })
      },
      create () {
        let vm = this
        MessageBox.prompt({
          'message': vm.createMessage,
          reset: true,
          confirm (v) {
            vm.$emit('create', v)
          },
          validators: vm.createValidators
        })
      },
      rename (index, tab) {
        let vm = this
        MessageBox.prompt({
          'message': vm.renameMessage,
          reset: tab.text,
          confirm (v) {
            vm.$emit('rename', v, index, tab)
          },
          validators: vm.renameValidators
        })
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
    li:hover > .au-tabs-delete-btn,
    li:hover > .au-tabs-rename-btn {
      display: inline-block;
    }
  }
  li.au-tabs-active {
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }
  .au-tabs-container {
    display: block;
    & > * {
      display: none;
    }
    & > *:first-child {
      display: block;
    }
  }
  button.au-tabs-btn {
    position: absolute;
  }
  .au-tabs-btn {
    position: absolute;
    font-size: $normal;
    cursor: pointer;
  }
  .au-tabs-create-btn {
    right: 19px;
    bottom: 6px;
  }
  .au-tabs-delete-btn {
    right: 10px;
    top: 5px;
    display: none;
  }
  .au-tabs-rename-btn {
    left: 10px;
    top: 12px;
    display: none;
    font-size: $small
  }
</style>
