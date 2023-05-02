import React from 'react';
import '../styles/Trending.css';
import Trend from './Trend';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {trends} from '../Test Data/TrendData';
const Trending = ({trendAmount}) => {
    const Location = useLocation();
    const [activeLink, setActiveLink] = useState(Location.pathname);
    
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
                trends.slice(0,trendAmount).map(item=>{
                    return <Trend key={item.id} name={item.name} location={item.location} type={item.type} retweets={item.retweets} catagoryName={item.catagoryName} />;
                })
            }
            
            
            <Link to={"/trendingPage"} className='trendingPageLink' onClick={()=>{handleLinkClick("/trendingPage")}}>Show More</Link>
        </div>
     );
}
 
export default Trending;