import React from 'react'
import "../styles/Pages/ProfilePage.css"
import {user_list} from "../Test Data/UserList"
import { useParams } from 'react-router-dom';
import DefaultAvatar from "../Data/Images/avatar.jpg"
import { useLocation } from 'react-router-dom';
import FollowBtn from '../components/FollowBtn';
import Posts from '../components/Posts';
// import {User} from "../Test Data/CurrentUser"

function ProfilePage({current_user}) {
  const location = useLocation();
  let {userId} =  useParams(); // get id form url
  let user_profile = undefined;
  if (userId) {// if url has id then
    user_profile = user_list.find(user => user.id == userId); //Mylist
    if(!user_profile) { user_profile = location.state.user;}

  }else // use current user
    user_profile = current_user;

  if (!user_profile) // if no users are found
    return <div id="error">Can't find the user you're looking for!</div>; 

  return (
    <div className='profile-page'>
        <div className="top">
          <div 
          id="banner"
          style={{backgroundImage: `url(${user_profile.banner})`}}
          ></div>

          <div className="user-wrapper">
            <div id="avatar" 
              style={{backgroundImage: `url(${user_profile.avatar || DefaultAvatar})`}}
            ></div>
            <h1>{user_profile.name}</h1>
           {/* {!current_user && <button id='p-follow'>Follow</button>} */}
           {!current_user && <FollowBtn />} 
          </div>

          <div className="info">
            <h6>Im a {user_profile.occupation}</h6>
            <h6>{user_profile.age}yrs, {user_profile.gender}, {user_profile.status}</h6>
            <h6>Live in {user_profile.city}, {user_profile.country}</h6>
            <span id='join'>Decentrian since {user_profile.date_joined}</span>
          </div>

          <div className="following">
            <div id="left">Followers: {user_profile.followers}</div>
            <div id="right">Following: {user_profile.following}</div>
          </div>
        </div>
        {/* User Feed */}
        <div className="bottom">
          <Posts user_posts={true}/>
        </div>
    </div>  
  )
}

export default ProfilePage
