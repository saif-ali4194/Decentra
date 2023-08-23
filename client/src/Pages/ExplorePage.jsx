import React from 'react'
import "../styles/Pages/ExplorePage.css"
import Search from '../components/Search';
import Trending from '../components/Trending';
import Posts from '../components/Posts';
import { _User } from '../Scripts/UserStorage';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
function ExplorePage() {

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
    const DecentraContractAddress = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;
    
    useEffect(() => {
      const fetchTweets = async () => {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.BrowserProvider(connection);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
  
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

  return (
    <div className='explore-page'>
      <Search/>
      <Trending/>
      <div className='gap-border'></div>
      <Posts tweets={tweets} pathname={"/explore"}/>
      
    </div>
  )
}

export default ExplorePage
