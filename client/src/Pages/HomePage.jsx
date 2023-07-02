import React from 'react'
import "../styles/Pages/HomePage.css"
import Posts from '../components/Posts'
import TweetBox from '../components/TweetBox';
import { useState, useEffect } from 'react';
// import {User} from '../Test Data/CurrentUser';
import { _User } from '../Scripts/UserStorage';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';

function HomePage() {
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
    
    useEffect(() => {
      const fetchTweets = async () => {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.BrowserProvider(connection);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
  
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
          
                }
                tmp_tweets.push(Tweet);
            }
            setTweets(tmp_tweets.reverse());
      }
           fetchTweets();
    }, []);
    
  return (
    <div className='home-page'>
      {/* <h1>Home Page</h1> */}

      <TweetBox profile={loc_user} mode={0}/>
      <Posts tweets={tweets} home={true}/>
    </div>
  )
}

export default HomePage
