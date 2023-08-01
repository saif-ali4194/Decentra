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
      
      const getRandomUsers = (usersArray, count) => {
        const shuffledUsers = usersArray.sort(() => 0.5 - Math.random());
        return shuffledUsers.slice(0, count);
      };

      useEffect(() => {
        const fetchUsers = async () => {
          console.log("Working hard")
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.BrowserProvider(connection);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
      
          // const fetchedUsers = await contract.getAllUsers();
          const fetchedUsers = await contract.getRandomUsers();
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
              age: fetchedUser.profile.age,
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
          const randomUsers = getRandomUsers(tmp_users, 5);
          // setUsers(tmp_users);
          setUsers(randomUsers);
        };
        fetchUsers();
        // RandomUsers = shuffleArray(users);   
        }, [loc_user.user_following]);
// _User.getUserData().user_following, _User.getUserData().user_followed]

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
          <RecommendationUnit key={user.id} id={user.id} img={user.avatar} name={user.name} user ={user} />
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