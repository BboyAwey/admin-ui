<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel style="height: 600px;">
      <au-datepicker v-model="value" label="Please pick a date"></au-datepicker> <br>
      <au-datepicker v-model="value" label="Please pick a date" :warnings="['oh no']"></au-datepicker> <br>
      <au-datepicker v-model="value"></au-datepicker> <br>
      <au-datepicker v-model="value" size="mini"></au-datepicker> <br>
      <au-datepicker v-model="value" disabled label="禁用的日期选择器"></au-datepicker> <br>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'datepicker-examples',
    data () {
      return {
        value: ''
      }
    }
  }
</script>


