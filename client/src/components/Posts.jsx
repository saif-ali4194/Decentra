import React from 'react';
import '../styles/Posts.css';
import Post from './Post';
import {tweets} from '../Test Data/PostDemoData';
const Posts = () => {
    return ( 
        <div className="posts">
            {/* <h2>posts</h2> */}
            {tweets && tweets.map((tweet)=>{
               return <Post key={tweet.id} tweet={tweet}/>
            })}
            
            
        </div>
     );
}
 
export default Posts;