<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-timepicker v-model="value" label="Please pick a time"></au-timepicker><br>
    <au-timepicker v-model="value" label="Please pick a time" :seconds="false"></au-timepicker><br>
    <au-timepicker v-model="value" label="Please pick a time" :warnings="['oh no']"></au-timepicker><br>
    <au-timepicker v-model="value" label="Please pick a time" disabled></au-timepicker><br>
  </div>
</template>
<script>
  export default {
    name: 'timepicker-examples',
    data () {
      return {
        value: ''
      }
    }
  }
</script>

