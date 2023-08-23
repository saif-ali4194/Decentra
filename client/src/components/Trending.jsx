import React, { useEffect } from 'react';
import '../styles/Trending.css';
import Trend from './Trend';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {trends} from '../Test Data/TrendData';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import DecentraModulesAbi from '../abi/DecentraModules.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
const Trending = ({trendAmount}) => {
    const Location = useLocation();
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

      const [trends, setTrends] = useState([]);
      const DecentraContractAddress = config.REACT_APP_DECENTRAMODULES_CONTRACT_ADDRESS;
    
      useEffect(() => {
            const fetchTrends = async () => {
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.BrowserProvider(connection);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(DecentraContractAddress, DecentraModulesAbi.abi, signer);
        
                const fetchedTrends = await contract.getTrends();
                tmp_trends = [];  
                //Update the state with the fetched users
                    for(let i=0; i<fetchedTrends.length; i++) {
                        const fetchedTrend = fetchedTrends[i];
                        // if(fetchedUser.userAddress == loc_user.active_account)	continue;
                        const trend = {
                            id: fetchedTrend.t_id,
                            // userAddress: fetchedComment.commentOwner, 
                            // name: fetchedComment.username,
                            // avatar: fetchedUser.profile.avatar,
                            //userAt: fetchedComment.userAt,
                            // p_id: fetchedComment.p_id,
                            // date: fetchedComment.date,
                            text: fetchedTrend.t_name,
                            country: fetchedTrend.t_location,
                        
                        }
                        
                        tmp_trends.push(trend);
                    }
                
                    setTrends(tmp_trends.reverse());
                
            };	
            fetchTrends();
        
      }, []);
      
    const handleLinkClick = (to) => {
        setActiveLink(to);
      };

    return ( 
        <div className="trending">
            <h3 style={{
                    fontWeight:"800",
                    padding:"15px 10px 5px 15px"
            }}>Trends For You</h3>
            {
                trends.slice(0,trendAmount).map(trend=>{
                    return <Trend id={trend.id} key={trend.id} name={trend.text} location={trend.country}/>;
                })
            }
            
            
            <Link to={"/trendingPage"} className='trendingPageLink' onClick={()=>{handleLinkClick("/trendingPage")}}>Show More</Link>
        </div>
     );
}
 
export default Trending;