import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { useEffect, useState } from 'react';
import { darktheme } from './styles/Darktheme';
import config from './config.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './Pages/Auth';
// For Backend
import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DecentraAbi from './abi/Decentra.json';
// import { _User } from './Scripts/UserStorage';
import { _Auth, _User } from './Scripts/UserStorage.js';

// const apiKey = config.REACT_APP_WEB3STORAGE_API_KEY;
//main
function App() {
	const [darkModeEnabled, setDarkModeEnabled] = useState(true);
	// ----------- AUTH ------------ //
	const [isAuthenticated,setIsAuthenticated] = useState(false);
	const [provider,setProvider] = useState(window.ethereum);
	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
	const navigate = useNavigate();
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
		// setIsAuthenticated(_Auth.get_auth());

		// connectWallet();
	}, []);

	// const connectWallet = async () =>{
	// 	const web3Modal = new Web3Modal();
	// 	const connection = await web3Modal.connect();
	// 	let provider = new ethers.BrowserProvider(connection);
	// 	const getnetwork = await provider.getNetwork();
	// 	const signer = await provider.getSigner();
	// 	const signerAddress = signer.getAddress();
	// 	const contract = new ethers.Contract(DecentraContractAddress,DecentraAbi.abi,signer);
    //   	const getUserDetail = await contract.getUser(signerAddress);

	// 	setUserLocalStorage(getUserDetail, signerAddress);
	// 	setIsAuthenticated(true);
    // }
	useEffect(() => {
		darktheme(darkModeEnabled);
	}, [darkModeEnabled]);


	if(isAuthenticated) {
		return (
			<div className="App">
					
				<>
				<Sidebar setIsAuthenticated={setIsAuthenticated} />
				<Feed />
				<Widgets />
				</>	
			</div>
		);
	} else {
		return (
			<div className="App">				
				<Auth setIsAuthenticated={setIsAuthenticated} />
			</div>
		);
	}
	
	
}

export default App;
