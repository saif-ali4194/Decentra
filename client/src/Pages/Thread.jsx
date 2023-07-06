import React from 'react';
import '../styles/Pages/Thread.css';
import ThreadMainPost from '../components/ThreadMainPost';
import { tweets } from '../Test Data/PostDemoData';
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TweetBox from '../components/TweetBox';
// import {User} from '../Test Data/CurrentUser';
// import Comment from '../components/Comment';
import Comments from '../components/Comments';
// import { user_list } from '../Test Data/UserList';
import { _User } from '../Scripts/UserStorage';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';

const Thread = ({tweet}) => {
    // const [renderth,setRenderth]=useState(false);
    let cmt_avatar="";
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
    const [users, setUsers] = useState([]);
    const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;


    useEffect(() => {
        // setRenderth(false);
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
    // renderth
    const location=useLocation();
    let id = useParams();
    let threadTweet =location.state.tweet;
    let avatar =location.state.avatar;
    
    return ( 
        <div className="thread">

            <h3>Thread</h3>
            {threadTweet &&  <ThreadMainPost key={id.post} id={id.post} tweet={threadTweet} avatar={avatar} />}
                    
           
            {/* renderth={renderth} */}
            <TweetBox profile={loc_user} mode={1} p_id={id.post} />
            <Comments id={id.post} users={users}/>
        </div>
     );
}
 
export default Thread;