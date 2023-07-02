import React, { useState } from 'react';
import '../styles/Post.css';
import {Avatar, IconButton} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
// import { User } from '../Test Data/CurrentUser';
import TweetBox from './TweetBox';
import {Link} from 'react-router-dom';
import { _User } from '../Scripts/UserStorage';

const Post = ({tweet,tweetId,avatar}) => {
    const loc_user = _User.getUserData();
    
    const [modalOpen,setModalOpen]=useState(false);
    const postThread = useRef();
    const cModal=useRef();
    const postComment=(event)=>{
        event.stopPropagation();
        setModalOpen(true);
        cModal.current.showModal();
    }

    const closePostComment=()=>{
        cModal.current.close();
        setModalOpen(false);
    }

    const openThread = () => {
        if(!modalOpen)
            postThread.current.click();
    }
    return (  
        <div className="post" onClick={openThread}>
            
            <div className="post_avatar">
                <Avatar src={avatar}/>
            </div>
            <div className="post_body">
                <div className="post_top">
                    <div className='post_top_userinfo'>
                        <span className='post_username'>{tweet.username}</span>
                        <span className='post_info'>{tweet.userAt}·{tweet.date}</span>
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
                    {tweet.cId && (
                        <img src={tweet.cId} alt="" />
                    )}
                </div>
                <div className="post_options">
                    <ChatBubbleOutlineIcon className='_postoptions' onClick={postComment}/>
                    <FavoriteBorderIcon className='_postoptions'/>
                    <ReplyIcon className='_postoptions'/>
                </div>
            </div>
            
            
            <dialog ref={cModal} className='post_comment_input'>
                <div className='post_comment_input_display'>

                    <IconButton className="postCommentCloseButton" onClick={closePostComment}>
                        <CancelIcon className='postCommentClose' />
                    </IconButton>
                    <div className="mainPost">
                        <div className="replyAvatarSide">
                            <Avatar src={loc_user.avatar} style={{
                    width:"2.5em",
                    height:"2.5em"
                }}/>
                            <div className='belowAvatar'>
                                <div className="straightLine"></div>
                            </div>
                            
                        </div>
                        <div className="replyBodySide">
                            <div className='post_top_userinfo'>
                                <span className='post_username'>{tweet.username}</span>
                                <span className='post_info'>{tweet.userAt}·{tweet.date}</span>
                            </div>
                            <div className="replyMaintext">
                                {tweet.text && (<span className='post_content_text'>
                                    {tweet.text}
                                    </span>)}
                            </div>
                        </div>
                    </div>
                    <div className='replyingTo'>
                        <div className='belowMainPost'>
                                    <div className="straightLine"></div>
                        </div>
                        <div className="replying">Replying to {tweet.userAt}</div>
                    </div>
                    <div className="userReply">
                        <TweetBox profile={loc_user}/>
                    </div>
                </div>
            </dialog>


            <Link  className='threadLink' to={`/thread/${tweetId}`} ref={postThread}></Link>
        </div>
    );
}
 
export default Post;