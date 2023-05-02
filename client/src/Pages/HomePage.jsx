import React from 'react'
import "../styles/Pages/HomePage.css"
import Posts from '../components/Posts'
function HomePage() {
  return (
    <div className='home-page'>
      {/* <h1>Home Page</h1> */}
      <Posts/>
    </div>
  )
}

export default HomePage
