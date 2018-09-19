export default (str) => {
  return str === '' || /^\s+$/g.test(str)
}
