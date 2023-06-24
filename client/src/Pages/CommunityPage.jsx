import React, { useEffect } from 'react'
import "../styles/Pages/CommunityPage.css"
import { useState } from 'react';
import UserUnit from '../components/UserUnit';
// import fakeUsers from "../Test Data/fake_users"
// import {User} from '../Test Data/CurrentUser'
// import { user_list } from '../Test Data/UserList';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';

function CommunityPage() {
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
  const [activeSection, setActiveSection] = useState('com-followers');
  const [numUsers, setNumUsers] = useState(10);
  const [users, setUsers] = useState([]);
  const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;


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
			if(fetchedUser.userAddress == loc_user.active_account)	continue;
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
		 
  }, [activeSection]);

  const handleClick = (section) => {
	setActiveSection(section);
  }

  return (
	<div className='community-page'>
	  <div className="com_header">
		<div 
		  className={`com-followers ${activeSection === 'com-followers' ? 'active-section' : ''}`} onClick={() => handleClick('com-followers')}>Followers</div>
		<div className={`com-following ${activeSection === 'com-following' ? 'active-section' : ''}`} onClick={() => handleClick('com-following')}>Following</div>
		<div className={`com-follow ${activeSection === 'com-follow' ? 'active-section' : ''}`} onClick={() => handleClick('com-follow')}>Follow</div>
	  </div>

	  {activeSection === "com-followers" ? (
		users
		.filter(user => loc_user.user_followed.includes(user.userAddress))
		.map(user => (
			<UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user} />
		))
	  ) : activeSection === "com-following" ? (
		users
		  .filter(user => loc_user.user_following.includes(user.userAddress))
		  .map(user => (
			  <UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user} />
		  ))
	  ) : <div>
			{
			  users.map((user) => (
				<UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user} />
				))
			}
		  {/* <p id='com-show-more' onClick={handleShowMore}>Show More</p> */}
		</div> 
	  }
	</div>
  )
}

export default CommunityPage
