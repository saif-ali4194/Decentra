import React from 'react'
import "../styles/Pages/HomePage.css"
import TweetBox from '../components/TweetBox'
function HomePage() {
  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <TweetBox/>
    </div>
  )
}

export default HomePage
