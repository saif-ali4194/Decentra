import React, { useEffect, useState } from 'react'
import "../styles/Modals/Boarding.css"

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import { _User } from '../Scripts/UserStorage.js';
import { _Auth } from '../Scripts/UserStorage.js';
import { useNotification } from "@web3uikit/core";
import { useNavigate } from 'react-router-dom';

import DefaultAvatar from "../Data/Images/avatar.jpg"
import DefaultBanner from "../Data/Images/banner.png"
import { calculateAge } from '../Scripts/ageCalculator';

function Boarding({closeOnboardingModal, setIsAuthenticated}) {
	const navigate = useNavigate();
	const notification = useNotification();

	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [status, setStatus] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [occupation, setOccupation] = useState("");
	const [disable, setDisable] = useState(true);
	const isAnyFieldEmpty = () => {
		if (
		  name === "" ||
		  age === "" ||
		  gender === "" ||
		  status === "" ||
		  country === "" ||
		  city === "" ||
		  occupation === "" ||
		  (calculateAge(age) > 100 || calculateAge(age) < 15)
		) {
		  return true;
		}
		return false;
	  };

	  const noti = {
		txt: `Hi ${name}! congratulations on becoming a Decentrian, we are happy to have you ❤`,
		img: "../Data/Images/logo.png",
	};
	const checkUserExists = (signerAddress, userAddresses) => {
		console.log(userAddresses);
		return userAddresses.includes(signerAddress);
	};
	
	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;

	const createUser = async () =>{
		setDisable(true);
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

		if(userExists) {
			notification({
				type: 'info',
				message: 'You already have an account, please connect!',
				title: 'Notification',
				position: 'topR',
				style: {
					backgroundColor: 'var(--background-color)', // Set the desired background color
				  },
			});
			setDisable(false);
			closeOnboardingModal();
			navigate("/login");
		} else {
			
			const currentDate = new Date();
			const options = { day: 'numeric', month: 'short', year: 'numeric' };
			const formattedDate = currentDate.toLocaleString('en-US', options);
			const profile = {
				name: name,
				avatar: DefaultAvatar,
				banner:DefaultBanner,
		 		age: age,
				gender: gender,
				status: status,
				country: country,
				city: city,
			}
			const userDetails = {
				userAddress: signerAddress,
				profile: profile,
				occupation: occupation,
				date_joined: formattedDate,
				followers: 0,
				following: 0,
				user_following: [],
				user_followed: []
			}
			_User.setUser(userDetails);
			await contract.createUser(userDetails);
			await contract.addNotification(signerAddress, noti.txt, noti.img);
			setIsAuthenticated(true);
			setDisable(false);
			navigate("/");
		}
	}

	/* --Change Events for all fields-- */
	
	useEffect(() => {
		console.log("here usereffect");
		setDisable(isAnyFieldEmpty());
	}, [name, age, gender, status, country, city, occupation]);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleAgeChange = (event) => {
		setAge(event.target.value);
	};

	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleOccupationChange = (event) => {
		setOccupation(event.target.value);
	};
  return (
    <div className='onBoarding'>   
        <span id="OB-title">Tell us about yourself!</span>
        <div className="OB-form">
			<div className="OB-col">
				<label>Name</label>
				<input type="text" value={name} onChange={handleNameChange} required maxLength="16"/>
			</div>
			
			<div className="OB-row">
				<div className="OB-col">
					<label>DOB</label>
					<input type="date" value={age} onChange={handleAgeChange} className="date-input"  min="1930-01-01" max="2007-12-31" required/>
				</div>
				
				<div className="OB-col">
					<label>Gender</label>
					<select value={gender} onChange={handleGenderChange} className='dropdown-options' required>
						<option value="" hidden>
							{gender ? gender : "Select"}
						</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				
				<div className="OB-col">
				<label>Status</label>
				<select value={status} onChange={handleStatusChange} className='dropdown-options' required>
					<option value="" hidden>
						{status ? status : "Select"}
					</option>
					<option value="Single">Single</option>
					<option value="Married">Married</option>
					<option value="In relationship">In relationship</option>
				</select>

				</div>
			</div>
			
			<div className="OB-col">
				<label>Occupation</label>
				<input type="text" value={occupation} onChange={handleOccupationChange} maxLength="25"/>
			</div>
			
			<div className="OB-row">
				<div className='OB-col'><label>City</label>
				<input type="text" value={city} onChange={handleCityChange} required maxLength="12"/></div>
				<div className='OB-col'>
				<label>Country</label>
				<input type="text" value={country} onChange={handleCountryChange} required maxLength="12"/> 
				</div>
			</div>

			<div className="OB-row">
			<button onClick={closeOnboardingModal}>close</button>
			<button disabled={disable || isAnyFieldEmpty()} onClick={createUser}>Create</button>
			</div>
		</div>
    </div>
  )
}

export default Boarding