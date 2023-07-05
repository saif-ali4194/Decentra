import React from 'react';
import '../styles/ThreadMainPost.css';
import {Avatar,IconButton} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { _User } from '../Scripts/UserStorage';
import {useState, useEffect} from 'react';
const ThreadMainPost = ({id,tweet,avatar}) => {
    // const postComment =()=>{
        
    // }
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

    return ( 
        <div className="threadMainPost">

            <div className="threadMainTop">
                <div className='threadMainTop-left'>
                    <div className="avatar">
                        <Avatar src={avatar}/>
                    </div>
                    <div className="name_at">
                        <span className='threadMainPostUsername'>{ tweet.username }</span>
                        <span className='threadMainPostAt'>{tweet.userAt}</span>
                    </div>
                </div>
                    {   (loc_user.active_account===tweet.tweetOwner) &&
                            <IconButton className='optionsButton'>
                            <MoreHorizIcon/>
                        </IconButton>
                    }
                </div>
               

            <div className="threadMainBody">
                    {tweet.text && (<span className='post_content_text'>
                        {tweet.text}
                    </span>)}
                    {tweet.cId && (
                        <img src={tweet.cId} alt="" />
                    )}
            </div>
            
            <span className='threadMainPostAt'>{tweet.date}</span>
            
            <div className="threadMainPostOptions">
                    {/* <ChatBubbleOutlineIcon className='_threadMainPostOptions' 
                    /> */}
                    {/* // onClick={postComment} */}
                    <FavoriteBorderIcon className='_threadMainPostOptions'/>
                    <ReplyIcon className='_threadMainPostOptions'/>
            </div>

        </div>
     );
}
 
export default ThreadMainPost;