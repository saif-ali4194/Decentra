import React from 'react';
import '../styles/Post.css';
import {Avatar, Button, IconButton} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
const Post = ({tweet}) => {
    return (  
        <div className="post">
            <div className="post_avatar">
                <Avatar src={tweet.user.avatar}/>
            </div>
            <div className="post_body">
                <div className="post_top">
                    <div className='post_top_userinfo'>
                        <span className='post_username'>{tweet.user.name}</span>
                        <span className='post_info'>{tweet.user.at}·{tweet.date}</span>
                    </div>
                    <div>
                        <IconButton className="post_top_options_iconbutton">
                            <MoreHorizIcon className="more"/></IconButton>
                    </div>
                    
                </div>
                <div className="post_content">
                    {tweet.text && (<span className='post_content_text'>
                        {tweet.text}
                    </span>)}
                    {tweet.content && (
                        <img src={tweet.content} alt="" />
                    )}
                </div>
                <div className="post_options">
                    <ChatBubbleOutlineIcon className='_postoptions'/>
                    <FavoriteBorderIcon className='_postoptions'/>
                    <ReplyIcon className='_postoptions'/>
                </div>
            </div>
        </div>
    );
}
 
export default Post;