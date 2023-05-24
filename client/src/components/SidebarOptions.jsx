import React from 'react'
import "../styles/SidebarOptions.css"
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { _Auth } from '../Scripts/UserStorage';

function SidebarOptions({active, text, Icon, to, handleLinkClick, setIsAuthenticated}) {
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  const disconnectWallet = async () => {
    if(text === "Logout") {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        web3Modal.clearCachedProvider();
        provider = null;
        setIsAuthenticated(false);
        console.log('Wallet disconnected');
      } catch (error) {
        console.log('Error disconnecting wallet:', error);
      }
    }
  };

  return (
   <Link 
    to={to} 
    className={`sidebarOptions && ${active && "sidebarOption--active"}`}
    onClick={() => {
      handleLinkClick(to);
      setHasNewNotifications(false);
      disconnectWallet();
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
