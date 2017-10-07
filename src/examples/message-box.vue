<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-button @click="alert">Alert Me</au-button>
    <au-button @click="confirm">Confirm Me</au-button>
    <au-button @click="prompt">Prompt Me</au-button>
  </div>
</template>
<script>
  export default {
    name: 'message-box-examles',
    methods: {
      alert () {
        this.$alert({
          message: 'oh yes~',
          confirm () {
            console.log('confirm')
          }
        })
      },
      confirm () {
        this.$confirm({
          message: 'you feel good?'
        })
      },
      prompt () {
        this.$prompt({
          message: 'How\'d you feel?',
          reset: true,
          validators: [
            {
              validator (v) {
                return v !== ''
              },
              warning: 'Write Sth!'
            }
          ],
          confirm () {
            console.log('shit!')
          }
        })
      }
    }
  }
</script>


