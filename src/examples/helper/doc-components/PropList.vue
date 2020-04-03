<style lang="scss" scoped>
  .option-list li:before {
    content: '';
    display: inline-block;
    margin-right: 8px;
    margin-top: -3px;
    border-radius: 100%;
    width: 6px;
    height: 6px;
    border-width: 1px;
    border-style: solid;
    vertical-align: baseline;
}
</style>

<template>
  <doc-section title="Props">
    <au-table>
      <thead>
        <tr>
          <th width="130">字段</th>
          <th width="60">必填</th>
          <th width="160">类型</th>
          <th width="160">默认</th>
          <th>可选值 / 字段</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop of resolvedProps" :key="prop.name">
          <td><prop-text :text="prop.name"/></td>
          <td><prop-text :text="prop.required"/></td>
          <td><type-list :types="prop.type ? prop.type.split('>>') : ''"/></td>
          <td><prop-text :text="prop.default"/></td>
          <td>
            <ol class="option-list" v-if="prop.type !== undefined && prop.type!== null && prop.type.toLowerCase() === 'boolean'">
              <li class="au-theme-border-color--base-8">true</li>
              <li class="au-theme-border-color--base-8">false</li>
            </ol>
            <ol class="option-list" v-else-if="prop.options.isList">
              <li class="au-theme-border-color--base-8" v-for="option of prop.options" :key="option.key">
                <doc-code>{{ option.key }}</doc-code>
                :
                <doc-code>{{ option.type }}</doc-code>
                ，
                <prop-text :text="option.description"/>
              </li>
            </ol>
            <prop-text v-else :text="prop.options"/>
          </td>
          <td><prop-text :text="prop.description"/></td>
        </tr>
      </tbody>
    </au-table>
  </doc-section>
</template>

<script>
import PropText from './prop-text'
import DocSection from './section'
import TypeList from './type-list'
import DocCode from './code'

export default {
  name: 'doc-props',
  components: { PropText, DocSection, TypeList, DocCode },
  props: {
    props: {
      type: Array,
      default () { return [] }
    },
    links: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    resolvedProps () {
      const linkRegexp = /%%.+?%%/g
      return this.props.map(prop => {
        let res = {}
        for (let key in prop) {
          let propText = prop[key]
          if (typeof propText !== 'string') {
            if (propText instanceof Array) {
              propText.isList = true
            }
            res[key] = propText
            continue
          }
          if (!propText.trim()) {
            res[key] = ''
            continue
          }

          let links = propText.match(linkRegexp)
          if (!links || !links.length) {
            res[key] = propText
            continue
          }

          let arrayfy = []
          let plainText = propText.split(linkRegexp)

          links = propText.match(linkRegexp).map(linkText => {
            linkText = linkText.replace(/^%%/, '').replace(/%%$/, '')
            return {
              text: linkText,
              link: this.links[linkText]
            }
          })

          while (plainText.length) {
            arrayfy.push(plainText.shift())
            arrayfy.push(links.shift())
          }
          res[key] = arrayfy.filter(item => item)
        }
        return res
      })
    }
  }
}
</script>
