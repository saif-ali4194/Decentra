import React from 'react'
import "../styles/Pages/HomePage.css"
import Posts from '../components/Posts'
import TweetBox from '../components/TweetBox';
// import {User} from '../Test Data/CurrentUser';
import { _User } from '../Scripts/UserStorage';

function HomePage() {
  const loc_user = _User.getUserData();
  return (
    <div className='home-page'>
      {/* <h1>Home Page</h1> */}

      <TweetBox profile={loc_user}/>
      <Posts/>
    </div>
  )
}

export default HomePage
