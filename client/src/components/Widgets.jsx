import React from 'react'
import "../styles/Widgets.css"
import Trending from './Trending'
import RecommendationList from './RecommendationList'

function Widgets() {
  return (
    <div className='widgets'>
      {/* <h3 >Widgets</h3> */}
      <Trending/>
    </div>
  )
}

export default Widgets
