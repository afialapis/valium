import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import DemoForm from './DemoForm'

import './demo.scss'

const Demo = () => {
  const [premature, setPremature]= useState(true)

  return (  
    

    <div className="valium-example">
      <div className="centered">
        <h1>
          Valium Demo
        </h1>
      </div>
      <div className="centered mgbottom">
        <label>
          <input type   = "checkbox"
                 name    = "premature"
                 checked = {premature}
                 onChange= {(ev) => setPremature(ev.target.checked)}/>
          {"Enable Premature Validation"}
        </label>     
      </div>

      <div className="tab-wrap">
        <input type="radio" id="tab1" name="tabGroup1" className="tab" defaultChecked/>
        <label htmlFor="tab1">Controlled components</label>
        
        <input type="radio" id="tab2" name="tabGroup1" className="tab"/>
        <label htmlFor="tab2">Uncontrolled components</label>
        
        <div className="tab__content">
          <DemoForm premature  = {premature}
                    controlled = {true}/>
        </div>
        
        <div className="tab__content">
          <DemoForm premature  = {premature}
                    controlled = {false}/>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
