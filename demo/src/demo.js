import React from 'react';
import ReactDOM from 'react-dom'

import VFormCustom from './VFormCustom'

import './demo.scss'

const Demo = () => {
  return (
    <>
      <h1>
        Valium Demo
      </h1>
      <div className="valium-example">
        <VFormCustom/>
      </div>    
    </>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
