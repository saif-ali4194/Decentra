import React from 'react'
import "../styles/Pages/CommunityPage.css"
import { useState } from 'react';
import UserUnit from '../components/UserUnit';
import fakeUsers from "../Test Data/fake_users"

function CommunityPage() {
  const [activeSection, setActiveSection] = useState('com-followers');
  const users = fakeUsers(10);

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
      {users.map((user) => (
        <UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user}/>
      ))}
    </div>
  )
}

export default CommunityPage
