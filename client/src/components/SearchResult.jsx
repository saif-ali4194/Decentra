import React from 'react';
import '../styles/SearchResult.css';
import { Avatar } from '@mui/material';
import { useRef } from 'react';
import {Link} from 'react-router-dom';
const SearchResult = ({avatar,name,at,u_id,user}) => {

    const profileLink =useRef();

    const openSearchResult = () => {
        profileLink.current.click();
        
    }

    return (  
        <div className="searchResult" onClick={openSearchResult}>
            <div className="searchResultAvatar">
                <Avatar src={avatar}/>
            </div>
            <div className="searchResultUserInfo">
                <span className='searchUsername'>{name}</span>
                <span className='searchAt'>{at}</span>
            </div>
            <Link  className='profileLink' to={`/profile/${u_id}`} state={{user}} ref={profileLink}></Link>
        </div>
    );
}
 
export default SearchResult;