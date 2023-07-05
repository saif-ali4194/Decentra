import React, { useState,  useEffect } from 'react';
import '../styles/Comment.css'
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';


const Comment = ({comment, users}) => {
    let tmp_cmts = [];
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
        
                const fetchedComments = await contract.getComments(comment.c_id);
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
    let avatar ="";
    for(let i=0; i<users.length;i++){
        if(comment.commentOwner==users[i].userAddress){
            avatar=users[i].avatar;
            
            break;
        }
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
                                <IconButton className='cmt-more'>
                                    <MoreHorizIcon/>
                                </IconButton>
                            </div>

                            <div className="cmt-right-middle">
                                
                                <span className='cmt-text'>{comment.text}</span>
                            </div>

                            <div className="cmt-Options">
                                <ChatBubbleOutlineIcon className='_cmt-Options' 
                                // onClick={postComment}
                                />
                                <FavoriteBorderIcon className='_cmt-Options'/>
                                <ReplyIcon className='_cmt-Options'/>
                            </div>

                        </div>

                        {/* <Comment comment={comment.c_cmts[0]}/>
                        <Comment comment={comment.c_cmts[1]}/> */}
                
                        

                    </div>


                        {comments && (
                                <div>
                                    {comments.map((childComment)=>{
                                        return <Comment key={childComment.c_id} comment={childComment}/>
                                    })}
                                </div>
                            )}
        </>
    );
}
 
export default Comment;