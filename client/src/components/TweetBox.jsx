import React from 'react';
import '../styles/TweetBox.css';
import { useState, useRef } from 'react';
import {Avatar,Button} from '@mui/material'
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifIcon from '@mui/icons-material/Gif';
import PollIcon from '@mui/icons-material/Poll';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CloseIcon from '@mui/icons-material/Close';
const TweetBox = ({profile}) => {

    const [image, setImage]=useState(null);
    const imageRef =useRef();

    const onImageChange = (event)=>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
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
                        <textarea name="tweet" id="tweet_text" col="" rows="" placeholder="What's Happening?" onKeyUp={resize}/>
                        {image && (
                            <div className="previewImage">
                                <CloseIcon onClick={()=>{setImage(null)}}/>
                                <img src={image.image} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="bottomfield">
                        <div className="media_icons">
                            <CropOriginalIcon className='_options' onClick={()=>{imageRef.current.click()}}/>
                            <GifIcon className='_options'/>
                            <PollIcon className='_options'/>
                            <SentimentSatisfiedIcon className='_options'/>
                        </div>
                        <div className="tweet_btn">
                            <Button className='tweet-button' style={{
                                backgroundColor: "var(--Brand-color)",
                                color: "var(--D-font-color)",
                                borderRadius:"25px",
                                padding:"5px 10px",
                                fontWeight:"bold"
                            }}>Post</Button>
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