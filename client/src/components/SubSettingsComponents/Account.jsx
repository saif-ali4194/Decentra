import React, { useState } from 'react'
import "../../styles/SubSettingsComponents/Account.css"
// import {User} from "../../Test Data/CurrentUser"
import DefaultAvatar from "../../Data/Images/avatar.jpg"
import EditIcon from '@mui/icons-material/Edit';
import { _User } from '../../Scripts/UserStorage';

function Account() {
  const loc_user = _User.getUserData();

  const [name, setName] = useState(loc_user.name);
  const [age, setAge] = useState(loc_user.age);
  const [gender, setGender] = useState(loc_user.gender);
  const [status, setStatus] = useState(loc_user.status);
  const [country, setCountry] = useState(loc_user.country);
  const [city, setCity] = useState(loc_user.city);
  const [occupation, setOccupation] = useState(loc_user.occupation);
  const [avatar, setAvatar] = useState(loc_user.avatar);
  const [banner, setBanner] = useState(loc_user.banner);

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
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const handleBannerChange = (event) => {
    setBanner(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className='account'>
       <div className="account_header">Account</div>
       <div className="form-images" style={{backgroundImage: `url(${banner})`}}>
        <div id="form-avatar" style={{backgroundImage: `url(${avatar || DefaultAvatar})`}}></div>
       </div>
      <h6><span>AccountID:</span> {loc_user.account_id}</h6>
      
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
       </div>

       <div className="form-save"><button>Save</button></div>
    </div>
  )
}

export default Account
