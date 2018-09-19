export default (o) => {
  // Author: yuhaijun
  // email: yuhaijun@rongcapital.cn
  // get data type
  const regStr = /[^, ]+/g
  var type = {}
  'Boolean Number String Function Array Date RegExp Object Error'.replace(regStr, (name) => {
    type['[object ' + name + ']'] = name.toLowerCase()
  })
  return type[Object.prototype.toString.call(o)]
}
