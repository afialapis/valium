const parseForCompare = (inputType, value) => {
  if (value===undefined) {
    return undefined
  }

  inputType= inputType.toLowerCase()

  if (inputType==='text' || inputType==='select') {
    return value.toString()
  }
  

  if (inputType==='number') {
    if (value==='' || isNaN(value)) {
      return undefined
    }
    return parseFloat(value)    
  }

  if (inputType==='checkbox') {
    if (value===true || value === 'true' || value === 1 || value === '1') {
      return true
    }
    return false    
  }

  /*
  if (inputType==='color') {
    if (value===undefined || value==='') {
      return undefined
    }
    return colorToHex(value)    
  }

  if (inputType==='date') {
    if (value==='' || value === undefined) {
      return undefined
    }
    let vdate= undefined
    if (value instanceof Date) {
      vdate= value
    }
    if (typeof value === 'string') {
      vdate= new Date(value)
    }
    if (typeof value === 'number') {
      vdate= new Date(value * 1000)
    }    
    try {
      vdate= new Date(value)
    } catch(e) {
      console.error(`Valium: input of type date cannot convert value ${value} to Date`)
      return undefined
    }
    const tdate= `${vdate.getFullYear()}/${vdate.getMonth()+1}/${vdate.getDate()}`
    return tdate    
  }
  */

  if (inputType==='select-multiple') {
    try {
      return value.sort().join(',')
    } catch(e) {}
    return ''    
  }

  return value.toString()
}

export {parseForCompare}