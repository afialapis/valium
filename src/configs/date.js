export default {
  //dbg_assertType : 'date',
  premature_check: false,
  
  parseForCompare: (value) => {
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
      console.error(`Valium: VInputDate cannot convert value ${value} to Date`)
      return undefined
    }
    const tdate= `${vdate.getFullYear()}/${vdate.getMonth()+1}/${vdate.getDate()}`
    return tdate
  }
}