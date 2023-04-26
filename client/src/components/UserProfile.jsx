import React from 'react'
import "../styles/UserProfile.css"
// import { Avatar } from '@mui/material'
import DefaultAvatar from "../Data/Images/avatar.jpg"
import {User} from "../Test Data/CurrentUser"

function UserProfile() {
  return (
    <div className='user-profile'>
      {/* <Avatar /> */}
      <img src={User.avatar || DefaultAvatar} id="user-avatar" />
      <div id="user-info">
      <h3 id="user-name">{User.name}</h3>
      <h6 id="user-occupation">{User.occupation}</h6>
      <span id="user-location">{User.city}, {User.country}</span>
      </div>
    </div>
  )
}

export default UserProfile
