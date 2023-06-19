import React, { useEffect, useState } from 'react'
import "../../styles/SubSettingsComponents/Account.css"
import EditIcon from '@mui/icons-material/Edit';
import { _User } from '../../Scripts/UserStorage';
import config from '../../config';
import DecentraAbi from '../../abi/Decentra.json';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';	
import { Web3Storage } from 'web3.storage';
import { useNotification } from "@web3uikit/core";

function Account() {
	/* --to show notification-- */
	const notification = useNotification();

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

	/* --APIs used store data in blockchain and ipfs-- */
	const Web3StorageApi = config.REACT_APP_WEB3STORAGE_API_KEY;
	const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;

	/* --User modifiable fields-- */
	const [name, setName] = useState(loc_user.name);
	const [age, setAge] = useState(loc_user.age);
	const [gender, setGender] = useState(loc_user.gender);
	const [status, setStatus] = useState(loc_user.status);
	const [country, setCountry] = useState(loc_user.country);
	const [city, setCity] = useState(loc_user.city);
	const [occupation, setOccupation] = useState(loc_user.occupation);
	const [avatar, setAvatar] = useState(loc_user.avatar); // initially avatar url & for avatar file array
	const [banner, setBanner] = useState(loc_user.banner); // initially banner url & for banner file array
	const [prev_avatar, setPrevAvatar] = useState(null); // preview avatar
	const [prev_banner, setPrevBanner] = useState(null); // preview banner
	const [chk_avatar, setChkAvatar] = useState(false); // check if avatar is changed
	const [chk_banner, setChkBanner] = useState(false); // check if banner is changed
	const [disable, setDisable] = useState(false);

	const minAge = 15;
	const maxAge = 100;
	/* --Ensuring states have the latest value-- */
	useEffect(() => {
		setAvatar(loc_user.avatar);
		setBanner(loc_user.banner);
	  }, [loc_user.avatar, loc_user.banner]);
	
	/* --Change Events for all fields-- */
	const handleNameChange = (event) => {
		if(event.target.value == "") setDisable(true);
		else setDisable(false);
		setName(event.target.value);
	};

	const handleAgeChange = (event) => {
		const enteredAge = parseInt(event.target.value, 10); // Parse the entered value as an integer

		// Check if the enteredAge is within the valid range
		const isInvalidAge = enteredAge < minAge || enteredAge > maxAge;
			setAge(event.target.value);
			console.log(isInvalidAge)
		setDisable(isInvalidAge);
		if(event.target.value == "") setDisable(true);
	};

	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	const handleCountryChange = (event) => {
		if(event.target.value == "") setDisable(true);
		else setDisable(false);
		setCountry(event.target.value);
	};

	const handleCityChange = (event) => {
		if(event.target.value == "") setDisable(true);
		else setDisable(false);
		setCity(event.target.value);
	};

	const handleOccupationChange = (event) => {
		if(event.target.value == "") setDisable(true);
		else setDisable(false);
		setOccupation(event.target.value);
	};

	const handleAvatarChange = (event) => {
		try {
			if(event !=null){
				setAvatar(event.target.files); //file array
				setPrevAvatar(URL.createObjectURL(event.target.files[0]));
				setChkAvatar(true);
			}
		} catch(e) {
			notification({
				type: 'info',
				message: 'Please Select a File',
				title: 'Notification',
				position: 'topR',
				style: {
					backgroundColor: 'var(--background-color)', // Set the desired background color
				  },
			});
		}
		
		
	};

	const handleBannerChange = (event) => {
		try {
			if(event != null) {
				setBanner(event.target.files); //file array
				setPrevBanner(URL.createObjectURL(event.target.files[0]));
				setChkBanner(true);
			}
		} catch(e) {
			notification({
				type: 'info',
				message: 'Please Select a File',
				title: 'Notification',
				position: 'topR',
				style: {
					backgroundColor: 'var(--background-color)', // Set the desired background color
				  },
			});
		}
		
	};

	/* --Storing data in ipfs-- */
	async function storeFile (selectedFile) {
		try {
			const client = new Web3Storage({token: Web3StorageApi});
			const rootCid = await client.put(selectedFile);
			let ipfsUploadedUrl = `https://${rootCid}.ipfs.dweb.link/${selectedFile[0].name}`;
			return ipfsUploadedUrl;
		} catch(e) {
			alert("OOPS :(\n" + e);
		}
		
	}

	/* --Updating user when save btn is clicked-- */
	async function updateUser() {
		let bannerURL = null;
		let avatarURL = null;
		setDisable(true);

		if (avatar !== null && avatar !== undefined && chk_avatar) {
			 avatarURL = await storeFile(avatar);
		}
		if (banner !== null && banner !== undefined && chk_banner) {
			 bannerURL = await storeFile(banner);
		}
		
		// creating new user object
		const profile = {
			name:name,
			avatar:avatarURL !== null ? avatarURL : loc_user.avatar,
			banner:bannerURL !== null ? bannerURL : loc_user.banner,
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

		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.BrowserProvider(connection);
		const getnetwork = await provider.getNetwork();
		const signer = await provider.getSigner();
		const signerAddress = await signer.getAddress();
		const contract = new ethers.Contract(DecentraContractAddress,DecentraAbi.abi,signer);
		
		const transaction = await contract.updateUser(userDetails);
		_User.setUserLocalStorage(userDetails, loc_user.active_account);

		// Show sccuess notification
		notification({
			type: 'success',
			message: 'Profile Updated Successfully',
			title: 'New Notification',
			position: 'topR',
			style: {
				backgroundColor: 'var(--background-color)', // Set the desired background color
			  },
		});
		setDisable(false);
		setPrevAvatar(null);
		setPrevBanner(null);
	}


	return (
		<div className='account'>
		<div className="account_header">Account</div>
		<div className="form-images" style={{backgroundImage: `url(${banner})`}}>
			<div id="form-avatar" style={{backgroundImage: `url(${avatar})`}}></div>
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
			<input type="number" value={age} onChange={handleAgeChange}  />
			</div>
			<div className='form-triplet'>
			<label>Gender</label>
			<select value={gender} onChange={handleGenderChange} className='dropdown-options'>
				<option value="" hidden>
    				{gender ? gender : "Select"}
  				</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>
			{/* <input type="text" value={gender} onChange={handleGenderChange} /> */}
			</div>
			<div className='form-triplet'>
			<label>Status</label>
			<select value={status} onChange={handleStatusChange} className='dropdown-options'>
				<option value="" hidden>
    				{status ? status : "Select"}
  				</option>
				<option value="Single">Single</option>
				<option value="Married">Married</option>
				<option value="In relationship">In relationship</option>
			</select>
			{/* <input type="text" value={status} onChange={handleStatusChange} /> */}
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
					<div id="close-profile-preview" onClick={() => {setPrevAvatar(null); setPrevBanner(null)}}>X</div>
					<div className="prev_avatar" style={{ backgroundImage: `url(${prev_avatar})`}}></div>
				</div>
			}
		</div>

		<div className="form-save"><button onClick={updateUser} disabled={disable}>Save</button></div>
		</div>
	)
}

export default Account
