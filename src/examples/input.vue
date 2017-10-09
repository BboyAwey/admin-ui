<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" size="mini"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" size="small"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" size="large"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" :disabled="true"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" icon-position="right"></au-input>
      <au-input v-model="value" placeholder="oh no" label="shit" icon="home" :associations="associations" :validators="validators"></au-input>
      <au-input type="textarea" v-model="value" placeholder="oh no" label="shit"></au-input>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'input-examples',
  data () {
    return {
      value: '',
      associations: [
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc',
        'aaa',
        'bbb',
        'ccc'
      ],
      warnings: [
        'oh shit',
        'damn',
        'ok'
      ],
      validators: [
        {
          validator (v) {
            return v === 'aaa'
          },
          warning: 'oh you should write aaa'
        },
        {
          validator (v) {
            return v !== ''
          },
          warning: 'oh you should write sth'
        }
      ]
    }
  }
}
</script>


