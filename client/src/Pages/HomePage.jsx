import React from 'react'
import "../styles/Pages/HomePage.css"
import Posts from '../components/Posts'
import TweetBox from '../components/TweetBox';
import {User} from '../Test Data/CurrentUser';
function HomePage() {
  return (
    <div className='home-page'>
      {/* <h1>Home Page</h1> */}

      <TweetBox profile={User}/>
      <Posts/>
    </div>
  )
}

export default HomePage
