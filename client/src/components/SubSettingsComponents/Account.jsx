import React, { useEffect, useState } from 'react'
import "../../styles/SubSettingsComponents/Account.css"
// import {User} from "../../Test Data/CurrentUser"
import DefaultAvatar from "../../Data/Images/avatar.jpg"
import EditIcon from '@mui/icons-material/Edit';
import { _User } from '../../Scripts/UserStorage';
import config from '../../config';
import DecentraAbi from '../../abi/Decentra.json';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';	
import { Web3Storage } from 'web3.storage';

function Account() {
	const loc_user = _User.getUserData();
	const Web3StorageApi = config.REACT_APP_WEB3STORAGE_API_KEY;
	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;

	const [name, setName] = useState(loc_user.name);
	const [age, setAge] = useState(loc_user.age);
	const [gender, setGender] = useState(loc_user.gender);
	const [status, setStatus] = useState(loc_user.status);
	const [country, setCountry] = useState(loc_user.country);
	const [city, setCity] = useState(loc_user.city);
	const [occupation, setOccupation] = useState(loc_user.occupation);
	const [avatar, setAvatar] = useState(loc_user.avatar);
	const [banner, setBanner] = useState(loc_user.banner);
	const [prev_avatar, setPrevAvatar] = useState(null);
	const [prev_banner, setPrevBanner] = useState(null);
	const [tmp_avatar, setTmpAvatar] = useState();

	useEffect(() => {
		setAvatar(loc_user.avatar);
		setBanner(loc_user.banner);
	  }, [loc_user.avatar, loc_user.banner]);

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

	const handleAvatarChange = (event) => {
		// setAvatar(URL.createObjectURL(event.target.files[0]));
		if(event !=null){
            // setAvatar(event);
			setTmpAvatar(event);
			setPrevAvatar(URL.createObjectURL(event.target.files[0]));
        }
		
	};

	const handleBannerChange = (event) => {
		if(event != null) {
		setBanner(event);
		setPrevBanner(URL.createObjectURL(event.target.files[0]));
		}
	};


	async function storeFile (selectedFile) {
		try {
			const client = new Web3Storage({token: Web3StorageApi});
			const rootCid = await client.put(selectedFile);
			let ipfsUploadedUrl = `https://${rootCid}.ipfs.dweb.link/${selectedFile[0].name}`;
			return ipfsUploadedUrl;
		} catch(e) {
			alert("UnExpected Error: " + e);
		}
		
	}

	async function updateUser() {
		const loc_user = _User.getUserData(); // get current user data
		console.log("Avatar: " + avatar);
		console.log("Banner: " + banner);
		console.log("LAvatar: " + loc_user.avatar);
		console.log("LBanner: " + loc_user.banner);
		// hidding preview
		// storing banner and avatar in ipfs, setting lattest URL in usestate
		// if(avatar !== null) {
		// 	let avatarURL = await storeFile([avatar]);
		// 	setAvatar(avatarURL);
		// 	console.log(tmp_avatar);
		// }
		// if(banner !== null) {
		// 	let bannerURL = await storeFile([banner]);
		// 	setBanner(bannerURL);
		// }
		// creating new user object
		const profile = {
			name:name,
			avatar:avatar,
			banner:banner,
			age:age,
			gender:gender,
			status:status,
			country:country,
			city:city,
		}
		const userDetails = {
			profile: profile,
			occupation: occupation,
			date_joined: loc_user.date_joined,
			followers: loc_user.followers,
			following: loc_user.following,
			user_following: loc_user.user_following,
			user_followed: loc_user.user_followed
		}
		console.log(userDetails);
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		const getnetwork = await provider.getNetwork();
		const signer = await provider.getSigner();
		const signerAddress = await signer.getAddress();
		const contract = new ethers.Contract(DecentraContractAddress,DecentraAbi.abi,signer);
		const transaction = await contract.updateUser(userDetails);
		console.log(transaction);
		_User.setUserLocalStorage(userDetails, loc_user.active_account);
		alert("successfull");
		setPrevAvatar(null);
		setPrevBanner(null);
	}
	return (
		<div className='account'>
		<div className="account_header">Account</div>
		<div className="form-images" style={{backgroundImage: `url(${banner})`}}>
			<div id="form-avatar" style={{backgroundImage: `url(${avatar || DefaultAvatar})`}}></div>
		</div>
		<h6><span>AccountID:</span> {loc_user.active_account}</h6>
		
		<div className="form">
			<h6><EditIcon />Edit Profile:</h6>
			<div className="form-fields">
			<div className='form-duo'>
				<label>Name</label>
				<input type="text" value={name} onChange={handleNameChange} />
			</div>
			<div className='form-duo'>
				<label>Occupation</label>
				<input type="text" value={occupation} onChange={handleOccupationChange} />
			</div>
			</div>

			<div className="form-fields">
			<div className='form-triplet'>
			<label>Age</label>
			<input type="number" value={age} onChange={handleAgeChange} />
			</div>
			<div className='form-triplet'>
			<label>Gender</label>
			<input type="text" value={gender} onChange={handleGenderChange} />
			</div>
			<div className='form-triplet'>
			<label>Status</label>
			<input type="text" value={status} onChange={handleStatusChange} />
			</div>    
			</div>

			<div className="form-fields">
			<div className='form-duo'><label>City</label>
			<input type="text" value={city} onChange={handleCityChange} /></div>
			<div className='form-duo'>
			<label>Country</label>
			<input type="text" value={country} onChange={handleCountryChange} /> 
			</div>
			</div>

			<div className="form-fields">
				<div className='form-duo'>
					<label>Avatar</label>
					<input type="file" accept="image/*" onChange={handleAvatarChange} />
				</div>
				<div className='form-duo'>
					<label>Banner</label>
					<input type="file" accept="image/*" onChange={handleBannerChange} />
				</div>
			</div>
			{(prev_banner || prev_avatar)&&
				<div className="prev-banner" style={{ backgroundImage: `url(${prev_banner})`}}>
					<div className="prev_avatar" style={{ backgroundImage: `url(${prev_avatar})`}}></div>
				</div>
			}
		</div>

		<div className="form-save"><button onClick={updateUser}>Save</button></div>
		</div>
	)
}

export default Account
