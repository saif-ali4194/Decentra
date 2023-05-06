import React from 'react';
import '../styles/Comments.css'
import Comment from './Comment';
import { comment_data } from '../Test Data/CommentData';
const Comments = () => {
    return ( 
        <div className='comments'>
            <Comment comment={comment_data[0]}/>
        </div>
    );
}
 
export default Comments;