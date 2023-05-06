import React from 'react';
import '../styles/Pages/Thread.css';
import ThreadMainPost from '../components/ThreadMainPost';
import { tweets } from '../Test Data/PostDemoData';
import {useParams} from 'react-router-dom';
import TweetBox from '../components/TweetBox';
import {User} from '../Test Data/CurrentUser';
// import Comment from '../components/Comment';
import Comments from '../components/Comments';

const Thread = () => {
    let id = useParams();
      
    return ( 
        <div className="thread">

            <h3>Thread</h3>
            {tweets && tweets.map((tweet)=>{
                if(tweet.id==id.post)
                {
                    return <ThreadMainPost key={tweet.id} id={id.post} tweet={tweet}/>
                }
                    
            })}
            <TweetBox profile={User}/>
            <Comments id={id.post}/>
        </div>
     );
}
 
export default Thread;