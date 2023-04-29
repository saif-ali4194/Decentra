import React from 'react'
import "../styles/Feed.css"
import { Route, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage"
import ExplorePage from "../Pages/ExplorePage"
import NotificationPage from "../Pages/NotificationPage"
import CommunityPage from "../Pages/CommunityPage"
import ProfilePage from "../Pages/ProfilePage"
import TrendingPage from "../Pages/TrendingPage"
import SettingsPage from '../Pages/SettingsPage';
import {User} from "../Test Data/CurrentUser"

function Feed() {
  return (
    <div className="feed">
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage current_user={User}/>} />
      <Route path="/profile/:userId" element={<ProfilePage />} /> 
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/trendingPage" element={<TrendingPage />} />
      <Route path="/settings" element={< SettingsPage/>} />
      </Routes>
    </div>
  )
}

export default Feed
