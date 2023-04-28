import React from 'react'
import "../styles/Pages/CommunityPage.css"
import { useState } from 'react';

function CommunityPage() {
  const [activeSection, setActiveSection] = useState('com-followers');

  const handleClick = (section) => {
    setActiveSection(section);
  }
  return (
    <div className='community-page'>
      <div className="com_header">
        <div 
          className={`com-followers ${activeSection === 'com-followers' ? 'active-section' : ''}`} onClick={() => handleClick('com-followers')}>Followers</div>
        <div className={`com-following ${activeSection === 'com-following' ? 'active-section' : ''}`} onClick={() => handleClick('com-following')}>Following</div>
        <div className={`com-follow ${activeSection === 'com-follow' ? 'active-section' : ''}`} onClick={() => handleClick('com-follow')}>Follow</div>
      </div>
      {/* <div className="test"></div> */}
    </div>
  )
}

export default CommunityPage
