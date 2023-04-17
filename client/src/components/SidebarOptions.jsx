import React from 'react'
import "../styles/SidebarOptions.css"

function SidebarOptions({text, Icon}) {
  return (
    <div className='sidebarOptions' >
        <Icon />
      <h3>{text}</h3>
    </div>
  )
}

export default SidebarOptions
