import React from 'react'
import "../styles/Pages/CommunityPage.css"
import { useState } from 'react';
import UserUnit from '../components/UserUnit';
import fakeUsers from "../Test Data/fake_users"
import {User} from '../Test Data/CurrentUser'
import { user_list } from '../Test Data/UserList';

function CommunityPage() {
  const [activeSection, setActiveSection] = useState('com-followers');
  const [numUsers, setNumUsers] = useState(10);
    
  const handleShowMore = () => {
      setNumUsers(numUsers + 10);
  }
  const users = fakeUsers(numUsers);

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

      {activeSection === "com-followers" ? (
        user_list
        .filter(user => User.user_followed.includes(user.id))
        .map(user => (
            <UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user}/>
        ))
      ) : activeSection === "com-following" ? (
        user_list
          .filter(user => User.user_following.includes(user.id))
          .map(user => (
              <UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user}/>
          ))
      ) : <div>
            {
              users.map((user) => (
                <UserUnit key={user.id} u_id={user.id} u_avatar={user.avatar} u_name={user.name} user={user}/>
                ))
            }
          <p id='com-show-more' onClick={handleShowMore}>Show More</p>
        </div> 
      }
    </div>
  )
}

export default CommunityPage
