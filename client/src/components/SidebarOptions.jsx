import React from 'react'
import "../styles/SidebarOptions.css"
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useState } from 'react';


function SidebarOptions({active, text, Icon, to, handleLinkClick}) {
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  function updateNewNotifications() {
    // ... code to fetch and update the state of hasNewNotifications
    setHasNewNotifications(true); // example update
  }
  return (
   <Link 
    to={to} 
    className={`sidebarOptions && ${active && "sidebarOption--active"}`}
    onClick={() => {
      handleLinkClick(to);
      setHasNewNotifications(false);
    }}
   >
        {/* <Icon /> */}
        {hasNewNotifications && text == "Notifications" ?
          <div className="active-icon">
            <Icon /><div id="circle"></div>
          </div>
        :
        <Icon />
      }
      <h3>{text}</h3>
    </Link>
  )
}

export default SidebarOptions
