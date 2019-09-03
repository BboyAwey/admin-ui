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
    // align-items: center;
    font-size: 0;
    & > *:not(:last-child) {
      margin-right: 10px;
      vertical-align: top;
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
    .au-json-schema-custom,
    .au-json-schema-type {
      width: 94px;
      flex-shrink: 0;
    }
  }
  .au-json-schema-icons {
    width: 34px;
    font-size: 14px;
    padding-top: 7px;
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
          v-model="localKey"
          :validators="(_isRoot || _isItem) ? [] : validators.propertyName || []"
          ref="key"/>
      </div>
      <au-select
        :options="typeOptions"
        :disabled="typeOptions.length < 2"
        class="au-json-schema-type"
        :size="formItemSize"
        v-model="localSchema.type"/>
      <!-- <div class="au-json-schema-init"
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
      </div> -->
      <div class="au-json-schema-type"
        v-for="item of customSchemaProperties"
        :key="item.key"
        @click="isReferenceType ? '' : setCustom(item, !_isRoot)">
        <au-input
          :placeholder="item.text"
          :disabled="isReferenceType"
          :readonly="!isReferenceType"
          :value="localSchema[item.key]"
          full-width
          :size="formItemSize"/>
      </div>
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
        :customSchemaProperties="customSchemaProperties"
        :validators="validators"
        v-model="localSchema.properties[key]"
        @deep-change="handleDeepChange"
        @remove="removeProperty"
        @set-custom="setCustom"
        :types="types"
        ref="objectChildren"/>
    </div>
    <div class="au-json-schema-children-container" v-if="
      showChildren &&
      localSchema.type === 'array'">
      <au-json-schema
        :_index="_index ? _index + 1 : 2"
        :_key="'item'"
        :_is-item="true"
        :_is-root="false"
        :customSchemaProperties="customSchemaProperties"
        :validators="validators"
        v-model="localSchema.items"
        @deep-change="handleDeepChange"
        @set-custom="setCustom"
        :types="types"
        ref="arrayChildren"/>
    </div>
    <au-modal
      v-if="_isRoot"
      :title="`设置 ${currentItem.__key || rootName || 'root'} 的${currentItem.__custom.text}`"
      :visible="customModalVisible && _isRoot"
      @hide="cancelSetCustom"
      on-enter="确认"
      :buttons="[
        {
          text: '取消',
          type: 'default',
          handler () {
            customModalVisible = false
          }
        },{
          text: '确认',
          type: 'primary',
          handler: confirmSetCustom
        }
      ]">
      <au-input
        v-if="currentItem.__custom.type ? currentItem.__custom.type !== 'boolean' : currentItem.__localSchema.type !== 'boolean'"
        :type="(currentItem.__custom.type ? currentItem.__custom.type !== 'string' : currentItem.__localSchema.type !== 'string') ? 'text' : 'textarea'"
        width="100%"
        height="100px"
        min-height="100px"
        max-height="100px"
        @change="correctNumber"
        v-model="currentItemNewCustom" full-width
        :validators="validators[currentItem.__custom.key] || []"
        ref="newCustomInput"/>
      <au-radio
        v-if="currentItem.__custom.type ? currentItem.__custom.type === 'boolean' : currentItem.__localSchema.type === 'boolean'"
        :radios="[
          { text: 'true', value: true },
          { text: 'false', value: false }
        ]"
        :validators="validators[currentItem.__custom.key] || []"
        v-model="currentItemNewCustom"
        ref="newCustomInput"/>
    </au-modal>
  </div>
</template>

<script>
import AuInput from 'components/input'
import AuSelect from 'components/select'
import AuRadio from 'components/radio'
import AuIcon from 'components/icon'
import { deepClone } from 'helpers/utils'
import AuModal from 'components/modal'

let types = ['boolean', 'integer', 'number', 'string', 'object', 'array']
types.isNumberType = type => type === 'number' || type === 'integer'
types.isReferenceType = type => type === 'object' || type === 'array'

let propertyCount = 1

export default {
  name: 'au-json-schema',
  components: { AuInput, AuSelect, AuIcon, AuModal, AuRadio },
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
    label: String,
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
    customSchemaProperties: { // only available on literals
      type: Array,
      default () {
        return [
          // {
          //   key: 'sourceMap', // schema key
          //   text: '数据集映射', // schema name
          //   type: 'string', // schema type
          //   default: ''
          // }
        ]
      }
    },
    formItemSize: String,
    validators: {
      type: Object,
      default () { return {} }
    }
  },
  model: {
    prop: 'schema',
    event: 'change'
  },
  data () {
    return {
      localSchema: this._isRoot ? deepClone(this.schema) : (this.schema || {}),
      showChildren: true,
      currentItem: {
        __key: '',
        __custom: {},
        __localSchema: {}
      },
      currentItemNewCustom: '',
      customModalVisible: false,
      localKey: this._key,
      finalChangeTimer: null
    }
  },
  computed: {
    isReferenceType () {
      // console.log(this.localSchema, this.schema, '---')
      return types.isReferenceType(this.localSchema.type)
    },
    typeOptions () {
      return this._isRoot
        ? this.rootTypes.map(t => ({ text: t, value: t }))
        : this.types.map(t => ({ text: t, value: t }))
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
      // console.log('localSchemaChange', v, this._recieveSchema)
      if (this._recieveSchema) {
        this._recieveSchema = false
        return
      }
      // this.clearSchemaCustomKey(this.localSchema)
      this.localSchema.properties = {}
      this.localSchema.items = {}
      if (v === 'object') {
        this.$set(this.localSchema, 'properties', {})
      }
      if (v === 'array') {
        this.$set(this.localSchema, 'items', {
          type: this.types[0]
        })
        // console.log(this.localSchema.items, '++++')
      }
      this.handleDeepChange()
      if (this._isRoot) this.handleCustomSchemaDefaultValue(v)
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
        // console.log('localSchemaChange', v, this._recieveSchema)
        if (this._isRoot) {
          if (JSON.stringify(v) !== JSON.stringify(this.purifySchema(this.localSchema))) {
            this.localSchema = deepClone(v)
            this._recieveSchema = true
          }
        } else {
          this.localSchema = v
          this._recieveSchema = true
        }
        this.handleCustomSchemaDefaultValue(this.localSchema)
      }
    }
  },
  methods: {
    handleCustomSchemaDefaultValue (schema) {
      if (this.customSchemaProperties instanceof Array) {
        if (!types.isReferenceType(schema.type)) {
          this.customSchemaProperties.forEach(p => {
            if (p.default !== undefined && (schema[p.key] === undefined || schema[p.key] === '')) {
              if (p.default instanceof Function) {
                this.$set(schema, p.key, p.default(schema.type))
              } else {
                this.$set(schema, p.key, p.default)
              }
            }
          })
        }
      }
    },
    setCustomSchemaValue (key, value) {
      this.$set(this.localSchema, key, value)
    },
    setCustom (item, source) {
      if (!item.__custom) {
        item = {
          __custom: { ...item },
          __key: this.localKey,
          __set: this.setCustomSchemaValue.bind(this),
          __localSchema: { ...this.localSchema }
        }
      }
      if (this._isRoot) {
        this.customModalVisible = true
        this.currentItem = item
        this.currentItemNewCustom = item.__localSchema[item.__custom.key]
        this.$nextTick(() => {
          this.$refs.newCustomInput && this.$refs.newCustomInput.focus()
        })
      } else {
        this.$emit('set-custom', item)
      }
    },
    cancelSetCustom () {
      this.customModalVisible = false
    },
    confirmSetCustom () {
      this.$refs.newCustomInput.validate().then(res => {
        if (res) {
          this.currentItem.__set(this.currentItem.__custom.key, this.currentItemNewCustom)
          this.customModalVisible = false
          this.currentItemNewCustom = ''
          this.currentItem = {
            __key: '',
            __custom: {},
            __localSchema: {}
          }
          this.handleDeepChange()
        }
      })
    },
    correctNumber () {
      const type = this.currentItem.__custom.type || this.currentItem.__localSchema.type
      if (!this.currentItemNewCustom) return
      if (type === 'integer') {
        if (!/^\d$/g.test(this.currentItemNewCustom)) {
          let nums = this.currentItemNewCustom.match(/\d/g)
          if (nums) this.currentItemNewCustom = nums.join('')
          else this.currentItemNewCustom = ''
        }
      } else if (type === 'number') {
        if (!/^\d+\.?\d*$/g.test(this.currentItemNewCustom)) {
          let nums = this.currentItemNewCustom.match(/\d|\./g)
          if (nums) {
            nums = nums.join('')
            let dotIndex = nums.indexOf('.')
            let head = nums.substring(0, dotIndex + 1)
            if (head[0] === '.') head = '0' + head
            let tail = nums.substring(dotIndex + 1, nums.length).replace('.', '')
            this.currentItemNewCustom = head + (tail || '0')
          } else {
            this.currentItemNewCustom = ''
          }
        }
      }
    },
    clearSchemaCustomKey (schema) {
      for (let item of this.customSchemaProperties) {
        schema[item.key] = ''
      }
    },
    purifySchema (schema) {
      let res = {}
      res.type = schema.type

      if (!types.isReferenceType(schema.type)) {
        if (this.customSchemaProperties && this.customSchemaProperties.length) {
          for (let item of this.customSchemaProperties) {
            if (types.isNumberType(item.type || schema.type)) {
              res[item.key] = schema[item.key] !== undefined ? schema[item.key] * 1 : null
            } else {
              res[item.key] = schema[item.key] !== undefined ? schema[item.key] : null
            }
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
      this.showChildren = true
      this.handleDeepChange()
      this.$forceUpdate()
    },
    validate () {
      return Promise.all([
        this.$refs.key.validate(),
        ...(this.localSchema.type === 'object'
          ? this.$refs.objectChildren.map(c => {
            return new Promise(resolve => {
              c.validate().then(res => resolve(res))
            }).catch(e => {
              console.warn(`Admin UI@json-schema@validate: ${e}`)
              return false
            })
          })
          : [Promise.resolve(true)]),
        this.localSchema.type === 'array'
          ? this.$refs.arrayChildren.validate().catch(e => {
            console.warn(`Admin UI@json-schema@validate: ${e}`)
            return false
          })
          : Promise.resolve(true)
      ]).catch(e => {
        console.warn(`Admin UI@json-schema@validate: ${e}`)
      }).then(res => {
        return !res.includes(false)
      })
    }
  },
  created () {
    // console.log(this.localSchema.type, '---')
    this.handleCustomSchemaDefaultValue(this.localSchema)
  }
}
</script>
