import React from 'react'
import "../styles/RecommendationList.css"
import RecommendationUnit from './RecommendationUnit'
import { user_list } from '../Test Data/UserList'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecommendationList() {
  const Location = useLocation();
    const [activeLink, setActiveLink] = useState(Location.pathname);
    
    const handleLinkClick = (to) => {
        setActiveLink(to);
      };

  return (
    <div className='reco-wrapper'>
      <h3 id='heading'>Recommendations</h3>
      <div className="reco-list">
        { user_list.sort((a, b) => b.rating - a.rating).slice(0, 5).map(user => (
          <RecommendationUnit  key={user.id} id= {user.id} img= {user.avatar} name={user.name} />
          ))
        }
      </div>
      <Link 
        to={"/community"} 
        className='communityPageLink' 
        onClick={()=>{handleLinkClick("/community")}}>
            Show More
        </Link>
    </div>
  )
}

export default RecommendationList