import React, { useState,  useEffect, useRef } from 'react';
import '../styles/Comment.css'
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
import TweetBox from './TweetBox';
import CancelIcon from '@mui/icons-material/Cancel';


const Comment = ({comment, users}) => {
    // console.log(users);
    // const[Users,setUsers]=useRef([]);
    // setUsers=users;
    let tmp_cmts = [];
    const [modalOpen,setModalOpen]=useState(false);
    const optionsDialogue=useRef();
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

      const [comments, setComments] = useState([]);
      const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
    
      useEffect(() => {
            const fetchComments = async () => {
              try{  const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.BrowserProvider(connection);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
        
                const fetchedComments = await contract.getComments(comment.id);
                tmp_cmts = [];  
                //Update the state with the fetched users
                    for(let i=0; i<fetchedComments.length; i++) {
                        const fetchedComment = fetchedComments[i];
                        // if(fetchedUser.userAddress == loc_user.active_account)	continue;
                        const comment = {
                            id: fetchedComment.c_id,
                            userAddress: fetchedComment.commentOwner, 
                            name: fetchedComment.username,
                            // avatar: fetchedUser.profile.avatar,
                            userAt: fetchedComment.userAt,
                            p_id: fetchedComment.p_id,
                            date: fetchedComment.date,
                            text: fetchedComment.text,
                            cId: fetchedComment.cId,
                        
                        }
                        
                        tmp_cmts.push(comment);
                    }
                
                setComments(tmp_cmts);
                
            }catch(e){
                console.log(e)
            }	}
        fetchComments();
        
      }, []);
      const [liked,setLiked]=useState(false);
      //   console.log(address + "   " + tweet.t_id);
        useEffect(()=>{
          const getLikes = async () => {
              const web3Modal = new Web3Modal();
              const connection = await web3Modal.connect();
              let provider = new ethers.BrowserProvider(connection);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
      
              const fetchedUsers = await contract.getlikes(comment.id);
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
          getLikes();
        },[]);

        const likePost = async (event)=> {
            event.stopPropagation();
            setModalOpen(true);
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
            const transaction = await contract.addLike(comment.id);
            setLiked(true);
            
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
            const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
            const transaction = await contract.removeLike(comment.id);
            setLiked(false);
            
            setTimeout(() => {
                setModalOpen(false);
              }, 200);
        }

      let avatar ="";
    //   useEffect(()=>{
    //     console.log(Users);
    //     for(let i=0; i<users.length;i++){
    //         if(comment.userAddress==users[i].userAddress){
    //             avatar=users[i].avatar;
                
    //             break;
    //         }
    //     }
    //   },[]);
   

    const cModal=useRef();

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
    const closeDialogue = (event) => {
        event.stopPropagation();
        optionsDialogue.current.close();
        setModalOpen(false);
    }
    const openDialogue = (event) => {
        event.stopPropagation();
        setModalOpen(true);
        optionsDialogue.current.setAttribute('open', true);
    }
    const deletePost = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        let provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);

        const transaction = await contract.deleteComment(comment.p_id,comment.id); 
        // render(true);
    }

    return ( 
       

        <>

            <div className="comment">
                        
                        <div className="cmt-left">
                            <Avatar src={avatar}/>
                            <div className='below-avatar'>
                                <div className="straightLine">

                                </div>
                            </div>
                        </div>

                        <div className="cmt-right">
                            
                            <div className="cmt-right-top">
                                <div className='cmt-userInfo'>
                                    <span className='cmt-username'>{comment.username}</span>
                                    <span className='cmt-userat'>{comment.userAt}·{comment.date}</span>
                                </div>
                                <div className="postOptionsMainDiv">
                                    {(comment.userAddress===loc_user.active_account) &&
                                    <IconButton className='cmt-more' onClick={modalOpen?closeDialogue:openDialogue}>
                                        <MoreHorizIcon/>
                                    </IconButton>
                                    }
                                    <dialog className="post_options_dialog" ref={optionsDialogue} open={false} 
                                    onClick={deletePost}
                                    >
                                    {/* <div className="opt">Hello</div> */}
                                    <button className="postDelButton">🗑️</button>
                                    </dialog>
                                </div>
                                
                            </div>

                            <div className="cmt-right-middle">
                                
                                <span className='cmt-text'>{comment.text}</span>
                                {comment.cId && (
                                    <img src={comment.cId} alt="" />
                                 )}
                            </div>

                            <div className="cmt-Options">
                                <ChatBubbleOutlineIcon className='_cmt-Options' 
                                    onClick={postComment}
                                />
                                {liked?
                                    <FavoriteIcon className='_postoptions' onClick={unlikePost} />
                                    :
                                    <FavoriteBorderIcon className='_postoptions' onClick={likePost} />
                                }
                                <ReplyIcon className='_cmt-Options'/>
                            </div>

                        </div>

                        {/* <Comment comment={comment.c_cmts[0]}/>
                        <Comment comment={comment.c_cmts[1]}/> */}
                
                        

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
                                        <span className='post_username'>{comment.username}</span>
                                        <span className='post_info'>{comment.userAt}·{comment.date}</span>
                                    </div>
                                    <div className="replyMaintext">
                                        {comment.text && 
                                            (<span className='post_content_text'>
                                            {comment.text}
                                            </span>)
                                        }
                        
                                    </div>
                                </div>
                            </div>
                            <div className='replyingTo'>
                                <div className='belowMainPost'>
                                            <div className="straightLine"></div>
                                </div>
                                <div className="replying">Replying to {comment.username}</div>
                            </div>
                            <div className="userReply">
                                <TweetBox profile={loc_user} mode={1} p_id={comment.id}/>
                            </div>
                        </div>
                    </dialog>

                                   



                        {comment && (
                                <div className="childComments">
                                    {comments.map((childComment)=>{
                                        return <Comment key={childComment.id} comment={childComment}/>
                                    })}
                                </div>
                            )}
        </>
    );
}
 
export default Comment;