export default (obj) => {
  if (!(obj instanceof Array || obj instanceof Object)) {
    console.warn('Admin UI@deep-clone@ can only deepCopy array or plain object')
    return {}
  } else return JSON.parse(JSON.stringify(obj))
}
