import React from 'react';
import '../styles/Comment.css'
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';

const Comment = ({comment}) => {
    
    return ( 
        <div className="comment">
            
            <div className="cmt-left">
                <Avatar src={comment.user.avatar}/>
                <div className='below-avatar'>
                    <div className="straightLine">

                    </div>
                </div>
            </div>

            <div className="cmt-right">
                
                <div className="cmt-right-top">
                    <div className='cmt-userInfo'>
                        <span className='cmt-username'>{comment.user.name}</span>
                        <span className='cmt-userat'>{comment.user.at}·{comment.date}</span>
                    </div>
                    <IconButton className='cmt-more'>
                        <MoreHorizIcon/>
                    </IconButton>
                </div>

                <div className="cmt-right-middle">
                    <span className='cmt-text'>{comment.text}</span>
                </div>

                <div className="cmt-Options">
                    <ChatBubbleOutlineIcon className='_cmt-Options' 
                    // onClick={postComment}
                    />
                    <FavoriteBorderIcon className='_cmt-Options'/>
                    <ReplyIcon className='_cmt-Options'/>
                </div>

            </div>

            {/* <Comment comment={comment.c_cmts[0]}/>
            <Comment comment={comment.c_cmts[1]}/> */}
{/*     
            {comment.c_cmts.length>0 && (
                <div>
                    {comment.c_cmts.map((childComment)=>{
                        return <Comment key={childComment.id} comment={childComment}/>
                    })}
                </div>
            )} */}

        </div>
    );
}
 
export default Comment;