<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel>
      <au-checkbox v-model="value" label="female" text="jazz"></au-checkbox><br>
      <au-checkbox v-model="values" label="male" :checkboxes="checkboxes" disabled></au-checkbox><br>
      <au-checkbox v-model="values" label="male" :checkboxes="checkboxes" :validators="validators"></au-checkbox><br>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'checkbox-examples',
    data () {
      return {
        value: false,
        values: ['l'],
        checkboxes: [
          {
            text: 'breaking',
            value: 'b'
          },
          {
            text: 'poppin',
            value: 'p'
          },
          {
            text: 'locking',
            value: 'l'
          }
        ],
        validators: [
          {
            validator (v) {
              return v.includes('b')
            },
            warning: 'breaking forever'
          },
          {
            validator (v) {
              return !!v.length
            },
            warning: 'you need dance'
          }
        ]
      }
    }
  }
</script>


