import React from 'react';
import '../styles/Comments.css'
import Comment from './Comment';
import { comment_data } from '../Test Data/CommentData';
const Comments = ({id}) => {
    
    return ( 
        <div className='comments'>

            {
                comment_data && comment_data.map((comment)=>{

                    if(comment.p_id==id){

                        return <div key={comment.id} className='cmts-group'>
                                <Comment comment={comment} />
                                <div className='cmts-linebreak'></div>
                            </div>

                    }

                    
                })

            }
            
        </div>
    );
}
 
export default Comments;