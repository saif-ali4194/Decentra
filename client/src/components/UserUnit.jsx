import React from 'react'
import "../styles/UserUnit.css"
import { Link } from 'react-router-dom';
import FollowBtn from './FollowBtn';

function UserUnit({u_id, u_avatar, u_name, user, onFollow, onUnFollow}) {
  return (
    <div className='user-unit'>
    <Link to={`/profile/${u_id}`} state={{user}} id='unit-link'>
      <img src={u_avatar} className="u_avatar" />
      <h4 className='u-name'>{u_name}</h4>
      </Link>
    {/* <button className='u-follow'>Follow</button> */}
    <FollowBtn key={user.id} userAddress={user.userAddress} user={user} onFollow={onFollow} onUnFollow={onUnFollow}/>
    </div>
  )
}

export default UserUnit
