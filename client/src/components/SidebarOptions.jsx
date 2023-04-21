import React from 'react'
import "../styles/SidebarOptions.css"
import { Link } from 'react-router-dom';


function SidebarOptions({active, text, Icon, to, handleLinkClick}) {
  return (
   <Link 
    to={to} 
    className={`sidebarOptions && ${active && "sidebarOption--active"}`}
    onClick={() => handleLinkClick(to)}
   >
        <Icon />
      <h3>{text}</h3>
    </Link>
  )
}

export default SidebarOptions
