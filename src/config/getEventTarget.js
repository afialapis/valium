const getEventTarget = (event) => {
  if (event?.target==undefined) {
    return undefined
  }

  if (event.target.tagName.toLowerCase() == 'option') {
    return event.target.closest('select')
  }

  return event.target
}

export {getEventTarget}