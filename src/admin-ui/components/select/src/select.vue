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
  }
  .au-select-core-container {
    position: relative;
    outline: none;
  }
  .au-select-core {
    position: relative;
    display: inline-block;
    padding: 0 8px;
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
    z-index: 9990;
    position: absolute;
    border-width: 1px;
    border-style: solid;
    padding: 4px 0;
    min-width: 84px;
    width: 100%;
    max-height: 237px;
  }
  .au-select-option {
    outline: none;
    & > li {
      height: 28px;
      padding: 0 8px;
      line-height: 28px;
      font-size: $normal;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: default;
    }
  }
  .au-select-multiple {
    line-height: inherit;
    li {
      float: left;
      margin-right: 12px;
      line-height: inherit;
    }
    &:after {
      content: '';
      clear: both;
      display: block;
    }
  }
  .au-select-close-icon {
    cursor: pointer;
  }
</style>
<template>
  <div class="au-select au-theme-font-color--base-3">
    <div class="au-form-label" :class="{
      'au-theme-font-color--danger-3': hasWarnings
    }" :style="{
      cursor: disabled ? 'not-allowed' : 'default'
    }" @click="labelClick" v-if="label" @click.stop="()=>{}">{{ label }}</div>
    <div :class="`au-select-core-container au-size-${size}`" ref="coreContainer">
      <div
        class="au-select-core au-theme-radius"
        ref="core"
        tabindex="0"
        @click.stop="coreClick" @focus="coreFocus" @blur="coreBlur"
        :class="{
          [`au-size-${size}`]: true,
          'au-theme-background-color--base-12': !disabled,
          'au-theme-background-color--base-9': disabled,
          'au-theme-border-color--base-8': disabled || (!hasWarnings && !active),
          'au-theme-border-color--primary-3': !disabled && !hasWarnings && active,
          'au-theme-border-color--danger-3': hasWarnings,
          'au-theme-shadow--primary': !disabled && active,
          'au-theme-font-color--danger-3': hasWarnings
        }" :style="{
          cursor: disabled ? 'not-allowed' : 'default'
        }">
        <ul class="au-select-multiple" ref="selectMultiple">
          <li v-show="!selectedOptions.length" class="au-select-placeholder au-theme-font-color--base-7">{{ placeholder }}</span></li>
          <li v-if="!multiple && selectedOptions.length">{{ selectedOptions[0].text }}</li>
          <li v-else v-for="(option, i) in selectedOptions" :key="i">
            <span>{{ option.text }}</span>
            <span @click.stop="deleteSelectedOption(i)" class="au-select-close-icon">
              <au-icon type="times"></au-icon>
            </span>
          </li>
        </ul>
        <au-icon class="au-select-arrow" type="caret-down"
        :class="{
          'au-theme-font-color--primary-3': !disabled && active
        }"></au-icon>
      </div>
      <au-scroller class="au-select-option-scroller"
        ref="selectScroller"
        :class="`
        au-sizegap-${size}
        au-select-option
        au-theme-background-color--base-12
        au-theme-border-color--base-8
        au-theme-shadow--level-3
        au-theme-radius`" v-show="optionDisplay">
        <ul class="au-select-option" ref="options" tabindex="0" @blur="optionsBlur">
          <li
            v-for="(option, i) in options" :key="i"
            :class="{
              'au-theme-background-color--primary-5': isSelected(option.value),
              'au-theme-hover-background-color--base-10': !isSelected(option.value)
            }"
            @click.stop="select(option, $event)">{{ option.text }}</li>
        </ul>
      </au-scroller>
    </div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, i) in warnings" :key="i">{{ warning }}</div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, i) in localWarnings" :key="i">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier: lianghao
  // email: lianghao@rongcapital.cn

  import ValidatorMixin from '../../../helpers/validator-mixin'
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import { getElementSize } from '../../../helpers/dom'
  import AuIcon from '../../icon'
  import AuInput from '../../input'
  import AuScroller from '../../scroller'

  export default {
    name: 'au-select',
    mixins: [ValidatorMixin, FormApiMixin],
    components: {AuIcon, AuInput, AuScroller},
    created () {
      this.localValueToSelectedOptions()
    },
    mounted () {
      if (this.multiple && !(this.value instanceof Array)) {
        console.error('Admin UI@au-select@ value should be Array if multiple selecting allowed.')
      }
      this.reposPopup()
    },
    data () {
      return {
        optionDisplay: false,
        selectedOptions: [],
        active: false
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: {
        type: Array,
        required: true
      },
      multiple: {
        type: Boolean,
        default: false
      }
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
      }
    },
    methods: {
      deleteSelectedOption (index) {
        this.selectedOptions.splice(index, 1)
        this.localValue.splice(index, 1)
        this.$nextTick(this.resize)
      },
      labelClick () {
        if (this.disabled) return false
        this.$refs.core.click()
        this.$refs.core.focus()
      },
      coreClick () {
        if (this.disabled) return false
        this.active = !this.active
        this.optionDisplay = !this.optionDisplay
      },
      coreFocus (e) {
        if (!this.disabled) {
          this.focus(e)
        }
      },
      coreBlur (e) {
        if (e.relatedTarget !== this.$refs.options) {
          this.optionDisplay = false
          this.active = false
          this.blur(e)
        }
      },
      optionsBlur (e) {
        if (e.relatedTarget !== this.$refs.core) {
          this.optionDisplay = false
          this.blur(e)
        }
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
        if (!this.multiple) this.optionDisplay = false
        this.active = false
        if (!silent) this.$emit('select', option, e)
      },
      resize () {
        let height = getElementSize(this.$refs.selectMultiple).height
        this.$refs.coreContainer.style.height = height + 'px'
        this.$refs.core.style.height = height + 'px'
        this.$refs.selectScroller.$el.style.top = height + 2 + 'px'
      },
      localValueToSelectedOptions () {
        let {options, localValue} = this
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
      reposPopup () {
        if (this.multiple) {
          let coreHeight = getElementSize(this.$refs.core).height
          let options = this.$refs.options
          options.style.top = coreHeight + 2 + 'px'
        }
      },
      isSelected (value) {
        return this.multiple ? this.localValue.includes(value) : (this.localValue === value)
      }
    }
  }
</script>
