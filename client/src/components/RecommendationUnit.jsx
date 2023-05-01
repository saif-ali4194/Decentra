import React from 'react'
import "../styles/RecommendationUnit.css"
import DefaultAvatar from "../Data/Images/avatar.jpg"
import { Link } from 'react-router-dom';
import {User} from "../Test Data/CurrentUser"
import  { useState } from 'react';


function RecommendationUnit({id, img, name}) {
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState(User);
  function handleFollow(id) {
    // console.log(id);
    console.log("Before: "+ user.user_following)
    // User.user_following.push(id);
    setFollowing((prevFollowing) => [...prevFollowing, id]);
    setUser(prevUser => ({...prevUser, user_following: [...prevUser.user_following, id]}));
    console.log("After: "+user.user_following)
  }
  return (
    <div className='reco-unit'>
      <Link to={`/profile/${id}`} id='unit-link'>
      <img src={img || DefaultAvatar} id='r-user-avatar' />
    <span id="r-user-name">{name}</span>
      </Link>
      <button id='follow' onClick={() => handleFollow(id)}>Follow</button>
    </div>
  )
}

export default RecommendationUnit
