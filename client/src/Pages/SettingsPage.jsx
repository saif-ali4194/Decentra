import React, { useState } from 'react'
import "../styles/Pages/SettingsPage.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

function SettingsPage() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const navigate = useNavigate();

  const handleOptionClick = (url) => {
    navigate(url);
  };
  const handleDarkModeToggle = () => {
    const newDarkModeEnabled = darkModeEnabled;
    setDarkModeEnabled(!darkModeEnabled);

  if (newDarkModeEnabled) {
    document.documentElement.style.setProperty('--background-color', 'var(--LightMode)');
    document.documentElement.style.setProperty('--font-color', 'var(--L-font-color)');
    document.documentElement.style.setProperty('--card-color', 'var(--H-Light-background-color)');
    document.documentElement.style.setProperty('--card-child-color', 'var(--H-Light-L-background-color)');
    document.documentElement.style.setProperty('--card-hover-color', 'var(--H-Light-hover-background-color)');
    document.documentElement.style.setProperty('--border-color', 'var(--L-border-color)');
    document.documentElement.style.setProperty('--active', 'var(--L-active)');
  } else {
    document.documentElement.style.setProperty('--background-color', 'var(--DarkMode)');
    document.documentElement.style.setProperty('--font-color', 'var(--D-font-color)');
    document.documentElement.style.setProperty('--card-color', 'var(--H-background-color)');
    document.documentElement.style.setProperty('--card-child-color', 'var(--H-L-background-color)');
    document.documentElement.style.setProperty('--card-hover-color', 'var(--H-hover-background-color)');
    document.documentElement.style.setProperty('--border-color', 'var(--D-border-color)');
    document.documentElement.style.setProperty('--active', 'var( --D-active)');
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
