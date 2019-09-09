<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/size';
  @import '../../../style/sizegap';
  @import '../../../style/label';
  @import '../../../style/warnings';
  .au-select {
    position: relative;
    width: auto;
    display: inline-block;
    text-align: left;
  }
  .au-select-core-container {
    position: relative;
    outline: none;
  }
  .au-select-core {
    position: relative;
    display: inline-block;
    padding: 0 12px;
    padding-right: 26px;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $fontFamily;
    font-size: $normal;
    outline: none;
    user-select: none;
    cursor: default;
  }
  .au-select-arrow {
    display: inline-block;
    position: absolute;
    height: 18px;
    top: 50%;
    margin-top: -9px;
    right: 8px;
    font-size: $large;
  }
  .au-select-option-scroller {
    width: 100%;
    max-height: 237px;
  }
  .au-select-option {
    outline: none;
    & > li {
      height: 28px;
      padding: 0 12px;
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
    .empty-item {
      cursor: default;
    }
  }
  .au-select-multiple {
    line-height: inherit;
    li {
      position: relative;
      float: left;
      max-width: 100%;
      margin-right: 12px;
      padding-right: 14px;
      line-height: inherit;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:after {
      content: '';
      clear: both;
      display: block;
    }
  }
  .au-select-close-icon {
    position: absolute;
    top: 6px;
    right: 0;
    cursor: pointer;
  }
</style>
<template>
  <div class="au-select au-theme-color--base-3" :style="{display: fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="inline"
      :warnings="warnings || localWarnings">
      <au-popover
        trigger="click"
        placement="bottom left"
        :disabled="disabled || loading"
        hideOnBlur
        ref="popover"
        @hide="popoverVisibal = false"
        @show="popoverVisibal = true"
        @keyup.native.down="optionsDownPress"
        @keyup.native.up="optionsUpPress"
        @keyup.native.enter="optionsEnterPress"
        @keyup.native.esc="optionsEscPress"
        plain>
        <div
          slot="target"
          :class="`au-select-core-container au-size-${size}`"
          ref="coreContainer"
          :style="{width, maxWidth, minWidth}">
          <div
            class="au-select-core au-theme-border-radius--small"
            ref="core"
            tabindex="0"
            @focus="coreFocus"
            @blur="coreBlur"
            @keyup.enter="enterPress"
            :class="{
              [`au-size-${size}-bordered`]: true,
              'au-theme-background-color--base-12': !disabled,
              'au-theme-background-color--base-11': disabled,
              'au-theme-border-color--base-10': disabled || (!hasWarnings && !active),
              'au-theme-border-color--primary': !disabled && !hasWarnings && active,
              'au-theme-border-color--danger': hasWarnings,
              'au-theme-box-shadow--primary': !disabled && active && !hasWarnings,
              'au-theme-box-shadow--danger': !disabled && active && hasWarnings
            }"
            :style="{
              cursor: disabled ? 'not-allowed' : 'default'
            }">
            <ul class="au-select-multiple" ref="selectMultiple">
              <li v-show="!selectedOptions.length" class="au-select-placeholder au-theme-color--base-8" :style="{opacity: placeholder ? 1 : 0}">{{ placeholder || 'placeholder' }}</li>
              <li v-if="!multiple && selectedOptions.length">{{ selectedOptions[0].text }}</li>
              <li v-else v-for="(option, i) in selectedOptions" :key="i">
                <span>{{ option.text }}</span>
                <span
                  @click.stop="deleteSelectedOption(i)"
                  class="
                    au-select-close-icon
                    au-theme-color--base-10
                    au-theme-hover-color--danger
                  ">
                  <au-icon type="times"/>
                </span>
              </li>
            </ul>
            <au-icon
              class="au-select-arrow"
              type="caret-down"
              :class="{
                'au-theme-color--primary': !disabled && active
              }"/>
          </div>
        </div>
        <au-scroller class="au-select-option-scroller" slot="content">
          <ul class="au-select-option" ref="options">
            <li v-show="!options.length" class="empty-item au-theme-color--base-8">没有选项</li>
            <li
              v-for="(option, i) in options" :key="i"
              :class="{
                'au-theme-color--primary': isSelected(option.value),
                'au-theme-hover-background-color--base-11': !isSelected(option.value) && i !== tempSelectIndex,
                'au-theme-background-color--primary-bottom': i === tempSelectIndex
              }"
              @click.stop="select(option, $event)">{{ option.text }}</li>
          </ul>
        </au-scroller>
      </au-popover>

    </form-item>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
import AuScroller from 'components/scroller'
import AuPopover from 'components/popover'
import Loading from 'components/loading'

import ValidatorMixin from 'helpers/validator-mixin'
import FormApiMixin from 'helpers/form-api-mixin'
import { getElementSize } from 'helpers/dom'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-select',
  mixins: [ValidatorMixin, FormApiMixin],
  components: { AuIcon, AuScroller, FormItem, AuPopover },
  created () {
    this.localValueToSelectedOptions()
  },
  mounted () {
    if (this.multiple && !(this.value instanceof Array)) {
      console.error('Admin UI@au-select@ value should be Array if multiple selecting allowed.')
    }
    this.load()
    this.multiple && this.$nextTick(this.resize)
  },
  data () {
    return {
      selectedOptions: [],
      active: false,
      popoverVisibal: false,
      tempSelectIndex: null,
      scrollTop: 0,
      laodingIns: null
    }
  },
  props: {
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fullWidth: Boolean,
    width: String,
    maxWidth: String,
    minWidth: String,
    loading: Boolean
  },
  watch: {
    localValue () {
      this.localValueToSelectedOptions()
      this.input()
      this.change()
      this.$nextTick(this.reposPopup)
    },
    options: {
      deep: true,
      handler (v) {
        this.localValueToSelectedOptions()
      }
    },
    popoverVisibal (v) {
      if (!v) this.tempSelectIndex = null
      if (v) {
        this.$refs.options.style.minWidth =
          this.$refs.core.getBoundingClientRect().width - 2 + 'px'
      }
    },
    tempSelectIndex (v) {
      this.updateScrollTop()
    },
    loading () {
      this.load()
    }
  },
  methods: {
    deleteSelectedOption (index) {
      this.selectedOptions.splice(index, 1)
      this.localValue.splice(index, 1)
      this.multiple && this.$nextTick(this.resize)
    },
    select (option, e, silent) {
      if (this.multiple) {
        if (!this.localValue.includes(option.value)) {
          this.localValue.push(option.value)
        } else {
          this.localValue.splice(this.localValue.indexOf(option.value), 1)
        }
        this.$nextTick(this.resize)
      } else {
        if (this.localValue !== option.value) {
          this.selectedOptions = [option]
          this.localValue = option.value
        }
      }
      if (!this.multiple) {
        this.$refs.popover.hide()
        this.$nextTick(_ => this.$refs.core.focus())
      }
      this.active = false
      if (!silent) this.$emit('select', option, e)
    },
    resize () {
      let height = getElementSize(this.$refs.selectMultiple).height
      this.$refs.coreContainer.style.height = height + 2 + 'px'
      this.$refs.core.style.height = height + 2 + 'px'
    },
    localValueToSelectedOptions () {
      let { options, localValue } = this
      let res = []
      let findSelectedOptionByValue = (value, options) => {
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === value) {
            return options[i]
          }
        }
      }
      if (localValue instanceof Array) {
        for (let i = 0; i < localValue.length; i++) {
          let option = findSelectedOptionByValue(localValue[i], options)
          if (option) res.push(option)
        }
      } else {
        let option = findSelectedOptionByValue(localValue, options)
        if (option) res.push(option)
      }
      this.selectedOptions = res
    },
    isSelected (value) {
      return this.multiple ? this.localValue.includes(value) : (this.localValue === value)
    },
    coreFocus () {
      this.active = true
      // this.$refs.popover.show()
      this.$emit('focus', this.localValue)
    },
    coreBlur () {
      if (this.active) this.active = false
      this.$emit('blur', this.localValue)
    },
    enterPress () {
      if (this.active) this.$refs.popover.show()
    },
    optionsDownPress () {
      if (this.tempSelectIndex === null) this.tempSelectIndex = 0
      else if (this.tempSelectIndex < this.options.length - 1) this.tempSelectIndex++
    },
    optionsUpPress () {
      if (this.tempSelectIndex === null) this.tempSelectIndex = this.options.length - 1
      else if (this.tempSelectIndex > 0) this.tempSelectIndex--
    },
    optionsEnterPress () {
      if (this.tempSelectIndex !== null) {
        this.select(this.options[this.tempSelectIndex])
      }
    },
    optionsEscPress () {
      if (this.popoverVisibal) {
        this.$refs.popover.hide()
        this.$nextTick(_ => this.$refs.core.focus())
      }
    },
    updateScrollTop () {
      if (this.tempSelectIndex * 32 < this.scrollTop) {
        this.scrollTop = this.tempSelectIndex * 32
      } else if ((this.tempSelectIndex + 1) * 32 > this.scrollTop + 237) {
        this.scrollTop = (this.tempSelectIndex + 1) * 32 - 232
      }
    },
    load () {
      if (this.loading) {
        this.loadingIns = Loading({
          target: this.$refs.core
        })
      } else {
        if (this.loadingIns) {
          this.loadingIns.close()
          this.loadingIns = null
        }
      }
    }
  }
}
</script>
