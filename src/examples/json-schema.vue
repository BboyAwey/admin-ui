<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <au-json-schema @change="alert" init/>
    </au-panel>
  </div>
</template>

<script>
export default {
  name: 'json-schema',
  data () {
    return {}
  },
  methods: {
    alert (v) {
      console.log(v, 'YEAH!')
    }
  }
}
</script>
