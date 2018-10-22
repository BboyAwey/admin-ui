<style lang="scss">
  .au-json-schema {}
  .au-json-schema-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0;
    & > * {
      // flex:
    }
    & > *:not(:last-child) {
      margin-right: 10px;
    }
    .au-json-schema-key {
      flex-grow: 1;
    }
    .au-json-schema-init > * {
      width: 100%;
      input {
        cursor: pointer;
      }
    }
    .au-json-schema-init,
    .au-json-schema-type {
      width: 94px;
      flex-shrink: 0;
    }
  }
  .au-json-schema-icons {
    width: 34px;
    font-size: 14px;
    & > * {
      cursor: pointer;
    }
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
  .au-json-schema-children-container {
    padding-left: 20px;
    flex-shrink: 0;
    & > * {
      margin-top: 10px;
    }
  }
  .au-json-schema-collapse-icon {
    width: 10px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
</style>

<template>
  <div class="au-json-schema au-theme-color--base-3">
    <div class="au-json-schema-item">
      <div class="au-json-schema-collapse-icon">
        <au-icon
          class="
            au-theme-color--base-3
            au-theme-hover-color--primary
          "
          :type="showChildren ? 'caret-down' : 'caret-right'"
          v-show="isReferenceType"
          @click="showChildren = !showChildren"/>
      </div>
      <div class="au-json-schema-key">
        <au-input
          :disabled="_isRoot || _isItem"
          :placeholder="_isRoot ? 'root' : localKey"
          full-width
          :size="formItemSize"
          v-model="localKey"/>
      </div>
      <div class="au-json-schema-init"
        v-if="init"
        @click="isReferenceType ? '' : setInit(Object.assign(localSchema, {
          key: localKey,
        }), !_isRoot)">
        <au-input
          placeholder="初始值"
          :disabled="isReferenceType"
          :readonly="!isReferenceType"
          :value="localSchema.init"
          full-width
          :size="formItemSize"/>
        <!-- <au-button :disabled="isReferenceType" full-width :size="formItemSize">初始值</au-button> -->
      </div>
      <au-select
        :options="_isRoot ? rootTypes.map(t => ({text: t, value: t})) : types.map(t => ({text: t, value: t}))"
        class="au-json-schema-type"
        :size="formItemSize"
        v-model="localSchema.type"/>
      <div class="au-json-schema-icons">
        <au-icon type="times"
          v-show="!_isRoot && !_isItem"
          class="au-json-schema-icon au-theme-color--danger"
          @click="$emit('remove', _key)"/>
        <au-icon
          type="plus"
          v-show="this.localSchema.type === 'object'"
          class="au-json-schema-icon au-theme-color--success"
          @click="add"/>
      </div>
    </div>
    <div class="au-json-schema-children-container" v-if="
      showChildren &&
      localSchema.type === 'object'">
      <au-json-schema
        :_index="_index ? _index + 1 : 2"
        v-for="(value, key) in localSchema.properties"
        :key="key"
        :_key="key"
        :_is-root="false"
        :_is-item="false"
        v-model="localSchema.properties[key]"
        @deep-change="handleDeepChange"
        @remove="handleRemove"
        :init="init"
        @set-init="setInit"/>
    </div>
    <div class="au-json-schema-children-container" v-if="
      showChildren &&
      localSchema.type === 'array'">
      <au-json-schema
        :_index="_index ? _index + 1 : 2"
        :_key="'item'"
        :_is-item="true"
        :_is-root="false"
        v-model="localSchema.items"
        @deep-change="handleDeepChange"
        :init="init"
        @set-init="setInit"/>
    </div>
    <au-modal
      v-if="_isRoot"
      :title="`设置 ${currentItem.key} 的初始值`"
      :visible="initModalVisible"
      @hide="cancelSetInit"
      :buttons="[
        {
          text: '取消',
          type: 'default',
          handler () {
            initModalVisible = false
          }
        },{
          text: '确认',
          type: 'primary',
          handler: confirmSetInit
        }
      ]">
      <au-input
        v-show="currentItem.type !== 'boolean'"
        :type="currentItem.type !== 'string' ? 'text' : 'textarea'"
        width="100%"
        height="100px"
        min-height="100px"
        max-height="100px"
        @change="correctNumberInit(currentItem.type)"
        v-model="currentItemNewInit" full-width/>
      <au-radio
        v-show="currentItem.type === 'boolean'"
        :radios="[
          { text: 'true', value: true },
          { text: 'false', value: false }
        ]"
        v-model="currentItemNewInit"/>
    </au-modal>
  </div>
</template>

<script>
import AuInput from '../../input'
import AuSelect from '../../select'
import AuRadio from '../../radio'
import AuIcon from '../../icon'
import deepClone from '../../../helpers/utils/deep-clone.js'
import AuButton from '../../button'
import AuModal from '../../modal'

let types = ['boolean', 'integer', 'number', 'string', 'object', 'array']
let propertyCount = 0

export default {
  name: 'au-json-schema',
  components: { AuInput, AuSelect, AuIcon, AuButton, AuModal, AuRadio },
  props: {
    _index: Number,
    _key: String,
    _isItem: Boolean,
    _isRoot: {
      type: Boolean,
      default: true
    },
    schema: {
      type: Object,
      default: _ => ({
        type: 'object',
        properties: {
          'a': {
            type: 'string'
          },
          'b': {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }})
    },
    label: {
      type: String,
      default: 'JSON Schema'
    },
    types: {
      type: Array,
      default: _ => types
    },
    rootTypes: {
      type: Array,
      default: _ => types
    },
    init: Boolean,
    formItemSize: String
    // TODO: reqiure, mock
  },
  model: {
    prop: 'schema',
    event: 'change'
  },
  data () {
    return {
      localSchema: this._isRoot ? deepClone(this.schema) : this.schema,
      showChildren: true,
      currentItem: {
        key: '',
        init: '',
        type: ''
      },
      currentItemNewInit: '',
      initModalVisible: false,
      localKey: this._key
    }
  },
  computed: {
    isReferenceType () {
      return this.localSchema.type === 'object' ||
        this.localSchema.type === 'array'
    }
  },
  watch: {
    _key (v) {
      if (this.localKey !== v) this.localKey = v
    },
    localKey (v) {
      if (this.localSchema.oldKey !== v) {
        this.$set(this.localSchema, 'oldKey', v)
      }
    },
    'localSchema.type' (v) {
      this.localSchema.init = ''
      this.localSchema.properties = {}
      this.localSchema.items = {}
      if (v === 'object') {
        // object can be empty
        // this.$set(this.localSchema, 'properties', {
        //   'property_01': {
        //     type: 'string',
        //     init: ''
        //   }
        // })
      }
      if (v === 'array') {
        // this.$set(this.localSchema, 'items', {
        //   type: 'string',
        //   init: ''
        // })
        this.localSchema.item = {
          type: 'string',
          init: ''
        }
        // this.$forceUpdate()
      }
    },
    localSchema: {
      deep: true,
      handler (v) {
        if (this._isRoot) {
          console.log(v, 'root -- ', this._index)
          this.finalChange()
        } else {
          console.log(v, 'not root -- ', this._index)
          // no goddam unidirectional data flow
          // and we can only trigger the change by ourselves when nest level is great than 3
          this.triggerDeepChange(3)
        }
      }
    }
  },
  methods: {
    setInit (item, source) {
      if (this._isRoot) {
        this.currentItem = item
        this.currentItemNewInit = item.init
        this.initModalVisible = true
      } else {
        if (source) {
          item.set = this.$set.bind(this)
        }
        this.$emit('set-init', item)
      }
    },
    cancelSetInit () {
      this.currentItemNewInit = ''
      this.initModalVisible = false
    },
    confirmSetInit () {
      if (this.currentItem.set instanceof Function) {
        this.currentItem.set(this.currentItem, 'init', this.currentItemNewInit)
      } else {
        this.currentItem.init = this.currentItemNewInit
        this.finalChange()
      }
      this.initModalVisible = false
      this.currentItemNewInit = ''
      // this.currentItem.forceUpdate()
      // console.log(this.currentItem)
      // this.finalChange()
    },
    correctNumberInit (type) {
      if (!this.currentItemNewInit) return
      if (type === 'integer') {
        if (!/^\d$/g.test(this.currentItemNewInit)) {
          this.currentItemNewInit = this.currentItemNewInit.match(/\d/g).join('')
        }
      } else if (type === 'number') {
        if (!/^\d+\.?\d*$/g.test(this.currentItemNewInit)) {
          let nums = this.currentItemNewInit.match(/\d|\./g).join('')
          let dotIndex = nums.indexOf('.')
          let head = nums.substring(0, dotIndex + 1)
          if (head[0] === '.') head = '0' + head
          let tail = nums.substring(dotIndex + 1, nums.length).replace('.', '')
          this.currentItemNewInit = head + tail
        }
      }
    },
    purifySchema (schema) {
      if (schema.properties) {
        let res = {}
        for (let key in schema.properties) {
          let value = schema.properties[key]
          if (value.newKey) {
            res[value.newKey] = value
            delete res[value.newKey].newKey
          } else {
            res[key] = value
          }
        }
        schema.properties = res
      }
      return schema
    },
    handleDeepChange () { // recieve deep change
      if (this._isRoot) {
        this.finalChange()
      } else {
        this.$emit('deep-change')
      }
    },

    finalChange () {
      // this.$emit('change', )
      console.log('final change')
    },
    handleRemove (key) {
      console.log('-----', this._index)
      this.$delete(this.localSchema.properties, key)
      this.triggerDeepChange(2)
      this.$forceUpdate()
    },
    add () {
      console.log('+++++', this._index)
      if (!this.localSchema.properties) {
        this.localSchema.properties = {}
      }
      this.$set(this.localSchema.properties, 'property_' + (propertyCount++ + '').padStart(2, '0'), {
        type: 'string',
        init: ''
      })
      this.triggerDeepChange(1)
      this.$forceUpdate()
    },
    triggerDeepChange (level) {
      if (this._index > level) this.$emit('deep-change')
    }
  }
}
</script>
