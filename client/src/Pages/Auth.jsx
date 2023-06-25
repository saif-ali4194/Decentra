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
import TermsModal from '../Modals/TermsModal';

function Auth({setIsAuthenticated}) {
	const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const noti = {
		txt: `Login activity detected at ${currentDate.toLocaleTimeString()} on ${currentDate.toLocaleDateString(undefined, options)}`,
		img: "../Data/Images/logo.png",
	};
	
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
		// let userFollowing = (getUserDetail.user_following != 0 )? getUserDetail.user_following : [];
		// let userFollowed = (getUserDetail.user_followed != 0 ) ? getUserDetail.user_followed : [];
		let is_default = _User.setUserLocalStorage(getUserDetail, signerAddress);
		if(is_default) {
			const profile = {
				name: _User.getUserData().name,
				avatar:_User.getUserData().avatar,
				banner:_User.getUserData().banner,
		 		age:_User.getUserData().age,
				gender:_User.getUserData().gender,
				status:_User.getUserData().status,
				country:_User.getUserData().country,
				city:_User.getUserData().city,
			}
			const userDetails = {
				userAddress: signerAddress,
				profile: profile,
				occupation: _User.getUserData().occupation,
				date_joined: _User.getUserData().date_joined,
				followers: _User.getUserData().followers,
				following: _User.getUserData().following,
				user_following: _User.getUserData().user_following,
				user_followed: _User.getUserData().user_followed
			}
			await contract.createUser(userDetails);
		}
	
		await contract.addNotification(signerAddress, noti.txt, noti.img);
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
			  scale: 1.1,
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


		const [termsChecked, setTermsChecked] = useState(false);
	  
		const handleCheckboxChange = () => {
		  setTermsChecked(!termsChecked);
		};

		const [isModalOpen, setIsModalOpen] = useState(false);

		const openModal = () => {
		  setIsModalOpen(true);
		};
	  
		const closeModal = () => {
		  setIsModalOpen(false);
		};

  return (
    // <div className='auth' style={{backgroundImage: `url(${net})`, backgroundPosition: 'cover', backgroundRepeat: 'no-repeat' }}>
    // 	<div id="auth-left">
	// 		<div className="auth-heading" >
	// 			<img src={Logo} alt="Decentra"/>
	// 			<h1>Decentra</h1>
	// 		</div>
	// 		<p>
	// 		Introducing Decentra, the decentralized social media platform that puts you
	// 		in control. Connect with friends, share your thoughts, and discover 
	// 		 trends securely. With Decentra, privacy is a priority, ensuring your data remains safe. 
	// 		 Say goodbye to breaches and hello to a new era of social networking. 
	// 		 <br /><br/> Join us today and experience the power of decentralization firsthand.                          
	// 		</p>
	// 	</div>
    //     <div id="auth-right">
	// 		<h6>Connect wallet</h6>
	// 		<div id="auth-connect-div"  ref={btnCircleRef}  onClick={connectWallet}>GO</div>
	// 	</div>
    // </div>
	<div className="auth">
		<div className="auth-heading" >
	 			<img src={Logo} alt="Decentra"/>
	 			<h1>Decentra</h1>
	 	</div>
		<div className="Hero">
			<div className="H-left" style={{backgroundImage: `url(${net})`, backgroundPosition: 'cover', backgroundRepeat: 'no-repeat' }}></div>
			<div className="H-right">
				<span className='auth-Header'>Signin</span>
			
			<div className="H-wrapper">
				<div id="Tac">
					<input
						type="checkbox"
						checked={termsChecked}
						onChange={handleCheckboxChange}
					/>
					<span onClick={openModal}>
						I agree to the terms & conditions
					</span>
				</div>
				
				<button className={termsChecked ? 'auth-connect-div' : 'disabled-button'}  
					disabled={!termsChecked} ref={btnCircleRef}  
					onClick={connectWallet} >connect</button></div>
			</div>
			
		</div>
		{isModalOpen && <TermsModal closeModal={closeModal} />}
	</div>
  )
}

export default Auth
