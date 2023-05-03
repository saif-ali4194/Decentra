import React, { useState } from 'react'
import "../styles/Pages/SettingsPage.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

function SettingsPage() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (url) => {
    navigate(url);
  };
  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  if (darkModeEnabled) {
    console.log("Here")
    document.documentElement.style.setProperty('--background-color', 'var(--LightMode)');
  } else {
    console.log("Tere")
    document.documentElement.style.setProperty('--background-color', 'var(--DarkMode)');
  }
  };

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
