import React from 'react'

const BaseSidebar = ({options, resume}) =>
  <aside>
    {options.length>0
     ? <>
        <h2>Options</h2>
        <div className="mgbottom">
          {options.map((option, idx) => 
          
            <label key={`valium-demo-sidebar-option-${idx}`}>
              <input type    = "checkbox"
                     name    = {option.name}
                     defaultChecked = {option.value}/>
              {option.label}
            </label>
          )}
        </div>
       </>
      : null
    }
    {resume.length>0
     ?  <>
          <h2>Resume</h2>

          <div className="log">
            {resume.map((s, i) => 
              <div key={`log_line_${i}`}
                  className="log_line" style={{...s.style || {}}}>{s.msg}</div>
            )}
          </div>
        </>
     : null}
  </aside>


export {BaseSidebar}