import React from 'react';
import '../styles/TweetBox.css';
import { useState, useRef, useEffect } from 'react';
import {Avatar,Button} from '@mui/material'
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifIcon from '@mui/icons-material/Gif';
import PollIcon from '@mui/icons-material/Poll';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CloseIcon from '@mui/icons-material/Close';
import { _User } from '../Scripts/UserStorage';
import config from '../config';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';	
import { Web3Storage } from 'web3.storage';
import { useNotification } from "@web3uikit/core";
import axios from 'axios';

const TweetBox = ({profile,mode,render,renderth,p_id}) => {
    const [disable,setDisable]=useState(false);
    const twImgClose = useRef();
    const [country,setCountry]=useState("");
    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log(latitude +" "+ longitude);
            // Here, you can use a reverse geocoding service to get the country based on the coordinates.
            // This might involve making an API request to a service like OpenStreetMap, Google Maps, etc.
            // For the sake of example, let's assume you're using OpenStreetMap's Nominatim API.
    
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then(response => response.json())
              .then(data => {
                if (data.address && data.address.country) {
                    console.log("ysh"+ data.address.country)
                  setCountry(data.address.country);
                }
              })
              .catch(error => {
                console.error("Error fetching location:", error);
              });
          }, function(error) {
            console.error("Error getting location:", error);
          });
        } else {
          console.error("Geolocation is not available in this browser.");
        }
      }, []);
    // function getCurrentDateAsString() {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //     const day = String(currentDate.getDate()).padStart(2, '0');
        
    //     return `${day}-${month}-${year}`;
    //   }
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
    function getCurrentDateAsString() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const day = currentDate.getDate();
        const daySuffix = getDaySuffix(day);
        
        return `${month} ${day}${daySuffix}, ${year}`;
    }
      
    //   async function storeFile (selectedFile) {
	// 	try {
	// 		const client = new Web3Storage({token: Web3StorageApi});
	// 		const rootCid = await client.put(selectedFile);
	// 		let ipfsUploadedUrl = `https://${rootCid}.ipfs.dweb.link/${selectedFile[0].name}`;
	// 		return ipfsUploadedUrl;
	// 	} catch(e) {
	// 		alert("OOPS :(\n" + e);
	// 	}
		
	// }

    async function storeFile(selectedFile) {
		try {
		  const formData = new FormData();
		  formData.append("images", selectedFile);
	  
		  const response = await axios.post(config.REACT_APP_AXIOS, formData); // http://192.168.18.16:3001/upload
		  // Handle the response from the server after the files are uploaded
		  console.log(response.data.ipfsUrl);
		  return response.data.ipfsUrl;
		} catch (error) {
		  // Handle any error that occurred during the file upload
		  console.error('Error uploading files:', error);
		  return null;
		}
	  }

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

      const Web3StorageApi = config.REACT_APP_WEB3STORAGE_API_KEY;
      const DecentraContractAddress = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;

    const [tweetText,setTweetText]=useState("");
    const [tweetImg,setTweetImg]=useState(null);
    const tweet = async (event) =>{
        // event.stopPropagation();
        setDisable(true);
            const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.BrowserProvider(connection);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
                let imageURL="";
                let hashtags = undefined;
            if(mode == 0){

                    if (tweetImg !== null && tweetImg !== undefined) {
                        imageURL = await storeFile(tweetImg);
                    }

                    const transaction = await contract.addTweet(loc_user.name,"none",getCurrentDateAsString(),tweetText,imageURL);
                    hashtags=hashtag(tweetText);
                    setTweetText("");
                    setImage(null);
                    // twImgClose.current.click();
                    render(true);
                    console.log(transaction);

                         }
            else if(mode == 1){
                    
                if (tweetImg !== null && tweetImg !== undefined) {
                    imageURL = await storeFile(tweetImg);
                }

                const transaction = await contract.addComment(p_id,loc_user.name,"none",getCurrentDateAsString(),tweetText,imageURL,loc_user.avatar);
                hashtags=hashtag(tweetText);
                setTweetText("");
                setImage(null);
                // twImgClose.current.click();
                //renderth(true);
                console.log(transaction);
            }
          
            if(hashtags!== null){
                for(let i=0;i<hashtags.length;i++){
                    const transaction = await contract.addTrend(hashtags[i],country);
                    //console.log(hashtags[i]+" "+country);
                }
            }
        setDisable(false);
    }

    const [image, setImage]=useState(null);
    const imageRef =useRef();

    const onImageChange = (event)=>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setTweetImg(event.target.files[0]);
            setImage({
                image:URL.createObjectURL(img)
            });
        }
    }

    const resize=(e)=>{
        let textarea=document.getElementById("tweet_text");
        textarea.style.height="auto";
        textarea.style.height=`${e.target.scrollHeight}px`;
    }
    const hashtag=(msg)=>{
        const hashtags = msg.match(/#[^\s#]+/g);
        return hashtags;
    }
    return ( 
        <div className="tweetbox">
            <div className="avatar">
                <Avatar src={profile.avatar} style={{
                    width:"2.5em",
                    height:"2.5em"
                }}/>
            </div>
            <div className="datafield">
                <div>
                    <div className="textfield">
                        <textarea value={tweetText} name="tweet" id="tweet_text" col="" rows="" placeholder="What's Happening?" onKeyUp={resize} onChange={
                            (e)=>{
                                setTweetText(e.target.value);
                            }
                        }/>
                        {image && (
                            <div className="previewImage">
                                <CloseIcon ref={twImgClose} onClick={()=>{
                                    setImage(null);
                                    setTweetImg(null);
                                    }}/>
                                <img src={image.image} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="bottomfield">
                        <div className="media_icons">
                            <CropOriginalIcon className='_options' onClick={()=>{imageRef.current.click()}}/>
                            {/* <GifIcon className='_options'/>
                            <PollIcon className='_options'/> */}
                            {/* <SentimentSatisfiedIcon className='_options'/> */}
                        </div>
                        <div className="tweet_btn">
                            <Button disabled={disable} onMouseDown={tweet} >Post</Button>
                            <div style={{
                                display:"none"
                            }}>
                                <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default TweetBox;