import React, { useRef, useState, useEffect } from 'react';
import '../styles/Search.css'
import SearchIcon from '@mui/icons-material/Search';
import { user_list } from '../Test Data/UserList';
import SearchResult from './SearchResult';
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';
// import CloseIcon from '@mui/icons-material/Close';
const Search = () => {

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

      const [users, setUsers] = useState([]);
      const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;

      useEffect(() => {
        const fetchUsers = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            let provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
    
            const fetchedUsers = await contract.getAllUsers();
            let tmp_users = [];
            //Update the state with the fetched users
            for(let i=0; i<fetchedUsers.length; i++) {
                const fetchedUser = fetchedUsers[i];
                if(fetchedUser.userAddress == loc_user.active_account)	continue;
                const user = {
                    id: i,
                    userAddress: fetchedUser.userAddress, 
                    name: fetchedUser.profile.name,
                    avatar: fetchedUser.profile.avatar,
                    banner: fetchedUser.profile.banner,
                    age: fetchedUser.profile.age,
                    gender: fetchedUser.profile.gender,
                    status: fetchedUser.profile.status,
                    country: fetchedUser.profile.country,
                    city: fetchedUser.profile.city,
                    occupation: fetchedUser.occupation,
                    date_joined: fetchedUser.date_joined,
                    followers: parseInt(fetchedUser.followers),
                    following: parseInt(fetchedUser.following),
                }
                tmp_users.push(user);
            }
            setUsers(tmp_users);
        };	
        fetchUsers();
             
      }, []);


    const searchDialogRef = useRef();
    const searchInputRef =useRef();
    const [query, setQuery]=useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const filteredList = users.filter((user)=>{
        return user.name.toLowerCase().includes(query.toLowerCase())
    });
    const focusHandle=()=>{
        // console.log("focus")
        searchDialogRef.current.setAttribute('open', true);
        // searchDialogRef.current.inert=false;
        
    }
    const outFocusHandle=()=>{
        // console.log("blur")
        setTimeout(() => {
            searchDialogRef.current.close();
          }, 200);
        //searchDialogRef.current.close();
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
                        return <SearchResult key={user.id} avatar={user.avatar} name={user.name} at={user.at} u_id={user.id} user={user}/>
                })
                }
                
                </dialog>
        </div>
    );
}
 
export default Search;