<style lang="scss">

</style>
<template>
  <div class="page">
    <au-select label="请选择舞种" v-model="value" :options="options"></au-select>
    <au-select label="请选择舞种" v-model="value" :options="options" disabled></au-select>
    <au-select label="请选择舞种" v-model="value" :options="options" size="mini"></au-select>
    <au-select label="请选择舞种" v-model="values" :options="options" :multiple="true" :validators="validators"></au-select>
    <au-select label="请选择舞种" v-model="values" :options="options" :multiple="true" :warnings="null"></au-select>
  </div>
</template>
<script>
  export default {
    name: 'select-examples',
    data () {
      return {
        value: '',
        values: [],
        options: [
          {
            value: 'b',
            text: 'Breaking'
          },
          {
            value: 'p',
            text: 'Poppin'
          },
          {
            value: 'l',
            text: 'Locking'
          }
        ],
        validators: [
          {
            validator (v) {
              return v.includes('b')
            },
            warning: 'Bboy forever'
          }
        ]
      }
    }
  }
</script>


