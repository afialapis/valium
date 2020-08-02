import { useState } from 'react'

const useValue = (initialValue, controlled) => {

  const [value, setValue]= useState(initialValue)

  const valueProps= controlled
    ? {value  : value,
      onChange: (event) => setValue(event.target.value)
      }
    : {
      defaultValue: value
      }
  
  return valueProps
}

export default useValue
