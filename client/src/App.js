import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { useEffect, useState } from 'react';

function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  useEffect(() => {
    const darkModeEnabledFromStorage = localStorage.getItem('darkModeEnabled');
    if (darkModeEnabledFromStorage !== null) {
      setDarkModeEnabled(JSON.parse(darkModeEnabledFromStorage));
    }
  }, []);

  useEffect(() => {
    if (!darkModeEnabled) {
      document.documentElement.style.setProperty('--background-color', 'var(--LightMode)');
      document.documentElement.style.setProperty('--font-color', 'var(--L-font-color)');
      document.documentElement.style.setProperty('--card-color', 'var(--H-Light-background-color)');
      document.documentElement.style.setProperty('--card-child-color', 'var(--H-Light-L-background-color)');
      document.documentElement.style.setProperty('--card-hover-color', 'var(--H-Light-hover-background-color)');
      document.documentElement.style.setProperty('--border-color', 'var(--L-border-color)');
      document.documentElement.style.setProperty('--active', 'var(--L-active)');
      document.documentElement.style.setProperty('--glassEffect', 'var(--L-ge)');
      document.documentElement.style.setProperty('--Dark-color', 'var(--L-color)');
    } else {
      document.documentElement.style.setProperty('--background-color', 'var(--DarkMode)');
      document.documentElement.style.setProperty('--font-color', 'var(--D-font-color)');
      document.documentElement.style.setProperty('--card-color', 'var(--H-background-color)');
      document.documentElement.style.setProperty('--card-child-color', 'var(--H-L-background-color)');
      document.documentElement.style.setProperty('--card-hover-color', 'var(--H-hover-background-color)');
      document.documentElement.style.setProperty('--border-color', 'var(--D-border-color)');
      document.documentElement.style.setProperty('--active', 'var( --D-active)');
      document.documentElement.style.setProperty('--glassEffect', 'var(--D-ge)');
      document.documentElement.style.setProperty('--Dark-color', 'var(--D-color)');
    }
  }, [darkModeEnabled]);

  return (
    <div className="App">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widgets */}
      <Widgets />
    </div>
  );
}

export default App;
