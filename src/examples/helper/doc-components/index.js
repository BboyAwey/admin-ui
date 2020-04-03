import Vue from 'vue'
// import paragraph from './paragraph'
// import link from './link'
// import cite from './cite'
// import example from './example'
// import section from './section'
// import props from './props'

import Description from './Description'
import DocProps from './PropList.vue'

const docComponents = [
  // paragraph,
  // link,
  // cite,
  // example,
  // section,
  // props,

  Description,
  DocProps
]

for (let item of docComponents) {
  Vue.component(item.name, item)
}
