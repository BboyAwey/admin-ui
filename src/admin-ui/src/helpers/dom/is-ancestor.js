export default function isAncestor (el, ancestor) {
  let parent = el
  if (parent === ancestor) return true
  else if (el.parentNode) return isAncestor(el.parentNode, ancestor)
  else return false
}
