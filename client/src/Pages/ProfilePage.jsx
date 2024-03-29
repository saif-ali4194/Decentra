import React, { useEffect, useState } from 'react'
import "../styles/Pages/ProfilePage.css"
import { user_list } from "../Test Data/UserList"
import { useParams } from 'react-router-dom';
import DefaultAvatar from "../Data/Images/avatar.jpg"
import { useLocation } from 'react-router-dom';
import FollowBtn from '../components/FollowBtn';
import Posts from '../components/Posts';
// import {User} from "../Test Data/CurrentUser"
import { ethers, formatEther } from 'ethers';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import config from '../config.js';
import { calculateAge } from '../Scripts/ageCalculator';


function ProfilePage({current_user}) {

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
    
    const [tweets, setTweets] = useState([]);
    const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
    const DecentraContractAddress2 = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;
    useEffect(() => {
      const fetchTweets = async () => {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.BrowserProvider(connection);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(DecentraContractAddress2, DecentraModulesAbi.abi, signer);
  
          const tmpTweets = await contract.getAllTweets();
          let tmp_tweets = [];
            //Update the state with the fetched users
            for(let i=0; i<tmpTweets.length; i++) {
                const tweet = tmpTweets[i];
                
                const Tweet = {
                   tweetOwner:tweet.tweetOwner,
                   t_id:tweet.t_id,  
                   username:tweet.username,
                   userAt:tweet.userAt,
                   date:tweet.date,
                   text:tweet.text,
                   cId:tweet.cId,
                   liked:tweet.liked,
                   likes:tweet.likes,
                   dislikes:tweet.dislikes
          
                }
                tmp_tweets.push(Tweet);
            }
            setTweets(tmp_tweets.reverse());
      }
           fetchTweets();
    }, []);

  const location = useLocation();
  let {userId} =  useParams(); // get id form url
  const [accountBalance,setAccountBalance] = useState(0);
  let user_profile = undefined;

if(userId == undefined)
	user_profile = current_user;
else 
	user_profile = location.state.user;

  const [prof_followers, set_prof_followers] = useState(user_profile.followers);
  const [prof_following, set_prof_following] = useState(user_profile.following);
  //   User wallet Balance Logic
	async function getAccountBalance(){
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		let balance = await provider.getBalance(current_user.active_account);
		const balanceInEther = ethers.formatEther(balance);
		const formattedBalance = parseFloat(balanceInEther).toFixed(2);
		setAccountBalance(formattedBalance);
  	}

  // getting followers 
  async function getFollowers() {
    const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);

    const tmp_user = await contract.getUser(user_profile.active_account);
    set_prof_followers(tmp_user.followers);
    set_prof_following(tmp_user.following);
  }

  useEffect(() => {
    if(user_profile == current_user) {
      console.log("here")
      getAccountBalance();
      getFollowers();
    }
  }, [userId]);


	
  if(!user_profile) // if no users are found
    return <div id="error">Can't find the user you're looking for!</div>;

  
  return (
    <div className='profile-page'>
        <div className="top">
          <div 
          id="banner"
          style={{backgroundImage: `url(${user_profile.banner})`}}
          ></div>

          <div className="user-wrapper">
            <div id="avatar" 
              style={{backgroundImage: `url(${user_profile.avatar || DefaultAvatar})`}}
            ></div>
            <h1>{user_profile.name}</h1>
           {/* {!current_user && <button id='p-follow'>Follow</button>} */}
           {!current_user ? (<FollowBtn key={user_profile.id} userAddress={user_profile.userAddress} user={user_profile} />)
            : (
              <h6 id="loc_user_balance"><span>Balance: </span>{accountBalance}ETH</h6>
            )
          } 
          </div>

          <div className="info">
            {console.log(user_profile.age)}
            <h6>Im a/an {user_profile.occupation}</h6>
            <h6>{calculateAge(user_profile.age)}yrs, {user_profile.gender}, {user_profile.status}</h6>
            <h6>Lives in {user_profile.city}, {user_profile.country}</h6>
            <span id='join'>Decentrian since {user_profile.date_joined}</span>
          </div>

          <div className="following">
            <div id="left">Followers: {user_profile.followers}</div>
            <div id="right">Following: {user_profile.following}</div>
          </div>
        </div>
        {/* User Feed */}
        <div className="bottom">
          {/* <Posts user_posts={userId} pathname={location.pathname}/> */}
          <Posts user_posts={user_profile} tweets={tweets} pathname={location.pathname}/>
        </div>
    </div>  
  )
}

export default ProfilePage
