import React, { useEffect, useState } from 'react'
import "../styles/Pages/NotificationPage.css"
import { NotificationsList } from '../Test Data/NotificationData'
import NotificationUnit from '../components/NotificationUnit'
import { ethers } from 'ethers';
import DecentraAbi from '../abi/Decentra.json';
import config from '../config.js';
import Web3Modal from 'web3modal';
import { _User } from '../Scripts/UserStorage.js';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const DecentraContractAddress = config.REACT_APP_DECENTRA_CONTRACT_ADDRESS;
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
  useEffect(() => {
    const fetchNotifications = async () => {
      console.log("noti hard")
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      let provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const contract = new ethers.Contract(DecentraContractAddress, DecentraAbi.abi, signer);
  
      const userNotifications = await contract.getUserNotifications(_User.getUserData().active_account);
      
      let tmp_noti = [];
      //Update the state with the fetched users
      for(let i=0; i<userNotifications.length; i++) {
        const notification = userNotifications[i];
        const noti = {
          id: notification.id,
          text: notification.text, 
          image: notification.image,
        }
        tmp_noti.push(noti);
      }
      setNotifications(tmp_noti);
    };
      
      fetchNotifications();
       
    }, [loc_user.user_followed]);
  
  return (
    <div className='notification-page'>
      <div className="noti-header">Notifications</div>
      <div className='noti-list'>
          { notifications.slice().reverse().map(notification => (
            <NotificationUnit key={notification.id} img={notification.image} text={notification.text}/>
          ))
        }
      </div>
    </div>
  )
}

export default NotificationPage
