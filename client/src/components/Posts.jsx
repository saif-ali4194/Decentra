import React from 'react';
import '../styles/Posts.css';
import Post from './Post';
import {tweets} from '../Test Data/PostDemoData';
const Posts = ({user_posts}) => {
    return ( 
        <div className="posts">
            {/* <h2>posts</h2> */}
            {tweets && tweets.map((tweet)=>{
                if(user_posts){
                    if(tweet.user_id===1)
                        return <Post key={tweet.id} tweet={tweet} tweetId={tweet.id}/>
                }else 
                 return <Post key={tweet.id} tweet={tweet} tweetId={tweet.id}/>
            })}
            
            
        </div>
     );
}
 
export default Posts;