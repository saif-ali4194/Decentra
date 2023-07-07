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
// import anime from 'animejs'
import { _User } from '../Scripts/UserStorage.js';
import { _Auth } from '../Scripts/UserStorage.js';
import TermsModal from '../Modals/TermsModal';
import Boarding from '../Modals/Boarding';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from "@web3uikit/core";


function Auth({setIsAuthenticated}) {
	const navigate = useNavigate();
	const notification = useNotification();
	const currentDate = new Date();
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const noti = {
		txt: `Login activity detected at ${currentDate.toLocaleTimeString()} on ${currentDate.toLocaleDateString(undefined, options)}`,
		img: "../Data/Images/logo.png",
	};
	
	const checkUserExists = (signerAddress, userAddresses) => {
		console.log(userAddresses);
		return userAddresses.includes(signerAddress);
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

		const addresses = await contract.getUserAddresses();
		const addressArray = Object.values(addresses).filter((value) => typeof value === 'string');

		const userExists = checkUserExists(signerAddress, addressArray);

		if(!userExists) {
			notification({
				type: 'info',
				message: 'You dont have an account, please create an account!',
				title: 'Notification',
				position: 'topR',
				style: {
					backgroundColor: 'var(--background-color)', // Set the desired background color
				  },
			});
			navigate("/signup");
		} else {
			const getUserDetail = await contract.getUser(signerAddress);
			_User.setUserLocalStorage(getUserDetail, signerAddress);
			await contract.addNotification(signerAddress, noti.txt, noti.img);
			_Auth.set_auth(true);
			setIsAuthenticated(true);
			sessionStorage.setItem("isAuth", true);
			navigate("/");
		}
    }

	// const btnCircleRef = useRef(null);

	// useEffect(() => {
	// 	// Fade-in animation for the circular button
	// 	anime({
	// 	  targets: btnCircleRef.current,
	// 	  opacity: [0, 1],
	// 	  easing: 'easeInOutQuad',
	// 	  duration: 1000,
	// 	  autoplay: true,
	// 	rotate: {
	// 		value: 360,
	// 		duration: 1800,
	// 		easing: 'easeInOutSine'
	// 	  }, 
	// 	});
	// 	const buttonElement = btnCircleRef.current;
	// 	const handleMouseEnter = () => {
	// 		anime({
	// 		  targets: buttonElement,
	// 		  scale: 1.1,
	// 		  duration: 500,
	// 		  easing: 'easeOutCubic'
	// 		});
	// 	  };
	  
	// 	  const handleMouseLeave = () => {
	// 		anime({
	// 		  targets: buttonElement,
	// 		  scale: 1,
	// 		  duration: 500,
	// 		  easing: 'easeOutCubic'
	// 		});
	// 	  };
	  
	// 	  buttonElement.addEventListener('mouseenter', handleMouseEnter);
	// 	  buttonElement.addEventListener('mouseleave', handleMouseLeave);
	  
	// 	  return () => {
	// 		buttonElement.removeEventListener('mouseenter', handleMouseEnter);
	// 		buttonElement.removeEventListener('mouseleave', handleMouseLeave);
	// 	  };
	//   }, []);


		const [termsChecked, setTermsChecked] = useState(false);
	  
		const handleCheckboxChange = () => {
		  setTermsChecked(!termsChecked);
		};

		const [isModalOpen, setIsModalOpen] = useState(false);
		const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

		const openModal = () => {
		  setIsModalOpen(true);
		};
	  
		const closeModal = () => {
		  setIsModalOpen(false);
		};

		const openOnboardingModal = () => {
			setIsOnboardingModalOpen(true);
		  };
		
		  const closeOnboardingModal = () => {
			setIsOnboardingModalOpen(false);
		  };
	function changePathLogin() {
		navigate("/login")
	}

	function changePathSignup() {
		navigate("/signup")
	}

	const location = useLocation();
	const pathname = location.pathname;
	const [path, setPath] = useState(pathname);
	useEffect(() => {
		const pathParts = pathname.split('/');
    	setPath(pathParts[1]);
	}, [pathname]);

	useEffect(() => {
		if(path !== "signup" && path !== '')
			navigate("/login");
	}, [path]);
	return (
	<div className="auth">
		<div className="auth-heading" >
				<img src={Logo} alt="Decentra"/>
				<h1>Decentra</h1>
		</div>

		<div className="Hero">
			<div className="H-left" style={{backgroundImage: `url(${net})`, backgroundPosition: 'cover', backgroundRepeat: 'no-repeat' }}></div>
			
			{path === "login" ? (
				<div className="H-right">
				<span className='auth-Header'>Login</span>
			
			<div className="H-wrapper">
				<button className={ 'auth-connect-div' }  
					  
					onClick={connectWallet} >connect</button>

				<span id="auth-change" onClick={changePathSignup}>Need have an account?</span>
				</div>
			</div>
		) : path == "signup" &&
			<div className="H-right">
				<span className='auth-Header'>Signup</span>
			
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
					disabled={!termsChecked}  
					onClick={openOnboardingModal} >Join</button>
				<span id="auth-change" onClick={changePathLogin}>Already have an account?</span>	
				</div>
				
			</div>
		} 

		</div>
		{isModalOpen && <TermsModal closeModal={closeModal} />}
		{isOnboardingModalOpen && <Boarding closeOnboardingModal = {closeOnboardingModal} setIsAuthenticated={setIsAuthenticated} />}
	</div>
	)
}

export default Auth
