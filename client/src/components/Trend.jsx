import React from 'react';
import "../styles/Trend.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton } from '@mui/material';
const Trend = ({id,name, location, type,retweets,catagoryName}) => {
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
            <span>{retweets} Tweets</span>
        </div>
     );
}
 
export default Trend;