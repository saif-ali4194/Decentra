import React from 'react';
import '../styles/Trending.css';
import Trend from './Trend';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Trending = () => {
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
            <Trend name={"JusticeForSaif"} location={"Pakistan"} type={1} retweets={"25k"}/>
            <Trend name={"WhyDidThisHappen"} location={"Pakistan"} type={1} retweets={"15k"}/>
            <Trend name={"Assault"} location={"Pakistan"} type={0} retweets={"10k"} catagoryName={"Social Issues"}/>
            {/* <Trend name={"IIUI"} location={"Pakistan"} type={1} retweets={"5k"}/> */}
            <Link to={"/trendingPage"} className='trendingPageLink' onClick={()=>{handleLinkClick("/trendingPage")}}>Show More</Link>
        </div>
     );
}
 
export default Trending;