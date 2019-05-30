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
      padding: 0 16px;
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
    li:last-child {
      padding: 0 12px;
      font-size: $normal;
      line-height: 36px;
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
    right: 2px;
    top: 5px;
    display: none;
  }
  .au-tabs-rename-btn {
    left: 3px;
    top: 12px;
    display: none;
    font-size: $small
  }
</style>

<template>
  <div class="au-tabs">
    <div class="au-tabs-nav au-theme-border-color--base-10" v-show="tabs && tabs.length">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{
            'au-theme-hover-color--primary': true,
            'au-theme-color--base-8': tab.name !== localCurrent,
            'au-tabs-active au-theme-color--base-3 au-theme-border-color--primary': tab.name == localCurrent
          }"
          :name="['tab-'+tab.name]"
          @click="toggleTabs(tab.name, $event)">
          <a href="javascript:void(0);" :title="tab.text">{{ tab.text }}</a>
          <au-icon v-show="canRemove && tabs.length > 1" @click.native.stop="remove(index, tab)" class="au-tabs-btn au-tabs-delete-btn au-theme-color--base-3 au-theme-hover-color--danger" type="times"></au-icon>
          <au-icon v-show="canRename" @click.native.stop="rename(index, tab)" class="au-tabs-btn au-tabs-rename-btn au-theme-color--base-3 au-theme-hover-color--info" type="pencil"></au-icon>
        </li>
        <li v-show="canCreate" class="au-theme-color--base-8 au-theme-hover-color--primary" @click="create">
          <au-icon type="plus"></au-icon>
        </li>
      </ul>
      <!-- <au-button v-show="canCreate" type="success" @click="create" size="mini" class="au-tabs-btn au-tabs-create-btn">
        <au-icon class="au-theme-color--base-12" type="plus"></au-icon>
      </au-button> -->
    </div>
    <div class="au-tabs-container" v-show="tabs && tabs.length" ref="contents">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
import MessageBox from 'components/message-box'

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
    canRename: Boolean,
    canCreate: Boolean,
    creatingModal: {
      type: Boolean,
      default: true
    },
    removeMessage: String,
    renameMessage: String,
    renameValidators: {
      type: Array,
      default () { return [] }
    },
    createMessage: String,
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
        'message': vm.removeMessage || `确定要删除标签 “${tab.text}” 吗？`,
        confirm () {
          vm.$emit('remove', index, tab)
          vm.toggleContents()
        }
      })
    },
    create () {
      let vm = this
      if (this.creatingModal) {
        MessageBox.prompt({
          'message': vm.createMessage || `请输入新标签的名称:`,
          reset: true,
          confirm (v) {
            vm.$emit('create', v)
          },
          validators: vm.createValidators
        })
      } else {
        vm.$emit('create')
      }
    },
    rename (index, tab) {
      let vm = this
      MessageBox.prompt({
        'message': vm.renameMessage || `重命名标签 “${tab.text}” 为:`,
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
