<style lang="scss">
  .au-json-schema {}
  .au-json-schema-label {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 14px;
  }
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
    <div class="au-json-schema-label" v-if="_isRoot && label">
      {{ label }}
    </div>
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
          :placeholder="_isRoot ? (rootName || 'root') : localKey"
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
        :options="typeOptions"
        :disabled="typeOptions.length < 2"
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
          @click="addProperty"/>
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
        @remove="removeProperty"
        :init="init"
        @set-init="setInit"
        :types="types"/>
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
        @set-init="setInit"
        :types="types"/>
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
types.isNumberType = type => type === 'number' || type === 'integer'
types.isReferenceType = type => type === 'object' || type === 'array'

let propertyCount = 1

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
      reqiure: true
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
    rootName: String,
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
      localKey: this._key,
      finalChangeTimer: null
    }
  },
  computed: {
    isReferenceType () {
      return types.isReferenceType(this.localSchema.type)
    },
    typeOptions () {
      return this._isRoot
        ? this.rootTypes.map(t => ({text: t, value: t}))
        : this.types.map(t => ({text: t, value: t}))
    }
  },
  watch: {
    _key (v) {
      if (this.localKey !== v) this.localKey = v
    },
    localKey (v) {
      if (this.localSchema.newKey !== v) {
        this.$set(this.localSchema, 'newKey', v)
        this.handleDeepChange()
      }
    },
    'localSchema.type' (v) {
      this.localSchema.init = ''
      this.localSchema.properties = {}
      this.localSchema.items = {}
      if (v === 'object') {
        this.$set(this.localSchema, 'properties', {})
      }
      if (v === 'array') {
        this.$set(this.localSchema, 'items', {
          type: this.types[0],
          init: ''
        })
      }
      this.handleDeepChange()
    },
    // localSchema: {
    //   deep: true,
    //   handler (v) {
    //     if (this._isRoot) {
    //       this.finalChange()
    //     } else {
    //       // no goddam unidirectional data flow
    //       // and we can only trigger the change by ourselves when nest level is great than 3
    //       this.handleDeepChange()
    //     }
    //   }
    // },
    schema: {
      deep: true,
      handler (v) {
        if (this._isRoot) {
          if (JSON.stringify(v) !== JSON.stringify(this.purifySchema(this.localSchema))) {
            this.localSchema = deepClone(v)
          }
        } else {
          this.localSchema = v
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
          item.forceUpdate = this.$forceUpdate.bind(this)
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
        this.currentItem.forceUpdate()
      } else {
        this.currentItem.init = this.currentItemNewInit
      }
      this.initModalVisible = false
      this.currentItemNewInit = ''
      this.handleDeepChange()
      // this.currentItem.forceUpdate()
      // console.log(this.currentItem)
      // this.finalChange()
    },
    correctNumberInit (type) {
      if (!this.currentItemNewInit) return
      if (type === 'integer') {
        if (!/^\d$/g.test(this.currentItemNewInit)) {
          let nums = this.currentItemNewInit.match(/\d/g)
          if (nums) this.currentItemNewInit = nums.join('')
          else this.currentItemNewInit = ''
        }
      } else if (type === 'number') {
        if (!/^\d+\.?\d*$/g.test(this.currentItemNewInit)) {
          let nums = this.currentItemNewInit.match(/\d|\./g)
          if (nums) {
            nums = nums.join('')
            let dotIndex = nums.indexOf('.')
            let head = nums.substring(0, dotIndex + 1)
            if (head[0] === '.') head = '0' + head
            let tail = nums.substring(dotIndex + 1, nums.length).replace('.', '')
            this.currentItemNewInit = head + (tail || '0')
          } else {
            this.currentItemNewInit = ''
          }
        }
      }
    },
    purifySchema (schema) {
      let res = {}
      res.type = schema.type

      if (schema.type !== 'object' && schema.type !== 'array') {
        if (this.init) {
          if (types.isNumberType(schema.type)) {
            res.init = schema.init ? schema.init * 1 : null
          } else {
            res.init = schema.init || null
          }
        }
      } else if (schema.type === 'object') {
        res.properties = {}
        for (let key in schema.properties) {
          if (schema.properties[key].newKey) {
            res.properties[schema.properties[key].newKey] = this.purifySchema(schema.properties[key])
          } else {
            res.properties[key] = this.purifySchema(schema.properties[key])
          }
        }
      } else if (schema.type === 'array') {
        res.items = schema.items ? this.purifySchema(schema.items) : {}
      }

      return res
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
      if (this.finalChangeTimer) {
        window.clearTimeout(this.finalChangeTimer)
        this.finalChangeTimer = null
      }
      this.finalChangeTimer = window.setTimeout(_ => {
        // trigger final change
        // console.log('final change', this.localSchema, this.purifySchema(this.localSchema))
        this.$emit('change', this.purifySchema(this.localSchema))
        window.clearTimeout(this.finalChangeTimer)
        this.finalChangeTimer = null
      }, 0)
    },
    removeProperty (key) {
      this.$delete(this.localSchema.properties, key)
      this.handleDeepChange()
      this.$forceUpdate()
    },
    addProperty () {
      if (!this.localSchema.properties) {
        this.localSchema.properties = {}
      }
      this.$set(this.localSchema.properties, 'property_' + propertyCount++, {
        type: this.types[0],
        init: ''
      })
      this.handleDeepChange()
      this.$forceUpdate()
    }
  }
}
</script>
