import React, { useEffect, useState } from 'react'
import "../styles/FollowBtn.css"
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';

// { userId, followingIds, onFollow } parameters
function FollowBtn({userAddress, user}) {
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

    const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
    const handleFollow =  async (user) =>	 {
      console.log("follow btn follow");
      setIsFollowing(true);
      const noti = {
        txt: `${loc_user.name} has started following you 😃!`,
        img: loc_user.avatar
      }
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
        await contract.follow(user.userAddress);
        const userDetail = loc_user;
        userDetail.user_following.push(user.userAddress);
        userDetail.following++;
        _User.setData(userDetail);
        await contract.addNotification(user.userAddress, noti.txt, noti.img);
      } catch (e) {
        alert("OOPS!\n "+ e)
      }
    }
  
    const handleUnFollow =  async (user) =>	 {
      console.log("follow btn unfollow");
      setIsFollowing(false);
      const noti = {
        txt: `${loc_user.name} has UnFollowed you 😢!`,
        img: loc_user.avatar
      }
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
  
        await contract.unfollow(user.userAddress);
  
        const updatedFollowing = loc_user.user_following.filter(address => address !== user.userAddress);
        const userDetail = loc_user;
        userDetail.user_following = updatedFollowing;
        userDetail.following--;
        _User.setData(userDetail);
  
        await contract.addNotification(user.userAddress, noti.txt, noti.img);
      } catch(e) {
        alert("OOPS!\n" + e);
      }
    }
    return (
        <button id='follow-btn' onClick={()=> (isFollowing ? handleUnFollow (user) : handleFollow(user))} className={isFollowing ? 'following' : ''}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
  )
}

export default FollowBtn
