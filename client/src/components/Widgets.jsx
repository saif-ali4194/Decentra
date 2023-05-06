import React from 'react'
import "../styles/Widgets.css"
import Trending from './Trending'
import RecommendationList from './RecommendationList'
import Search from './Search'
import { useLocation } from 'react-router-dom'
function Widgets() {
  const location =useLocation();
  return (
    <div className='widgets'>
      {/* <h3 >Widgets</h3> */}
      
      {location.pathname !== "/explore" && <Search/>}
      {location.pathname !== "/explore" && <Trending trendAmount={4}/>}
      
      <RecommendationList/>
    </div>
  )
}

export default Widgets
