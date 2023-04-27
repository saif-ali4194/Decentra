import React from 'react'
import "../styles/RecommendationUnit.css"
import DefaultAvatar from "../Data/Images/avatar.jpg"

function RecommendationUnit({img, name}) {
  return (
    <div className='reco-unit'>
    <img src={img || DefaultAvatar} id='r-user-avatar' />
    <span id="r-user-name">{name}</span>
    <button id='follow'>Follow</button>
    </div>
  )
}

export default RecommendationUnit
