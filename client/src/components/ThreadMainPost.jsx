import React from 'react';
import '../styles/ThreadMainPost.css';
import {Avatar,IconButton} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
const ThreadMainPost = ({id,tweet}) => {
    // const postComment =()=>{
        
    // }
    return ( 
        <div className="threadMainPost">

            <div className="threadMainTop">
                <div className='threadMainTop-left'>
                    <div className="avatar">
                        <Avatar src={tweet.user.avatar}/>
                    </div>
                    <div className="name_at">
                        <span className='threadMainPostUsername'>{tweet.user.name}</span>
                        <span className='threadMainPostAt'>{tweet.user.at}</span>
                    </div>
                </div>
                <IconButton className='optionsButton'>
                    <MoreHorizIcon/>
                </IconButton>
            </div>

            <div className="threadMainBody">
                    {tweet.text && (<span className='post_content_text'>
                        {tweet.text}
                    </span>)}
                    {tweet.content && (
                        <img src={tweet.content} alt="" />
                    )}
            </div>
            
            <span className='threadMainPostAt'>{tweet.date}</span>
            
            <div className="threadMainPostOptions">
                    <ChatBubbleOutlineIcon className='_threadMainPostOptions' 
                    // onClick={postComment}
                    />
                    <FavoriteBorderIcon className='_threadMainPostOptions'/>
                    <ReplyIcon className='_threadMainPostOptions'/>
            </div>

        </div>
     );
}
 
export default ThreadMainPost;