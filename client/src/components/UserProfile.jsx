import React from 'react'
import "../styles/UserProfile.css"
// import { Avatar } from '@mui/material'
import DefaultAvatar from "../Data/Images/avatar.jpg"

function UserProfile() {
  return (
    <div className='user-profile'>
      {/* <Avatar /> */}
      <img src={DefaultAvatar} id="user-avatar" />
      <div id="user-info">
      <h3 id="user-name">Hamza Azhar</h3>
      <h4 id="user-occupation">Software engineer</h4>
      <span id="user-location">Islamabad, Pakistan</span>
      </div>
    </div>
  )
}

export default UserProfile
