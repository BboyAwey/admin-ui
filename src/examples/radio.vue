<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-radio v-model="value" :radios="radios" label="Dance"></au-radio><br>
    <au-radio v-model="value" :radios="radios" label="Dance" disabled></au-radio><br>
    <au-radio v-model="value" :radios="radios" label="Dance" :validators="validators"></au-radio><br>
  </div>
</template>
<script>
  export default {
    name: 'radio-examples',
    data () {
      return {
        value: 'b',
        radios: [
          {
            text: 'Breaking',
            value: 'b'
          },
          {
            text: 'Poppin',
            value: 'p'
          },
          {
            text: 'Locking',
            value: 'l'
          }
        ],
        validators: [
          {
            validator (v) {
              return v === 'b'
            },
            warning: 'Bboy forever!'
          }
        ]
      }
    }
  }
</script>

