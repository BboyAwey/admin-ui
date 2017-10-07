<style lang="sass" scoped>

</style>
<template>
  <div class="page">
    <au-panel>
      <au-switch v-model="value"></au-switch>
      <au-switch v-model="value" color="primary" onText="ON" offText="OFF"></au-switch>
      <au-switch v-model="value" color="warning" onText="ON" offText="OFF"></au-switch>
      <au-switch v-model="value" color="danger" onText="ON" offText="OFF"></au-switch>
      <au-switch v-model="value" color="info"></au-switch>
      <au-switch v-model="value" disabled></au-switch>
      <au-switch v-model="value" :warnings="['shit']"></au-switch>
      {{ value ? 'ON' : 'OFF' }}
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'switch-examples',
    data () {
      return {
        value: true
      }
    }
  }
</script>

