import React from 'react';
import '../styles/Comments.css'
import {useState, useEffect} from 'react';
import Comment from './Comment';
import { comment_data } from '../Test Data/CommentData';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
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
      const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
    
      useEffect(() => {
            const fetchComments = async () => {
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.BrowserProvider(connection);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
        
                const fetchedComments = await contract.getComments(id);
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
                
            };	
        fetchComments();
        
      }, []);

      useEffect(() => {
        console.log(comments);
      }, [comments]);
    return ( 
        <div className='comments'>

            {
                comments && comments.map((comment)=>{

                    if(comment.p_id==id){
                            
                        

                        return <div key={comment.c_id} className='cmts-group'>
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