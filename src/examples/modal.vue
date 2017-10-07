<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-button @click="display = !display">Modal Me!</au-button>
    <au-modal :display="display" title="Modal Me" @hide="display = false" :buttons="buttons">
     <p>Cupidatat ex in non veniam nulla esse dolore consequat officia aliquip ut quis. Occaecat anim commodo do in et. In ex nostrud incididunt cupidatat aute irure irure ullamco laborum voluptate adipisicing non. Veniam nulla Lorem veniam ut aliqua ullamco sint dolor ut quis ad consequat. Cillum ipsum duis veniam enim esse.</p>
     <p>Cupidatat ex in non veniam nulla esse dolore consequat officia aliquip ut quis. Occaecat anim commodo do in et. In ex nostrud incididunt cupidatat aute irure irure ullamco laborum voluptate adipisicing non. Veniam nulla Lorem veniam ut aliqua ullamco sint dolor ut quis ad consequat. Cillum ipsum duis veniam enim esse.</p>
     <p>Cupidatat ex in non veniam nulla esse dolore consequat officia aliquip ut quis. Occaecat anim commodo do in et. In ex nostrud incididunt cupidatat aute irure irure ullamco laborum voluptate adipisicing non. Veniam nulla Lorem veniam ut aliqua ullamco sint dolor ut quis ad consequat. Cillum ipsum duis veniam enim esse.</p>
     <p>Cupidatat ex in non veniam nulla esse dolore consequat officia aliquip ut quis. Occaecat anim commodo do in et. In ex nostrud incididunt cupidatat aute irure irure ullamco laborum voluptate adipisicing non. Veniam nulla Lorem veniam ut aliqua ullamco sint dolor ut quis ad consequat. Cillum ipsum duis veniam enim esse.</p>
    </au-modal>
  </div>
</template>
<script>
  export default {
    name: 'modal-examples',
    data () {
      return {
        display: false,
        buttons: [
          {
            text: 'test-1',
            size: 'small',
            type: 'warning',
            handler () {
              console.log(9)
            }
          },
          {
            text: 'test-1',
            size: 'large',
            disabled: true,
            handler () {
              console.log(9)
            }
          },
          {
            text: 'customer-cancel',
            type: 'danger',
            size: 'mini',
            handler () {
              this.display = false
            }
          }
        ]
      }
    }
  }
</script>

