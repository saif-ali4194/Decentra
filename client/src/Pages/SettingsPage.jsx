import React, { useEffect, useState } from 'react'
import "../styles/Pages/SettingsPage.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import { darktheme } from '../styles/Darktheme';

function SettingsPage() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const navigate = useNavigate();

  const handleOptionClick = (url) => {
    navigate(url);
  };

  const handleDarkModeToggle = () => {
    const newDarkModeEnabled = !darkModeEnabled;
    setDarkModeEnabled(newDarkModeEnabled);
    localStorage.setItem('darkModeEnabled', newDarkModeEnabled);
  };

  useEffect(() => {
    const darkModeEnabledFromStorage = localStorage.getItem('darkModeEnabled');
    if (darkModeEnabledFromStorage !== null) {
      setDarkModeEnabled(JSON.parse(darkModeEnabledFromStorage));
    }
  }, []);

  useEffect(() => {
    darktheme(darkModeEnabled);
  }, [darkModeEnabled]);

  return (
    <div className='settings'>
      <div className="setting_header">Settings</div>

      <div className='setting_options'>
      <div className="setting-btns">DarkMode
      <Switch checked={darkModeEnabled} onChange={handleDarkModeToggle} />
      </div>
        <div className="setting-btns" onClick={() => handleOptionClick('/settings/account')}>Account <ChevronRightIcon/></div>
        <div className="setting-btns" onClick={() => handleOptionClick('/settings/tac')}>Terms & Conditions<ChevronRightIcon/></div>
      </div>
    </div>
  )
}

export default SettingsPage
