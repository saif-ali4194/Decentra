import React from 'react';
import "../styles/Pages/HomePage.css";
import TweetBox from '../components/TweetBox';
import {User} from '../Test Data/CurrentUser';
function HomePage() {
  return (
    <div className='home-page'>
      {/* <h1>Home Page</h1> */}
      <TweetBox profile={User}/>
    </div>
  )
}

export default HomePage
