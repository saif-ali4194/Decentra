import React, { useEffect, useState } from 'react'
import "../styles/FollowBtn.css"
import { _User } from '../Scripts/UserStorage.js';

// { userId, followingIds, onFollow } parameters
function FollowBtn({userAddress, user, onFollow, onUnFollow}) {
    const [isFollowing, setIsFollowing] = useState(false);
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

    useEffect(() => {
      setIsFollowing(loc_user.user_following.includes(userAddress));
    }, [user]);

    function handleFollow() {
        setIsFollowing(true);
        onFollow(user);
    }
    
    function handleUnfollow() {
        setIsFollowing(false);
        onUnFollow(user);
    }

    // function handleClick() {
    //     if (isFollowing) {
    //       handleUnfollow();
    //     } else {
    //       handleFollow();
    //     }
    //   }
    
    return (
        <button id='follow-btn' onClick={isFollowing ? handleUnfollow : handleFollow} className={isFollowing ? 'following' : ''}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
  )
}

export default FollowBtn
