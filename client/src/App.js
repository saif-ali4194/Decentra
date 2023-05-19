import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { useEffect, useState } from 'react';
import { darktheme } from './styles/Darktheme';
import config from './config.js';
import DefaultAvatar from "./Data/Images/avatar.jpg"
import DefaultBanner from "./Data/Images/banner.png"
// For Backend
import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DecentraAbi from './abi/Decentra.json';

// const apiKey = config.REACT_APP_WEB3STORAGE_API_KEY;

function App() {
	const [darkModeEnabled, setDarkModeEnabled] = useState(true);
	// ----------- AUTH ------------ //
	const [isAuthenticated,setIsAuthenticated] = useState(false);
	const [provider,setProvider] = useState(window.ethereum);
	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
	// ----------- / AUTH ------------ //
	useEffect(() => {
		const darkModeEnabledFromStorage = localStorage.getItem('darkModeEnabled');
		if (darkModeEnabledFromStorage !== null) {
		setDarkModeEnabled(JSON.parse(darkModeEnabledFromStorage));
		}

		if(!provider){
		window.alert("No Metamask Installed");
		window.location.replace("https://metamask.io");
		}

		connectWallet();
	}, []);

	const connectWallet = async () =>{
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		const getnetwork = await provider.getNetwork();
		const signer = await provider.getSigner();
		const signerAddress = signer.getAddress();
		const contract = new ethers.Contract(DecentraContractAddress,DecentraAbi.abi,signer);
      	const getUserDetail = await contract.getUser(signerAddress);

		if(getUserDetail.profile.name) {
			const loc_user = {
				active_account: signerAddress,
				name:getUserDetail.profile.name,
				avatar:getUserDetail.profile.avatar,
				banner:getUserDetail.profile.banner,
				age:getUserDetail.profile.age,
				gender:getUserDetail.profile.age,
				status:getUserDetail.profile.staus,
				country:getUserDetail.profile.country,
				city:getUserDetail.profile.city,
				occupation:getUserDetail.occupation,
				date_joined:getUserDetail.date_joined,
				followers:getUserDetail.followers,
				following:getUserDetail.following,
				user_following:getUserDetail.user_following,
				user_followed:getUserDetail.user_followed
			}
			window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		} else {
			const tmp = (await signerAddress).toString();
			const truncatedAddress = tmp.slice(0, 5);
			const currentDate = new Date();
			const options = { day: 'numeric', month: 'short', year: 'numeric' };
			const formattedDate = currentDate.toLocaleString('en-US', options);
			const loc_user = {
				active_account:(await signerAddress),
				name:`User${truncatedAddress}`,
				avatar:DefaultAvatar,
				banner:DefaultBanner,
				age:0,
				gender:"Sex",
				status:"Status",
				country:"Country",
				city:"City",
				occupation:"Occupation",
				date_joined:formattedDate,
				followers: 0,
				following: 0,
				user_following:[],
				user_followed:[],
			}
			window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		}
    }
	useEffect(() => {
		darktheme(darkModeEnabled);
	}, [darkModeEnabled]);

	return (
		<div className="App">
		{/* Sidebar */}
		<Sidebar />
		{/* Feed */}
		<Feed />
		{/* Widgets */}
		<Widgets />
		</div>
	);
}

export default App;
