import React from 'react';
import {useState, useEffect} from 'react';
import '../styles/Posts.css';
import Post from './Post';
//import {tweets} from '../Test Data/PostDemoData';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
const Posts = ({tweets,user_posts, pathname,home,render}) => {
    //const [avatar,setAvatar]=useState();
    
        
    
    let avatar="";
    const [loc_user, setLocUser] = useState(_User.getUserData());
    useEffect(() => {
      const handleLocalStorageUpdated = () => {
      setLocUser(_User.getUserData());
      };

          window.addEventListener('localStorageUpdated', handleLocalStorageUpdated);

      return () => {
            window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated);
      };
    }, []);
    const [activeSection, setActiveSection] = useState('com-followers');
    const [numUsers, setNumUsers] = useState(10);
    const [users, setUsers] = useState([]);
    const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;


    useEffect(() => {
    const fetchUsers = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);

        const fetchedUsers = await contract.getAllUsers();
        let tmp_users = [];
        //Update the state with the fetched users
        for(let i=0; i<fetchedUsers.length; i++) {
            const fetchedUser = fetchedUsers[i];
            
            const user = {
                id: i,
                userAddress: fetchedUser.userAddress, 
                name: fetchedUser.profile.name,
                avatar: fetchedUser.profile.avatar,
                banner: fetchedUser.profile.banner,
                age: parseInt(fetchedUser.profile.age),
                gender: fetchedUser.profile.gender,
                status: fetchedUser.profile.status,
                country: fetchedUser.profile.country,
                city: fetchedUser.profile.city,
                occupation: fetchedUser.occupation,
                date_joined: fetchedUser.date_joined,
                followers: parseInt(fetchedUser.followers),
                following: parseInt(fetchedUser.following),
            }
            tmp_users.push(user);
        }
        setUsers(tmp_users);
    };	
    fetchUsers();
        
    }, []);

      
    return ( 
        <div className="posts">
            {/* <h2>posts</h2>
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
            
             */}

             {(home && tweets) && 
                (tweets.map((tweet)=>{
                    if(loc_user.user_following.includes(tweet.tweetOwner) || tweet.tweetOwner === loc_user.active_account){
                        for(let i=0; i<users.length;i++){
                            if(tweet.tweetOwner==users[i].userAddress){
                                avatar=users[i].avatar;
                                
                                break;
                            }
                        }
                        return <Post key={tweet.t_id} tweet={tweet} tweetId={tweet.t_id} avatar={avatar} render={render}/>
                    }
                
                    }))

             }

             {
                (user_posts!= undefined && pathname !== "/profile") && 
                (tweets.map((tweet)=>{
                        if(tweet.tweetOwner==user_posts.userAddress)
                        {for(let i=0; i<users.length;i++){
                            if(tweet.tweetOwner==users[i].userAddress){
                                avatar=users[i].avatar;
                                
                                break;
                            }
                        }
                        return <Post key={tweet.t_id} tweet={tweet} tweetId={tweet.t_id} avatar={avatar} render={render}/>
                        }
                    })
                )
             }

             {(pathname === "/profile" && tweets) && 
             (tweets.map((tweet)=>{
                    if(tweet.tweetOwner==loc_user.active_account)
                    {for(let i=0; i<users.length;i++){
                        if(tweet.tweetOwner==users[i].userAddress){
                            avatar=users[i].avatar;
                            
                            break;
                        }
                    }
                    return <Post key={tweet.t_id} tweet={tweet} tweetId={tweet.t_id} avatar={avatar} render={render}/>
                    }
                })
            )
            }


             {(pathname === "/explore" && tweets) && 
                (tweets.map((tweet)=>{
                for(let i=0; i<users.length;i++){
                    if(tweet.tweetOwner==users[i].userAddress){
                        avatar=users[i].avatar;
                        
                        break;
                    }
                }
                return <Post key={tweet.t_id} tweet={tweet} tweetId={tweet.t_id} avatar={avatar} render={render}/>
                    }))

             }

             {}
        </div>
     );
}
 
export default Posts;