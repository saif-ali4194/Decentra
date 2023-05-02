import React from 'react'
import "../styles/Widgets.css"
import Trending from './Trending'
function Widgets() {
  return (
    <div className='widgets'>
      {/* <h3 >Widgets</h3> */}
      <Trending trendAmount={4}/>
    </div>
  )
}

export default Widgets
