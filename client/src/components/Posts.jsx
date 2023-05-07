import React from 'react';
import '../styles/Posts.css';
import Post from './Post';
import {tweets} from '../Test Data/PostDemoData';
const Posts = ({user_posts, pathname}) => {
    
    return ( 
        <div className="posts">
            {/* <h2>posts</h2> */}
            {tweets && tweets.map((tweet)=>{

                if(pathname == "/profile")
                    if(tweet.user_id === 1)
                        return <Post key={tweet.id} tweet={tweet} tweetId={tweet.id}/> 
                     

                if(user_posts)
                    if(tweet.user_id == user_posts)
                        return <Post key={tweet.id} tweet={tweet} tweetId={tweet.id}/>     
                

                if(pathname != "/profile" && !user_posts) 
                    return <Post key={tweet.id} tweet={tweet} tweetId={tweet.id}/>
                
            })}
            
            
        </div>
     );
}
 
export default Posts;