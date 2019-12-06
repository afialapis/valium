import React from 'react';
import ReactDOM from 'react-dom'

import VFormCustom from './VFormCustom'

import './demo.scss'

const Demo = () => {
  return (  
    <VFormCustom/>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
