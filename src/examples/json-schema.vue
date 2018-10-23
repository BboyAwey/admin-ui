<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <au-json-schema
        v-model="jsonSchema"
        init
        label="JSON Schema 编辑器"
        :root-types="['object']"
        :types="['object', 'array', 'string', 'number', 'boolean']"/>
    </au-panel>
  </div>
</template>

<script>
export default {
  name: 'json-schema',
  data () {
    return {
      jsonSchema: {
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
        }
      }
    }
  },
  methods: {
    alert (v) {
      console.log(v, 'YEAH!')
    }
  }
}
</script>
