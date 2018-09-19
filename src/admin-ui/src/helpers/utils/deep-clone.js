export default (obj) => {
  if (!(obj instanceof Array || obj instanceof Object)) throw new Error('can only deepCopy Array or Object')
  return JSON.parse(JSON.stringify(obj))
}
