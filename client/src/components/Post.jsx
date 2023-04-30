import React from 'react';
import '../styles/Post.css';
import {Avatar, Button} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
const Post = (tweet) => {
    return (  
        <div className="post">
            <div className="post_avatar">
                <Avatar/>
            </div>
            <div className="post_body">
                <div className="post_top">
                    <div className='post_top_userinfo'>
                        <span className='post_username'>{tweet.tweet.user.username}</span>
                        <span className='post_info'>{tweet.tweet.user.at}·{tweet.tweet.date}</span>
                    </div>
                    <div>
                        <Button style={{
                            alignSelf:"top",
                            padding:0,
                            margin:0

                        }}><MoreHorizIcon/></Button>
                    </div>
                    
                </div>
                <div className="post_content">
                    {tweet.tweet.text && (<span className='post_content_text'>
                        {tweet.tweet.text}
                    </span>)}
                    {tweet.tweet.content && (
                        <img src={tweet.tweet.content} alt="" />
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