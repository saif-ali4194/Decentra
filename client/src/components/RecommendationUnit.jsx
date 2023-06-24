import React from 'react'
import "../styles/RecommendationUnit.css"
import DefaultAvatar from "../Data/Images/avatar.jpg"
import { Link } from 'react-router-dom';
import {User} from "../Test Data/CurrentUser"
import  { useState } from 'react';
import FollowBtn from './FollowBtn';


function RecommendationUnit({id, img, name, user}) {
  // const [following, setFollowing] = useState([]);
  // const [user, setUser] = useState(User);
  // function handleFollow(id) {
  //   if (user.user_following.includes(id)) {
  //     // User is already following the recommendation user
  //     setFollowing((prevFollowing) => prevFollowing.filter((userId) => userId !== id));
  //     setUser((prevUser) => ({...prevUser, user_following: prevUser.user_following.filter((userId) => userId !== id)}));
  //   } else {
  //     // User is not following the recommendation user
  //     setFollowing((prevFollowing) => [...prevFollowing, id]);
  //     setUser((prevUser) => ({...prevUser, user_following: [...prevUser.user_following, id]}));
  //   }
  // }
  // const isFollowing = user.user_following.includes(id);
  return (
    <div className='reco-unit'>
      <Link to={`/profile/${id}`} id='unit-link'>
      <img src={img || DefaultAvatar} id='r-user-avatar' />
    <span id="r-user-name">{name}</span>
      </Link>
      <FollowBtn key={user.id} userAddress={user.userAddress} user={user} />
    </div>
  )
}

export default RecommendationUnit
