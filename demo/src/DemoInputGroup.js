import React from 'react'


const DemoInputGroup = ({children, label, message}) => {

  return (
    <div className="valium-example-input-group">
      <label>
        {label}
      </label>
      {children}
      <div className="valium-example-input-feedback">
        {message}
      </div>
    </div>        
  )
}

export default DemoInputGroup
