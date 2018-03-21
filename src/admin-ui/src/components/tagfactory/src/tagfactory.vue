<style lang="scss">
@import '../../../style/_vars.scss';
.au-tagfactory-body {
  position: relative;
  display: inline-block;
}
.au-tagfactory-core {
  position: relative;
  display: inline-block;
  min-width: 40px;
  width: 100%;
  padding: 5px;
  padding-bottom: 0;
  border-width: 1px;
  border-style: solid;
  font-size: 0;
}
.au-tagfactory-item {
  margin-right: 5px;
  margin-bottom: 5px;
  vertical-align: middle;
}
.au-tagfactory-input-container {
  display: inline-block;
  margin-bottom: 5px;
  font-family: $fontFamily;
  font-size: $normal;
  white-space: nowrap;
  vertical-align: middle;
  .au-tagfactory-input-core {
    width: 2px;
    outline: none;
    border: none;
    vertical-align: middle;
  }
}
.au-tagfactory-placeholder {
  position: absolute;
  font-size: $normal;
  z-index: 0;
}
.au-tagfactory-associations-container {
  position: absolute;
  margin-top: 4px;
  left: 0;
  z-index: 1;
  min-width: 100%;
  max-height: 237px;
  border-width: 1px;
  border-style: solid;
  font-size: $normal;
  li {
    display: block;
    height: 28px;
    padding: 0 8px;
    margin: 4px 0;
    line-height: 28px;
    font-size: $normal;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="au-tagfactory au-theme-font-color--base-3" :style="{display: fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="inline"
      :warnings="warnings || localWarnings">
      <div
        class="au-tagfactory-body"
        ref="body">
        <au-scroller
          class="au-tagfactory-core au-theme-border-radius--normal"
          :class="{
            'au-theme-background-color--base-12': !disabled,
            'au-theme-background-color--base-9': disabled,
            'au-theme-border-color--base-8': disabled || (!hasWarnings && !active),
            'au-theme-border-color--primary-3': !disabled && !hasWarnings && active,
            'au-theme-border-color--danger-3': hasWarnings,
            'au-theme-box-shadow--primary': !disabled && active && !hasWarnings,
            'au-theme-box-shadow--danger': !disabled && active && hasWarnings
          }"
          :style="{
            cursor: disabled ? 'not-allowed' : '',
            width, maxWidth, minWidth, minHeight, maxHeight
          }"
          @click.native.stop="handleClick">
          <div
            class="au-tagfactory-placeholder au-theme-font-color--base-7"
            v-show="!localTags.length && !inputValue.length">
            {{ placeholder }}
          </div>
          <au-tag
            class="au-tagfactory-item"
            v-for="(tag, i) in localTags"
            type="primary"
            :key="i"
            :closable="!disabled && canRemove"
            @close="handleTagClose(i, $event)"
            :hoverable="!disabled"
            :size="tagSize"
            :active="false">
            {{ tag }}
          </au-tag>
          <div class="au-tagfactory-input-container">
            {{ inputValue }}
            <input
              class="au-tagfactory-input-core"
              type="text"
              ref="input"
              @input="handleCoreChange"
              @keydown.delete="handleCoreDeleteDown"
              @keyup.delete="handleCoreDeleteUp"
              @keypress.enter="handleCoreEnter"
              @keyup.up="handleDirectionUpPress"
              @keyup.down="handleDirectionDownPress"
              @focus="handleCoreFocus"
              @blur="handleCoreBlur">
          </div>
        </au-scroller>
        <au-scroller class="
          au-tagfactory-associations-container
          au-theme-border-color--base-8
          au-theme-background-color--base-12"
          v-show="associationsShow && localAssociations.length">
          <ul
            class="au-tagfactory-associations">
            <li
              class="au-theme-hover-background-color--base-10 au-theme-font-color--primary-3"
              v-show="canCreate && inputValue && associations.indexOf(inputValue) === -1"
              @click="handleAssociationClick(inputValue)"> {{ inputValue }} </li>
            <li
              class="au-theme-hover-background-color--base-10"
              v-for="(association, i) in localAssociations"
              :key="i"
              :class="{
                'au-theme-background-color--base-10': activeAssociationIndex === i + 1
              }"
              @click="handleAssociationClick(association)">
              {{ association }}
            </li>
          </ul>
        </au-scroller>
      </div>
    </form-item>
  </div>
</template>
<script>
import ValidatorMixin from '../../../helpers/validator-mixin'
import FormApiMixin from '../../../helpers/form-api-mixin'
import AuTag from '../../tag'
import AuPopover from '../../popover'
import AuScroller from '../../scroller'
import FormItem from '../../../helpers/form-item.vue'
import { isAncestor } from '../../../helpers/dom'

export default {
  name: 'au-tagfactory',
  components: { AuTag, AuPopover, AuScroller, FormItem },
  mixins: [ValidatorMixin, FormApiMixin],
  model: {
    prop: 'tags',
    event: 'change'
  },
  props: {
    tags: {
      type: Array,
      default () { return [] }
    },
    tagSize: {
      type: String,
      default: 'mini'
    },
    associations: {
      type: Array,
      default () { return [] }
    },
    tagMatcher: {
      type: Function,
      default () { return () => true }
    },
    canRemove: {
      type: Boolean,
      default: true
    },
    canCreate: {
      type: Boolean,
      default: true
    },
    repeat: Boolean,

    fullWidth: Boolean,
    width: String,
    maxWidth: String,
    minWidth: String,
    minHeight: String,
    maxHeight: String,
    placeholder: {
      type: String,
      default: '请填写标签'
    },
    warnings: Array,
    warning: Boolean
  },
  data () {
    return {
      localTags: this.tags,
      lengthWhenDown: 0,
      isSeriesDown: 0,
      inputValue: '',
      associationsShow: false,
      activeAssociationIndex: 0,
      active: false
    }
  },
  computed: {
    localAssociations () {
      return this.associations.filter(a => a.indexOf(this.inputValue) !== -1)
    }
  },
  watch: {
    tags: {
      deep: true,
      handler (v) {
        for (let i = 0; i < v.length; i++) {
          if (v[i] !== this.localTags[i]) {
            this.localTags = v
            break
          }
        }
      }
    },
    localTags: {
      deep: true,
      handler (v) {
        for (let i = 0; i < v.length; i++) {
          if (v[i] !== this.tags[i]) {
            this.$emit('change', v)
            break
          }
        }
      }
    },
    localAssociations: {
      deep: true,
      handler (v, ov) {
        let oldAss = ov[this.activeAssociationIndex - 1]
        if (oldAss) {
          let newIndex = v.indexOf(oldAss)
          if (newIndex !== -1) {
            this.activeAssociationIndex = newIndex + 1
          } else {
            this.activeAssociationIndex = 1
          }
        } else {
          this.activeAssociationIndex = 0
        }
      }
    },
    inputValue (v) {
      this.$emit('input-change', v)
    }
  },
  methods: {
    throughMatcher (value) {
      return new Promise((resolve, reject) => {
        if (typeof this.tagMatcher === 'function') {
          let res = this.tagMatcher(value)
          if (res instanceof Promise) {
            res.then(r => resolve(r))
          } else {
            resolve(!!res)
          }
        } else {
          resolve(true)
        }
      })
    },
    setTag (value) {
      if (!this.repeat && this.localTags.indexOf(value) !== -1) return
      this.localTags.push(value)
      this.inputValue = ''
    },
    handleClick () {
      console.log('click')
      if (!this.disabled) this.$refs.input.focus()
    },
    handleCoreChange (e) {
      if (e.target.value.length) {
        this.inputValue += e.target.value
        e.target.value = ''
      }
    },
    handleCoreDeleteDown (e) {
      this.lengthWhenDown = this.inputValue.length
      this.isSeriesDown++
      if (this.inputValue.length) {
        this.inputValue = this.inputValue.substring(0, this.inputValue.length - 1)
      }
    },
    handleCoreDeleteUp (e) {
      this.isSeriesDown--
      if (!this.isSeriesDown) {
        if (!this.lengthWhenDown) this.localTags.pop()
      } else {
        this.isSeriesDown = 0
      }
    },
    handleCoreEnter (e) {
      if (this.activeAssociationIndex) {
        let activeAssociation = this.localAssociations[this.activeAssociationIndex - 1]
        this.throughMatcher(activeAssociation).then(res => {
          if (res) this.setTag(activeAssociation)
          else this.inputValue = activeAssociation
        })
      } else if (this.inputValue.length) {
        this.throughMatcher(this.inputValue).then(res => {
          if (!res) return
          this.setTag(this.inputValue)
        })
      }
    },
    handleDirectionUpPress (e) {
      e.preventDefault()
      if (this.activeAssociationIndex > 0) this.activeAssociationIndex--
    },
    handleDirectionDownPress (e) {
      e.preventDefault()
      if (this.activeAssociationIndex < this.localAssociations.length) this.activeAssociationIndex++
    },
    handleCoreFocus (e) {
      this.active = true
      if (this.associations.length) {
        this.associationsShow = true
      }
    },
    handleCoreBlur (e) {
      this.active = false
    },
    handleWindowClick (e) {
      if (!isAncestor(e.target, this.$refs.body)) this.associationsShow = false
    },
    handleAssociationClick (v) {
      this.throughMatcher(v).then(res => {
        if (res) {
          this.setTag(v)
        } else this.inputValue = v
      })
      this.$refs.input.focus()
    },
    handleTagClose (index, e) {
      e.stopPropagation()
      if (this.canRemove) {
        this.localTags.splice(index, 1)
      }
    }
  },
  mounted () {
    window.addEventListener('click', this.handleWindowClick)
  },
  destroy () {
    window.removeEventListener('click', this.handleWindowClick)
  }
}
</script>
