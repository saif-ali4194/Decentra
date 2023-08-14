import React from 'react';
import {useState,useEffect,useLocation} from 'react';
import "../styles/Trend.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton } from '@mui/material';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
const Trend = ({id,name, location, type,retweets,catagoryName}) => {
    //const Location = useLocation();
    const [activeLink, setActiveLink] = useState(Location.pathname);

    let tmp_trends = [];
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

      const [mentions, setMentions] = useState(0);
      const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
    
    //   useEffect(() => {
    //         const fetchMentions = async () => {
    //             const web3Modal = new Web3Modal();
    //             const connection = await web3Modal.connect();
    //             let provider = new ethers.BrowserProvider(connection);
    //             const signer = await provider.getSigner();
    //             const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
        
    //             const fetchedMentions = await contract.getMentions(id);//getMentions(id);
    //             console.log(fetchedMentions[0])
    //             // tmp_trends = [];  
    //             //Update the state with the fetched users
    //                 // for(let i=0; i<fetchedTrends.length; i++) {
    //                     // const fetchedTrend = fetchedTrends[i];
    //                     // if(fetchedUser.userAddress == loc_user.active_account)	continue;
    //                     // const mention = {
    //                     //     mentions: fetchedMentions[0]
    //                         // userAddress: fetchedComment.commentOwner, 
    //                         // name: fetchedComment.username,
    //                         // avatar: fetchedUser.profile.avatar,
    //                         //userAt: fetchedComment.userAt,
    //                         // p_id: fetchedComment.p_id,
    //                         // date: fetchedComment.date,
    //                         // text: fetchedTrend.t_name,
    //                         // country: fetchedTrend.t_location,
                        
    //                     // }
                        
    //                     // tmp_trends.push(trend);
    //                 // }
                
    //                 // setTrends(tmp_trends);
    //                 //setMentions(mention);
                
    //         };	
    //         //fetchMentions();
    //         fetchMentions();
    //   }, []);
    //   console.log(mentions);
    return ( 
        <div className="trend" id={id}>
            <div className='trend-top'>
            {type===0?<span>Trending in {catagoryName}</span>:<span>Trending in {location}</span>}
            
                <div>
                    <IconButton className='button'>
                        <MoreHorizIcon/>
                    </IconButton>
                </div>
            
            </div>
            <span style={
                {   
                    fontSize:"medium",
                    fontWeight:750,
                    color:"var(--font-color)",
                    opacity:"100%"
                }
            }>{type===1 && "# "}{name}</span>
           {/* <span>{retweets} Tweets</span> */}
        </div>
     );
}
 
export default Trend;