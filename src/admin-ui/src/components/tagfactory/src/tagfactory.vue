<style lang="scss">
@import '../../../style/_vars.scss';
.au-tagfactory-body {
  position: relative;
  display: inline-block;
  z-index: 1;
  max-width: 100%;
}
.au-tagfactory-core {
  position: relative;
  display: inline-block;
  min-width: 83px;
  width: 100%;
  height: 100%;
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
    width: 5px;
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
}
.au-tagfactory-associations-item {
    display: block;
    height: 32px;
    padding: 0 8px;
    margin: 0;
    line-height: 28px;
    font-size: $normal;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    cursor: pointer;
  }
</style>
<template>
  <div class="au-tagfactory au-theme-color--base-3" :style="{display: fullWidth ? 'block' : ''}">
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
        <div
          ref="tagsContainer"
          class="au-tagfactory-core au-theme-border-radius--small"
          :class="{
            'au-theme-background-color--base-12': !disabled,
            'au-theme-background-color--base-11': disabled,
            'au-theme-border-color--base-9': disabled || (!hasWarnings && !active),
            'au-theme-border-color--primary': !disabled && !hasWarnings && active,
            'au-theme-border-color--danger': hasWarnings,
            'au-theme-box-shadow--primary': !disabled && active && !hasWarnings,
            'au-theme-box-shadow--danger': !disabled && active && hasWarnings
          }"
          :style="{
            cursor: disabled ? 'not-allowed' : '',
            width, maxWidth, minWidth, minHeight, maxHeight
          }"
          @click.stop="handleClick">
          <div
            class="au-tagfactory-placeholder au-theme-color--base-8"
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
        </div>
        <au-scroller class="
          au-tagfactory-associations-container
          au-theme-border-color--base-11
          au-theme-background-color--base-12"
          v-show="(associationsShow && localAssociations.length) || (canCreate && inputValue && active)"
          ref="associationsContainer"
          direction="vertical"
          :scrollTop="associationsScrollTop" @scroll="v => associationsScrollTop = v.scrollTop">
          <ul>
            <li
              class="au-tagfactory-associations-item au-theme-hover-background-color--base-11 au-theme-color--primary"
              v-show="canCreate && inputValue && associations.indexOf(inputValue) === -1"
              @click="handleAssociationClick(inputValue)"> {{ inputValue }} </li>
            <li
              v-for="(association, i) in localAssociations"
              :key="i"
              :class="{
                'au-tagfactory-associations-item': true,
                'au-theme-background-color--primary-bottom': activeAssociationIndex === i + 1
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
import AuTag from 'components/tag'
// import AuPopover from 'components/popover'
import AuScroller from 'components/scroller'
import Loading from 'components/loading'

import FormItem from 'helpers/form-item.vue'
import ValidatorMixin from 'helpers/validator-mixin'
import FormApiMixin from 'helpers/form-api-mixin'
import { isAncestor } from 'helpers/dom'

export default {
  name: 'au-tagfactory',
  components: { AuTag, AuScroller, FormItem },
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
    warning: Boolean,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localTags: this.tags,
      lengthWhenDown: 0,
      isSeriesDown: 0,
      inputValue: '',
      associationsShow: false,
      activeAssociationIndex: 0,
      active: false,
      loadingInstance: null,
      associationsScrollTop: 0
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
        if (!v.length && this.localTags.length) {
          this.localTags = v
          return
        }
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
        if (!v.length && this.tags.length) {
          this.$emit('change', v)
          return
        }
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
        this.checkAssociationsDisplay()
      }
    },
    inputValue (v) {
      // this.checkAssociationsDisplay()
      this.$emit('input-change', v)
    },
    loading (v) {
      if (v) {
        this.$nextTick(() => {
          this.loadingInstance = Loading({
            target: this.associationsShow ? this.$refs.associationsContainer.$el : this.$refs.tagsContainer.$el,
            size: 30
          })
        })
      } else {
        if (this.loadingInstance) {
          this.loadingInstance.close()
          this.loadingInstance = null
        }
      }
    },
    activeAssociationIndex (v) {
      const viewHeight = 32 * 7
      if (viewHeight + this.associationsScrollTop < v * 32) {
        this.associationsScrollTop = v * 32 - viewHeight
      } else if ((v - 1) * 32 < this.associationsScrollTop) {
        this.associationsScrollTop = (v - 1) * 32 - 15
      }
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
      }).catch(e => {
        console.warn(`Admin UI@${this.$options._componentTag}@throughMatcher: ${e}`)
      })
    },
    setTag (value) {
      if (!this.repeat && this.localTags.indexOf(value) !== -1) {
        this.inputValue = value
      } else {
        this.localTags.push(value)
        this.inputValue = ''
      }
    },
    handleClick () {
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
      if (this.associations.length) {
        this.associationsShow = true
      }
      if (!this.active) {
        this.active = true
        this.$emit('focus', this.localTags)
      }
    },
    handleCoreBlur (e) {
      // this.active = false
      this.$emit('blur', this.localTags)
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
    },
    checkAssociationsDisplay () {
      if (this.active && this.localAssociations.length && !this.associationsShow) {
        this.associationsShow = true
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
