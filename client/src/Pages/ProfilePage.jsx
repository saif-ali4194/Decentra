import React from 'react'
import "../styles/Pages/ProfilePage.css"
import BannerImg from "../Data/Images/banner.png"
import Avatar from "../Data/Images/avatarProfile.png"
import {User} from "../Test Data/CurrentUser"

function ProfilePage() {
  return (
    <div className='profile-page'>
        {/* userInfo */}
        <div className="top">
          <div 
          id="banner"
          style={{backgroundImage: `url(${User.banner})`}}
          ></div>

          <div className="user-wrapper">
            <div id="avatar" 
              style={{backgroundImage: `url(${User.avatar})`}}
            ></div>
            <h1>{User.name}</h1>
          </div>

          <div className="info">
            <h6>Im a {User.occupation}</h6>
            <h6>{User.age}yrs, {User.gender}, {User.status}</h6>
            <h6>Live in {User.city}, {User.country}</h6>
            <span id='join'>Decentrian since {User.date_joined}</span>
          </div>

          <div className="following">
            <div id="left">Followers: {User.followers}</div>
            <div id="right">Following: {User.following}</div>
          </div>
        </div>
      {/* User Feed */}
      <div className="bottom"></div>
    </div>
  )
}

export default ProfilePage
