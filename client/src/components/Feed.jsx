import React, { useEffect, useState } from 'react'
import "../styles/Feed.css"
import { Route, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage"
import ExplorePage from "../Pages/ExplorePage"
import NotificationPage from "../Pages/NotificationPage"
import CommunityPage from "../Pages/CommunityPage"
import ProfilePage from "../Pages/ProfilePage"
import TrendingPage from "../Pages/TrendingPage"
import SettingsPage from '../Pages/SettingsPage';
import Account from '../components/SubSettingsComponents/Account';
import Tac from '../components/SubSettingsComponents/Tac';
// import {User} from "../Test Data/CurrentUser"
import Thread from '../Pages/Thread';
import { _User } from '../Scripts/UserStorage';

function Feed() {
  const [loc_user, setLocUser] = useState(_User.getUserData());
  useEffect(() => {
    const handleLocalStorageUpdated = () => {
      setLocUser(_User.getUserData());
    };

    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated);

    return () => {
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated);
    };
  }, [])
  return (
    <div className="feed">
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage current_user={loc_user}/>} />
      <Route path="/profile/:userId" element={<ProfilePage />} /> 
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/trendingPage" element={<TrendingPage />} />
      <Route path="/settings" element={< SettingsPage/>} />
      <Route path="/settings/account" element={<Account />} />
      <Route path="/settings/tac" element={<Tac />} />
      <Route path="/thread/:post" element={<Thread />} />
      </Routes>
    </div>
  )
}

export default Feed
