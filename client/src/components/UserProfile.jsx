import React, { useEffect, useState } from 'react'
import "../styles/UserProfile.css"
// import { Avatar } from '@mui/material'
import DefaultAvatar from "../Data/Images/avatar.jpg"
// import {User} from "../Test Data/CurrentUser" {this is test data for users}
import { _User } from '../Scripts/UserStorage';

function UserProfile() {
  const [loc_user, setLocUser] = useState(_User.getUserData());
  useEffect(() => {
    const handleLocalStorageUpdated = () => {
      setLocUser(_User.getUserData());
    };

    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated);

    return () => {
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated);
    };
  }, []);

  return (
    <div className='user-profile'>
    {/* <Avatar /> */}
    <img src={loc_user.avatar || DefaultAvatar} id="user-avatar" />
    <div id="user-info">
      <h3 id="user-name">{loc_user.name}</h3>
      <h6 id="user-occupation">{loc_user.occupation}</h6>
      <span id="user-location">{loc_user.city}, {loc_user.country}</span>
    </div>
  </div>
  )
}

export default UserProfile
