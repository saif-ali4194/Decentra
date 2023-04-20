import { Navigate } from 'react-router-dom';
import "../styles/Pages/Authpage.css"
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockImage from "../Data/Images/Authorize.jpg"
import BackImg from "../Data/Images/back-Auth.jpg"

function Auth({active, setActive}) {
  const navigate = useNavigate();

  const connectWallet = async () => {
    // Detect whether the user has installed Metamask
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.enable();
        setActive(true);
      } catch (e) {
        alert("Oops! Something went wrong " + e);
      }
    } else {
      console.error('Please install Metamask to connect to Ethereum network');
    }
  };
  useEffect(() => {
    if (active) {
      navigate('/');
    }
  }, [active]);
  return (
    <div className='authpage'>
      <div className="connect-wrapper">
        <div className="heading">
        <img src={LockImage} id='lock'/>
        <h1>Authorize</h1>
        </div>
        {!active?<button className='auth-btn' onClick={connectWallet}>Connect</button> : <Navigate to="/" />}
      </div>
      
    </div>
  )
}

export default Auth
