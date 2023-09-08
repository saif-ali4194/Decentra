import React, { useState, useEffect } from 'react';
import '../styles/Post.css';
import {Avatar, IconButton} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
// import { User } from '../Test Data/CurrentUser';
import TweetBox from './TweetBox';
import {Link} from 'react-router-dom';
import { _User } from '../Scripts/UserStorage';
import config from '../config';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';	
import { Web3Storage } from 'web3.storage';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Post = ({tweet,tweetId,avatar, render,del}) => {
    const [loc_user, setLocUser] = useState(_User.getUserData());
    const [likes,setLikes]=useState(parseInt(tweet.likes,10));
    const [dislikes,setDislikes]=useState(parseInt(tweet.dislikes,10));
    
    useEffect(() => {
		const handleLocalStorageUpdated = () => {
		setLocUser(_User.getUserData());
		};

   	 	window.addEventListener('localStorageUpdated', handleLocalStorageUpdated);

    	return () => {
      		window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated);
    	};
  	}, []);

    


      const Web3StorageApi = config.REACT_APP_WEB3STORAGE_API_KEY;
      const DecentraContractAddress = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;
      const [address, setAddress] = useState([]);
      const [liked,setLiked]=useState(false);
      const [disliked,setDisliked]=useState(false);
    //   console.log(address + "   " + tweet.t_id);
      useEffect(()=>{
        const getLikes = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
    
            const fetchedUsers = await contract.getlikes(tweet.t_id);
            // let tmp_users = [];
            //Update the state with the fetched users
            for(let i=0; i<fetchedUsers.length; i++) {
                const fetchedUser = fetchedUsers[i];
                if(fetchedUser===loc_user.active_account){
                    setLiked(true);
                    break;
                }
                // const userAddress = fetchedUser;
                // tmp_users.push(userAddress);
                
            }
            
            // setAddress(tmp_users);
            // if(address.includes(loc_user.active_account)){
            //     setLiked(true);
            // }
            
        };	

        const getDislikes = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
    
            const fetchedUsers = await contract.getdislikes(tweet.t_id);
            // let tmp_users = [];
            //Update the state with the fetched users
            for(let i=0; i<fetchedUsers.length; i++) {
                const fetchedUser = fetchedUsers[i];
                if(fetchedUser===loc_user.active_account){
                    setDisliked(true);
                    break;
                }
                // const userAddress = fetchedUser;
                // tmp_users.push(userAddress);
                
            }
            
            // setAddress(tmp_users);
            // if(address.includes(loc_user.active_account)){
            //     setLiked(true);
            // }
            
        };

        getLikes();
        getDislikes();
      },[]);

    const [modalOpen,setModalOpen]=useState(false);
    
    const postThread = useRef();
    const cModal=useRef();
    const optionsDialogue=useRef();
    const openOptionsDialogue = (event) => {
        event.stopPropagation();
        setModalOpen(true);
        optionsDialogue.current.setAttribute('open', true);
    }
    const closeOptionsDialogue = (event) => {
        event.stopPropagation();
        optionsDialogue.current.close();
        setModalOpen(false);
    }
    const postComment=(event)=>{
        event.stopPropagation();
        setModalOpen(true);
        cModal.current.showModal();
    }

    const closePostComment=()=>{
        cModal.current.close();
        setModalOpen(false);
    }

    const deletePost = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);

            const transaction = await contract.deleteTweet(tweet.t_id); 
            render(true);
    }
    const likePost = async (event)=> {
        event.stopPropagation();
        // if(disliked){
        //     removeDislike(event);
        //     setDisliked(false);
        // }
        setModalOpen(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        const transaction = await contract.addLike(tweet.t_id);
        setLiked(true);
        setLikes(likes+1);
        
        setTimeout(() => {
            setModalOpen(false);
          }, 200);
    }

    const unlikePost = async (event)=> {
        event.stopPropagation();
        setModalOpen(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        const transaction = await contract.removeLike(tweet.t_id);
        setLiked(false);
        setLikes(likes-1);
        
        setTimeout(() => {
            setModalOpen(false);
          }, 200);
    }

    const dislikePost = async (event)=> {
        event.stopPropagation();
        // if(liked){
        //     unlikePost(event);
        //     setLiked(false);
        // }
        setModalOpen(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        const transaction = await contract.addDislike(tweet.t_id);
        setDisliked(true);
        setDislikes(dislikes+1);
        
        setTimeout(() => {
            setModalOpen(false);
          }, 200);
    }

    const removeDislike = async (event)=> {
        event.stopPropagation();
        setModalOpen(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        const transaction = await contract.removeDislike(tweet.t_id);
        setDisliked(false);
        setDislikes(dislikes-1);
        
        setTimeout(() => {
            setModalOpen(false);
          }, 200);
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
                        {/* <span className='post_info'>{tweet.userAt}·{tweet.date}</span> */}
                        <span className='post_info'>{tweet.date}</span>
                    </div>
                    <div className="postOptionsMainDiv">
                        {(tweet.tweetOwner===loc_user.active_account) &&
                            <IconButton className="post_top_options_iconbutton" onClick={modalOpen?closeOptionsDialogue:openOptionsDialogue}>
                                <MoreHorizIcon className="more"/>
                            </IconButton>
                        }
                        <dialog className="post_options_dialog" ref={optionsDialogue} open={false} onClick={()=>{
                            deletePost();
                            //del(tweetId);
                            }}>
                            {/* <div className="opt">Hello</div> */}
                            <button className="postDelButton">🗑️</button>
                        </dialog>
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
                    <div className="impressionsCount">
                        {liked?
                            <ThumbUpIcon className='_postoptions' onClick={(event) => unlikePost(event)} />
                            :
                            <ThumbUpOffAltIcon className='_postoptions' onClick={(event) =>{ 
                                    if(disliked){
                                        removeDislike(event);
                                        setDisliked(false);
                                    }
                                    likePost(event)}} />
                        }
                        <span className='likeDislikeCount post-likes'>{likes}</span>
                    </div>
                    <div className="impressionsCount">
                        {disliked?
                            
                            <ThumbDownAltIcon className='post-op-icon' onClick={(event) =>removeDislike(event)} />
                            :
                            <ThumbDownOffAltIcon className='_postoptions' onClick={(event) =>{
                                if(liked){
                                    unlikePost(event);
                                    setLiked(false);
                                }
                                
                                dislikePost(event)}} />
                        }
                        <span className='likeDislikeCount'>{dislikes}</span>
                    </div>
                    
                    
                    {/* <ReplyIcon className='_postoptions'/> */}
                </div>
            </div>
            
            
            <dialog ref={cModal} className='post_comment_input'>
                <div className='post_comment_input_display'>

                    <IconButton className="postCommentCloseButton" onClick={closePostComment}>
                        <CancelIcon className='postCommentClose' />
                    </IconButton>
                    <div className="mainPost">
                        <div className="replyAvatarSide">
                            <Avatar src={avatar} style={{
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
                                {/* //{tweet.userAt}· */}
                                <span className='post_info'>{tweet.date}</span> 
                            </div>
                            <div className="replyMaintext">
                                {tweet.text && 
                                    (<span className='post_content_text'>
                                    {tweet.text}
                                    </span>)
                                }
                
                            </div>
                        </div>
                    </div>
                    <div className='replyingTo'>
                        <div className='belowMainPost'>
                                    <div className="straightLine"></div>
                        </div>
                        <div className="replying">Replying to {tweet.username}</div>
                    </div>
                    <div className="userReply">
                        <TweetBox profile={loc_user} mode={1} p_id={tweet.t_id}/>
                    </div>
                </div>
            </dialog>

           

            <Link state={{tweet,avatar}} className='threadLink' to={`/thread/${tweetId}`} ref={postThread}></Link>
        </div>
    );
}
 
export default Post;