import React, { useEffect, useRef, useState } from 'react'
import "../styles/Pages/Auth.css"
import Logo from "../Data/Images/logo.png"
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import DefaultAvatar from "../Data/Images/avatar.jpg"
import DefaultBanner from "../Data/Images/banner.png"
import net from "../Data/Images/net.jpg"
import anime from 'animejs'
import { _User } from '../Scripts/UserStorage.js';
import { _Auth } from '../Scripts/UserStorage.js';


function Auth({setIsAuthenticated}) {
	/* --getting local user data-- */
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

	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
	const connectWallet = async () =>{
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		const getnetwork = await provider.getNetwork();
		const signer = await provider.getSigner();
		const signerAddress = await signer.getAddress();
		const contract = new ethers.Contract(DecentraContractAddress,DecentraAbi.abi,signer);
      	const getUserDetail = await contract.getUser(signerAddress);

		let is_default = _User.setUserLocalStorage(getUserDetail, signerAddress);
		if(is_default) {
			const profile = {
				name: loc_user.name,
				avatar:loc_user.avatar,
				banner:loc_user.banner,
				age:loc_user.age,
				gender:loc_user.gender,
				status:loc_user.status,
				country:loc_user.country,
				city:loc_user.city,
			}
			const userDetails = {
				userAddress: signerAddress,
				profile: profile,
				occupation: loc_user.occupation,
				date_joined: loc_user.date_joined,
				followers: loc_user.followers,
				following: loc_user.following,
				user_following: loc_user.user_following,
				user_followed: loc_user.user_followed
			}
			await contract.createUser(userDetails);
		}
		
		_Auth.set_auth(true);
		setIsAuthenticated(true);
    }

	const btnCircleRef = useRef(null);

	useEffect(() => {
		// Fade-in animation for the circular button
		anime({
		  targets: btnCircleRef.current,
		  opacity: [0, 1],
		  easing: 'easeInOutQuad',
		  duration: 1000,
		  autoplay: true,
		rotate: {
			value: 360,
			duration: 1800,
			easing: 'easeInOutSine'
		  }, 
		});
		const buttonElement = btnCircleRef.current;
		const handleMouseEnter = () => {
			anime({
			  targets: buttonElement,
			  scale: 1.2,
			  duration: 500,
			  easing: 'easeOutCubic'
			});
		  };
	  
		  const handleMouseLeave = () => {
			anime({
			  targets: buttonElement,
			  scale: 1,
			  duration: 500,
			  easing: 'easeOutCubic'
			});
		  };
	  
		  buttonElement.addEventListener('mouseenter', handleMouseEnter);
		  buttonElement.addEventListener('mouseleave', handleMouseLeave);
	  
		  return () => {
			buttonElement.removeEventListener('mouseenter', handleMouseEnter);
			buttonElement.removeEventListener('mouseleave', handleMouseLeave);
		  };
	  }, []);

  return (
    <div className='auth' style={{backgroundImage: `url(${net})`, backgroundPosition: 'cover', backgroundRepeat: 'no-repeat' }}>
    	<div id="auth-left">
			<div className="auth-heading" >
				<img src={Logo} alt="Decentra"/>
				<h1>Decentra</h1>
			</div>
			<p>
			Introducing Decentra, the decentralized social media platform that puts you
			in control. Connect with friends, share your thoughts, and discover 
			 trends securely. With Decentra, privacy is a priority, ensuring your data remains safe. 
			 Say goodbye to breaches and hello to a new era of social networking. 
			 <br /><br/> Join us today and experience the power of decentralization firsthand.                          
			</p>
		</div>
        <div id="auth-right">
			<h6>Connect wallet</h6>
			<div id="auth-connect-div"  ref={btnCircleRef}  onClick={connectWallet}>GO</div>
		</div>
    </div>
  )
}

export default Auth
