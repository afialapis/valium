import React from 'react';
import ReactDOM from 'react-dom'

import VFormCustom from './VFormCustom'

import './demo.scss'

const Demo = () => {
  return (
    <div>
      <h1>
        Custom VForm
      </h1>
      <section>
        <VFormCustom/>
      </section>
    </div>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
