import React from 'react'
import "../styles/Sidebar.css"
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
// import PushPinIcon from '@mui/icons-material/PushPin';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import UserProfile from "./UserProfile"
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from "../Data/Images/logo.png"

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };

  return (
    <div className='sidebar'>
      <div className="decentra">
        <img src={Logo} alt="" />
        <h1>Decentra</h1>
      </div>
      <UserProfile />
      <SidebarOptions 
        text = "Home"  
        Icon={HomeIcon} 
        to="/"
        active={activeLink === '/'}
        handleLinkClick={handleLinkClick}
        />
      <SidebarOptions 
      text = "Profile" 
      Icon={PersonIcon} 
      to="/profile"
      active={activeLink === '/profile'}
        handleLinkClick={handleLinkClick}
      />
      <SidebarOptions 
      text = "Explore" 
      Icon={SearchIcon} 
      to="/explore"
      active={activeLink === '/explore'}
        handleLinkClick={handleLinkClick}
      />
      <SidebarOptions 
      text = "Notifications" 
      Icon={NotificationsIcon} 
      to="/notifications"
      active={activeLink === '/notification'}
        handleLinkClick={handleLinkClick}
      />
      <SidebarOptions 
      text = "Community" 
      Icon={PeopleIcon} 
      to="/community"
      active={activeLink === '/community'}
        handleLinkClick={handleLinkClick}
      />
      <SidebarOptions 
      text = "Settings" 
      Icon={SettingsIcon} 
      to="/settings"
      active={activeLink === '/settings'}
        handleLinkClick={handleLinkClick}
      />
      <SidebarOptions 
      text = "Logout" 
      Icon={LogoutIcon}
      active={activeLink === '/logout'}
        handleLinkClick={handleLinkClick}
      />
    </div>
  )
}

export default Sidebar
