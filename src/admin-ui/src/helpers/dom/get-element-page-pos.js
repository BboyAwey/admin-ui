function getLeft (el) {
  let actualLeft = el.offsetLeft
  let current = el.offsetParent

  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }

  return actualLeft
}

function getTop (el) {
  let actualTop = el.offsetTop
  let current = el.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }

  return actualTop
}

export default (el) => {
  return {
    left: getLeft(el),
    top: getTop(el)
  }
}
