const getInputValue = (input) => {

  const inputType= input.type.toLowerCase()

  if (inputType=='checkbox') {
    return input.checked 
  }

  if (inputType=='select-multiple') {
    const options= Array.prototype.slice.call(input.options)
    const value = options 
                  .filter((opt) => opt.selected)
                  .map((opt) => opt.value)
    return value
  }

  if (inputType=='file') {
    try {
      return input.files[0]
    } catch(e) {
      console.error(`Valium: error on input ${input.name} of type file: ${e.message}`)
      console.error(e)
      return undefined
    }
  }

  if (input.value==undefined) {
    return ''
  }
  return input.value
}

export {getInputValue}