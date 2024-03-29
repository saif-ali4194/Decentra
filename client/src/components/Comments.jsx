import React from 'react';
import '../styles/Comments.css'
import {useState, useEffect} from 'react';
import Comment from './Comment';
import { comment_data } from '../Test Data/CommentData';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';

const Comments = ({id, users}) => {
   
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
     // console.log(comments);
      const DecentraContractAddress = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;
    
    //   useEffect(() => {
    //         const fetchComments = async () => {
    //             const web3Modal = new Web3Modal();
    //             const connection = await web3Modal.connect();
    //             let provider = new ethers.BrowserProvider(connection);
    //             const signer = await provider.getSigner();
    //             const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        
    //             const fetchedComments = await contract.getComments(id);
    //             tmp_cmts = [];  
    //             //Update the state with the fetched users
    //                 for(let i=0; i<fetchedComments.length; i++) {
    //                     const fetchedComment = fetchedComments[i];
    //                     const commentLikesDislikes=await contract.getCommentimpressions(id);
    //                     // if(fetchedUser.userAddress == loc_user.active_account)	continue;
    //                    if(commentLikesDislikes !==undefined || commentLikesDislikes !== null){
    //                     const comment = {
    //                         id: fetchedComment.c_id,
    //                         userAddress: fetchedComment.commentOwner, 
    //                         name: fetchedComment.username,
    //                         // avatar: fetchedUser.profile.avatar,
    //                         userAt: fetchedComment.userAt,
    //                         p_id: fetchedComment.p_id,
    //                         date: fetchedComment.date,
    //                         text: fetchedComment.text,
    //                         cId: fetchedComment.cId,
    //                         likes:commentLikesDislikes.likes,
    //                         dislikes:commentLikesDislikes.dislikes,
    //                         avatar:fetchedComment.avatar
                        
    //                     }
    //                     tmp_cmts.push(comment);
    //                    }     
    //                 }
                
    //             setComments(tmp_cmts);
                
    //         };	
    //     fetchComments();
        
    //   }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
    
            const fetchedComments = await contract.getComments(id);
            const tmp_cmts = []; // Initialize a new array to hold comments
    
            for (let i = 0; i < fetchedComments.length; i++) {
                const fetchedComment = fetchedComments[i];
                const commentLikesDislikes = await contract.getCommentimpressions(fetchedComment.c_id);
                
                if (commentLikesDislikes !== undefined && commentLikesDislikes !== null) {
                    const comment = {
                        id: fetchedComment.c_id,
                        userAddress: fetchedComment.commentOwner,
                        name: fetchedComment.username,
                        userAt: fetchedComment.userAt,
                        p_id: fetchedComment.p_id,
                        date: fetchedComment.date,
                        text: fetchedComment.text,
                        cId: fetchedComment.cId,
                        likes: commentLikesDislikes.likes,
                        dislikes: commentLikesDislikes.dislikes,
                        avatar: fetchedComment.avatar
                    };
                    tmp_cmts.push(comment); // Push the comment object into the array once
                }
            }
    
            setComments(tmp_cmts);
        };
    
        fetchComments();
    }, []);
    
    //   useEffect(() => {
    //     console.log(comments);
    //   }, [comments]);
    return ( 
        <div className='comments'>

            {
                comments && comments.map((comment)=>{

                    if(comment.p_id==id){
                            
                        

                        return <div key={comment.id} className='cmts-group'>
                                    <Comment comment={comment} users={users} />
                                    <div className='cmts-linebreak'></div>
                                </div>

                    }

                    
                })

            }
            
        </div>
    );
}
 
export default Comments;