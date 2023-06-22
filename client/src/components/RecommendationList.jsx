import React, { useEffect } from 'react'
import "../styles/RecommendationList.css"
import RecommendationUnit from './RecommendationUnit'
import { user_list } from '../Test Data/UserList'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';

function RecommendationList() {
  const Location = useLocation();
    const [activeLink, setActiveLink] = useState(Location.pathname);
    const temp = user_list.map((obj)=>{return obj;});
    const handleLinkClick = (to) => {
        setActiveLink(to);
      };
      const [users, setUsers] = useState([]);
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

      const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
      // let RandomUsers = [];
      // const shuffleArray = (array) => {
      //   for (let i = array.length - 1; i > 0; i--) {
      //     const j = Math.floor(Math.random() * (i + 1));
      //     [array[i], array[j]] = [array[j], array[i]];
      //   }
      //   return array;
      // };
      useEffect(() => {
        const fetchUsers = async () => {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.BrowserProvider(connection);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
      
          const fetchedUsers = await contract.getAllUsers();
          let tmp_users = [];
          //Update the state with the fetched users
          for(let i=0; i<fetchedUsers.length; i++) {
            const fetchedUser = fetchedUsers[i];
            if(
              fetchedUser.userAddress == loc_user.active_account ||
              loc_user.user_following.includes(fetchedUser.userAddress))	continue;
  
              const user = {
              id: i,
              userAddress: fetchedUser.userAddress, 
              name: fetchedUser.profile.name,
              avatar: fetchedUser.profile.avatar,
              banner: fetchedUser.profile.banner,
              age: parseInt(fetchedUser.profile.age),
              gender: fetchedUser.profile.gender,
              status: fetchedUser.profile.status,
              country: fetchedUser.profile.country,
              city: fetchedUser.profile.city,
              occupation: fetchedUser.occupation,
              date_joined: fetchedUser.date_joined,
              followers: parseInt(fetchedUser.followers),
              following: parseInt(fetchedUser.following),
            }
            tmp_users.push(user);
          }
          setUsers(tmp_users);
        };
        fetchUsers();
        // RandomUsers = shuffleArray(users);   
        }, []);

        // Following logic
	const handleFollow =  async (user) =>	 {
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			let provider = new ethers.BrowserProvider(connection);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
			await contract.follow(user.userAddress);
			const userDetail = loc_user;
			userDetail.user_following.push(user.userAddress);
			_User.setData(userDetail);
		} catch (e) {
			alert("OOPS!\n "+ e)
		}
	}

	const handleUnFollow =  async (user) =>	 {
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
			_User.setData(userDetail);
		} catch(e) {
			alert("OOPS!\n" + e);
		}
	}

  return (
    <div className='reco-wrapper'>
      <h3 id='heading'>Recommendations</h3>
      <div className="reco-list">
        {/* { temp.sort((a, b) => b.rating - a.rating).slice(0, 5).map(user => (
          <RecommendationUnit  key={user.id} id= {user.id} img= {user.avatar} name={user.name} />
          ))
        } */}
         {
         users.slice(0, 5).map(user => (
          <RecommendationUnit key={user.id} id={user.id} img={user.avatar} name={user.name} user ={user} onFollow={handleFollow} onUnFollow={handleUnFollow}/>
        ))}
      </div>
      <Link 
        to={"/community"} 
        className='communityPageLink' 
        onClick={()=>{handleLinkClick("/community")}}>
            Show More
        </Link>
    </div>
  )
}

export default RecommendationList