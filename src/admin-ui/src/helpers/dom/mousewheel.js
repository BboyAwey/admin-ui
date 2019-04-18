let isFirefox =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1
export default (action, element, handler) => {
  if (element && element[action + 'EventListener']) {
    element[action + 'EventListener'](
      isFirefox
        ? 'DOMMouseScroll'
        : 'mousewheel',
      handler,
      { passive: true }
    )
  }
}
