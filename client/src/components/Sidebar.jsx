import React from 'react'
import "../styles/Sidebar.css"
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PushPinIcon from '@mui/icons-material/PushPin';
function Sidebar() {
  return (
    <div className='sidebar'>
      <h1>Decentra</h1>
      <SidebarOptions text = "Home"  Icon={HomeIcon}/>
      <SidebarOptions text = "Profile" Icon={PersonIcon}/>
      <SidebarOptions text = "Explore" Icon={SearchIcon}/>
      <SidebarOptions text = "Notifications" Icon={NotificationsIcon}/>
      <SidebarOptions text = "Community" Icon={PeopleIcon}/>
      <SidebarOptions text = "Save" Icon={PushPinIcon}/>
    </div>
  )
}

export default Sidebar
