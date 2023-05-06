import React from 'react'
import "../styles/Pages/ExplorePage.css"
import Search from '../components/Search';
import Trending from '../components/Trending';
import Posts from '../components/Posts';

function ExplorePage() {
  return (
    <div className='explore-page'>
      <Search/>
      <Trending/>
      <div className='gap-border'></div>
      <Posts/>
      
    </div>
  )
}

export default ExplorePage
