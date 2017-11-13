import Vue from 'vue'
import Hello from '@/admin-ui/src/components/button/index.js'

describe('Button', () => {
  it('should show loading spinner and disabled when set loading to true', (done) => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    vm.loading = true

    Vue.nextTick(() => {
      expect(vm.$el.disabled).to.be.true
      expect(vm.$el.querySelector('.au-button-loading-mask').style.display).to.not.equal('none')
      done()
    })
  })
})
