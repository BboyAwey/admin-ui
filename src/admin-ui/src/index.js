import Vue from 'vue'
import './style/reset.css'
import theme from './theme'

import Directives from './directives'

// import all comps
import Button from './components/button'
import Menu from './components/menu'
import Breadcrumb from './components/breadcrumb'
import Icon from './components/icon'
import Collapse from './components/collapse'
import Frame from './components/frame'
import Scroller from './components/scroller'
import Popover from './components/popover'
import Grid from './components/grid'
import Table from './components/table'
import Panel from './components/panel'
import Tree from './components/tree'
import Previewer from './components/previewer'
import Upload from './components/upload'
import Input from './components/input'
import Checkbox from './components/checkbox'
import Switch from './components/switch'
import Radio from './components/radio'
import Select from './components/select'
import Cascading from './components/cascading'
import Datepicker from './components/datepicker'
import Timepicker from './components/timepicker'
import Rangepicker from './components/rangepicker'
import Message from './components/message'
import Modal from './components/modal'
import MessageBox from './components/message-box'
import Paginator from './components/paginator'
import Tabs from './components/tabs'
import Loading from './components/loading'
import Tag from './components/tag'
import Tagfactory from './components/tagfactory'
import JsonSchema from './components/json-schema'

// add all comps into an array
export const components = [
  Button,
  Menu,
  Breadcrumb,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  Table,
  Panel,
  Tree,
  Previewer,
  Upload,
  Input,
  Checkbox,
  Switch,
  Radio,
  Select,
  Cascading,
  Datepicker,
  Timepicker,
  Rangepicker,
  Message,
  MessageBox,
  Modal,
  Paginator,
  Tabs,
  Loading,
  Tag,
  Tagfactory,
  JsonSchema
]

// export comps one by one
export {
  Button,
  Menu,
  Breadcrumb,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  Table,
  Panel,
  Tree,
  Previewer,
  Upload,
  Input,
  Checkbox,
  Switch,
  Radio,
  Select,
  Cascading,
  Datepicker,
  Timepicker,
  Rangepicker,
  Message,
  Modal,
  MessageBox,
  Paginator,
  Tabs,
  Loading,
  Tag,
  Tagfactory,
  JsonSchema
}

// export all comps as an object
const AdminUi = {
  Button,
  Menu,
  Breadcrumb,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  Table,
  Panel,
  Tree,
  Previewer,
  Upload,
  Input,
  Checkbox,
  Switch,
  Radio,
  Select,
  Cascading,
  Datepicker,
  Timepicker,
  Rangepicker,
  Message,
  Modal,
  MessageBox,
  Paginator,
  Tabs,
  Loading,
  Tag,
  Tagfactory,
  JsonSchema
}

AdminUi.install = function (Vue, options = {}) {
  // install all the comps
  components.forEach(component => {
    if (component.name) Vue.component(component.name, component)
  })
  Vue.prototype.$messageBox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading
}

// add direvtives installing function
AdminUi.direvtive = function (Vue) {
  for (let name in Directives) {
    Vue.directive(name, Directives[name])
  }
}

// add theme generator function
AdminUi.theme = theme
// gen default theme
AdminUi.theme()
// set font family for html and body
document.body.style.fontFamily = '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif'
// gen directive
AdminUi.direvtive(Vue)
export default AdminUi
