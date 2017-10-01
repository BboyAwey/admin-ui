<style lang="scss">
  @import '../style/vars.scss';
  .au-select {
    position: relative;
    width: 198px;
    display: inline-block;
  }
  .au-select-label-text {
    font-size: $normal;
    margin-bottom: 8px;
    color: $grayDarken35;
  }
  .au-select-core-container {
    position: relative;
    height: 32px;
    outline: none;
  }
  .au-select-core {
    position: relative;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid $grayBrighten5;
    padding: 0 8px;
    padding-right: 26px;
    width: 100%;
    line-height: 30px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $fontFamily;
    color: $grayDarken45;
    font-size: $normal;
    outline: none;
    user-select: none;
    cursor: default;
  }
  .au-select-arrow {
    display: inline-block;
    position: absolute;
    height: 24px;
    top: 0;
    right: 8px;
    font-size: 20px;
  }
  .au-select:not(.au-form-disabled) .au-select-active {
    .au-select-core {
      border-color: $info;
      box-shadow: 0 0 4px $info;
    }
  }
  .au-select-arrow-active {
    color: $info;
  }
  .au-select-option-container {
    z-index: 9990;
    top: 36px;
    position: absolute;
    border: 1px solid $grayBrighten5;
    border-radius: 2px;
    padding: 4px 0;
    min-width: 84px;
    width: 100%;
    max-height: 237px;
    overflow-y: auto;
    box-shadow: $shadowLevel3;
    background-color: #fff;
    & > li {
      height: 28px;
      padding: 0 8px;
      line-height: 28px;
      font-size: $normal;
      color: $grayDarken45;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: default;
    }
    & > li:not(.selected):hover {
      background-color: $grayBrighten15;
      // background-color: $primary;
      // color: #fff;
    }
    & > .disabled {
      color: $grayBrighten5;
    }
    & > .selected {
      background-color: $primary;
      color: #fff;
    }
  }
  .au-select.au-form-warning {
    .au-select-core {
      border-color:  $danger;
    }

    .au-select-warning {
      margin-top: 6px;
      font-size: $small;
      color: $danger;
    }
    .au-select-arrow-active {
      color: $danger;
    }
  }
  .au-select.au-form-warning:not(.disabled) .au-select-active {
    .au-select-core {
      border-color:  $danger;
      box-shadow: 0 0 4px  $danger;
    }
  }
  .au-select.au-form-small {
    .au-select-core-container {
      height: 26px;
    }
    .au-select-core {
      height: 26px;
      line-height: 24px;
    }
    .au-select-option-container {
      top: 28px;
      li {
        height: 22px;
        padding: 0 8px;
        line-height: 22px;
        font-size: $small;
      }
    }
  }
  .au-form-disabled .au-select-core, .au-form-disabled .au-select-label-text {
    cursor: not-allowed;
  }
  .au-form-disabled .au-select-core {
    background-color: $grayBrighten20;
  }
  .au-select-search-input {
    position: relative;
    .au-select-search-input-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -9.5px;
    }
  }
  .au-select-multiple {
    li {
      float: left;
      margin-right: 12px;
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
  .au-select-placeholder {
    color: $grayBrighten5;
  }
</style>
<template>
  <div class="au-select" :class="classes">
    <div class="au-select-label-text" @click="labelClick" v-if="label" @click.stop="()=>{}">{{ label }}</div>
    <div class="au-select-core-container" :class="{ 'au-select-active': active}">
      <div id="test" class="au-select-core" ref="core" tabindex="0" @click.stop="coreClick" @focus="coreFocus" @blur="coreBlur">
        <ul class="au-select-multiple">
          <li v-show="!selectedOptions.length" class="au-select-placeholder">{{ placeholder }}</span></li>
          <li v-if="!multiple && selectedOptions.length">{{ selectedOptions[0].text }}</li>
          <li v-else v-for="(option, index) in selectedOptions">
            <span>{{ option.text }}</span>
            <span @click.stop="deleteSelectedOption(index)" class="au-select-close-icon">
              <au-icon type="ion-android-close"></au-icon>
            </span>
          </li>
        </ul>
        <span  class="au-select-arrow" :class="optionDisplay ? 'au-select-arrow-active' : ''">
          <au-icon type="ion-android-arrow-dropdown"></au-icon>
        </span>
      </div>
      <ul class="au-select-option-container" v-show="optionDisplay" ref="options" tabindex="0" @blur="optionsBlur">
        <li
          v-for="option in options"
          :class="{'selected': multiple ? localValue.includes(option.value) : (localValue === option.value)}"
          @click.stop="select(option, $event)">{{ option.text }}</li>
      </ul>
    </div>
    <div class="au-select-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="au-select-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier: lianghao
  // email: lianghao@rongcapital.cn

  import localValidatorMixin from '../helpers/local-validator-mixin'
  import standardFormApiMixin from '../helpers/standard-form-api-mixin'
  import { getElementSize } from '../helpers/common'
  import auIcon from './au-icon'
  import auInput from './au-input'
  export default {
    name: 'au-select',
    mixins: [localValidatorMixin, standardFormApiMixin],
    components: {
      auIcon,
      auInput
    },
    created () {
      this.localValueToSelectedOptions()
    },
    mounted () {
      if (this.multiple && !(this.value instanceof Array)) {
        console.error('au-select: value should be Array if multiple selecting allowed.')
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
          console.log(v)
          this.localValueToSelectedOptions()
        }
      }
    },
    methods: {
      deleteSelectedOption (index) {
        this.selectedOptions.splice(index, 1)
        this.localValue.splice(index, 1)
      },
      labelClick () {
        if (this.disabled) return false
        this.$refs.core.focus()
        this.optionDisplay = true
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
      localValueToSelectedOptions () {
        let {options, localValue} = this
        let res = []
        for (let i = 0; i < options.length; i++) {
          if (localValue instanceof Array && localValue.includes(options[i].value)) {
            res.push(options[i])
          } else if (localValue === options[i].value) {
            res.push(options[i])
            break
          }
        }
        this.selectedOptions = res
      },
      reposPopup () {
        if (this.multiple) {
          let coreHeight = getElementSize(this.$refs.core).height
          let options = this.$refs.options
          options.style.top = coreHeight + 2 + 'px'
        }
      }
    }
  }
</script>
