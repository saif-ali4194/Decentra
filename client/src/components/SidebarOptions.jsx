import React from 'react'
import "../styles/SidebarOptions.css"

function SidebarOptions({active, text, Icon}) {
  return (
    <div className={`sidebarOptions && ${active && "sidebarOption--active"}`} >
        <Icon />
      <h3>{text}</h3>
    </div>
  )
}

export default SidebarOptions
