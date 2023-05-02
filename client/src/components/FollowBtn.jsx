import React, { useState } from 'react'
import "../styles/FollowBtn.css"

// { userId, followingIds, onFollow } parameters
function FollowBtn() {
    const [isFollowing, setIsFollowing] = useState(false);
    function handleFollow() {
        setIsFollowing(true);
        // onFollow(userId);
    }
    
    function handleUnfollow() {
        setIsFollowing(false);
        // onFollow(userId);
    }

    function handleClick() {
        if (isFollowing) {
          handleUnfollow();
        } else {
          handleFollow();
        }
      }
    return (
        <button id='follow-btn' onClick={isFollowing ? handleUnfollow : handleFollow} className={isFollowing ? 'following' : ''}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
  )
}

export default FollowBtn
