import React, { useRef, useState } from 'react';
import '../styles/Search.css'
import SearchIcon from '@mui/icons-material/Search';
import { user_list } from '../Test Data/UserList';
import SearchResult from './SearchResult';
// import CloseIcon from '@mui/icons-material/Close';
const Search = () => {
    const searchDialogRef = useRef();
    const searchInputRef =useRef();
    const [query, setQuery]=useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const filteredList = user_list.filter((user)=>{
        return user.name.toLowerCase().includes(query.toLowerCase())
    });
    const focusHandle=()=>{
        // console.log("focus")
        searchDialogRef.current.setAttribute('open', true);
        // searchDialogRef.current.inert=false;
        
    }
    const outFocusHandle=()=>{
        // console.log("blur")
        searchDialogRef.current.close();
        // searchDialogRef.current.setAttribute('open', 'false');
        // searchInputRef.current.blur();
        // if(isDialogOpen)
        // {
        //     searchDialogRef.current.close();
        //     setIsDialogOpen(false);
        // }
        
    }

    return (  
        <div className="search">
                <div>
                    
                    <SearchIcon className='search_field_icon'/>
                    <input ref={searchInputRef} autoComplete='off' value={query} type="search" name="search" id="search" placeholder='Search' className='search_field_input' 
                    onFocus={focusHandle}
                    onBlur={outFocusHandle}
                    onChange={(e)=>{
                        setQuery(e.target.value)
                        
                    }}  
                    
                        
                    
                    />
                    {/* <CloseIcon className='search_field_cross'/> */}
                </div>
                <dialog className="search_dialog" ref={searchDialogRef} open={false}>
                {query === ""
                ? <span className='searchDefaultMessage'>Try searching for people</span>
                : filteredList.map(user=>{
                        return <SearchResult key={user.id} avatar={user.avatar} name={user.name} at={user.at}/>
                })
                }
                
                </dialog>
        </div>
    );
}
 
export default Search;