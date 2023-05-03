import React from 'react'
import "../styles/Widgets.css"
import Trending from './Trending'
import RecommendationList from './RecommendationList'
import Search from './Search'
function Widgets() {
  return (
    <div className='widgets'>
      {/* <h3 >Widgets</h3> */}
      <Search/>
      <Trending/>
      <RecommendationList/>
    </div>
  )
}

export default Widgets
