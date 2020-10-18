import React, {useState, useEffect} from 'react'

const BaseMenu = ({title, items}) => {
  const [showMenuItem, setShowMenuItem]= useState(items.length>0 ? items[0].key : undefined)

  useEffect(() => {
    window.onhashchange = function() { 
      const current= window.location.hash.replace('#', '')
      const avail= items.map((i) => i.key)
      if (avail.indexOf(current)>=0) {
        setShowMenuItem(current)
      }
    }
  })  

  return (

    <nav>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => 
          <li key      = {`menu-${item.key}`}
              className= {item.key==showMenuItem ? 'active' : ''}>
            <a href    = {`#${item.key}`}
              onClick  = {() => setShowMenuItem(item.key)}>
              {item.label}
            </a>
          </li>          
        )}
      </ul>
    </nav>
  )
}

export {BaseMenu}