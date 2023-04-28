import React from 'react'
import "../styles/RecommendationUnit.css"
import DefaultAvatar from "../Data/Images/avatar.jpg"
import { Link } from 'react-router-dom';

function RecommendationUnit({id, img, name}) {
  return (
    <div className='reco-unit'>
      <Link to={`/profile/${id}`} id='unit-link'>
      <img src={img || DefaultAvatar} id='r-user-avatar' />
    <span id="r-user-name">{name}</span>
      </Link>
      <button id='follow'>Follow</button>
    </div>
  )
}

export default RecommendationUnit
