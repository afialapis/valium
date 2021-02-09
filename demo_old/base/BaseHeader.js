import React from 'react'

const BaseHeader = ({logoSrc}) =>
  <header>
    <div>
      <h1>
        <img className="logo" src={logoSrc}></img>
        demo
      </h1>
    </div>
  </header>

export {BaseHeader}