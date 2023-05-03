import React from 'react';
import '../styles/SearchResult.css';
import { Avatar } from '@mui/material';
const SearchResult = ({avatar,name,at}) => {
    return (  
        <div className="searchResult">
            <div className="searchResultAvatar">
                <Avatar src={avatar}/>
            </div>
            <div className="searchResultUserInfo">
                <span className='searchUsername'>{name}</span>
                <span className='searchAt'>{at}</span>
            </div>
        </div>
    );
}
 
export default SearchResult;