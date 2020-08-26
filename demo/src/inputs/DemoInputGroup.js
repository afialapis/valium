import React from 'react'


const DemoInputGroup = ({children, label, message, description}) => {

  return (
    <div className="valium-example-input-group">

      <div className="valium-example-input-description">
        <label>
          {label}
        </label>
        <div className="valium-example-input-description-text">
          {description}
        </div>
      </div>

      {children}
      <div className="valium-example-input-feedback">
        {message}
      </div>
    </div>        
  )
}

export default DemoInputGroup



