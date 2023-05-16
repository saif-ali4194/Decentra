import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { useEffect, useState } from 'react';
import { darktheme } from './styles/Darktheme';
import config from './config.js';

const apiKey = config.REACT_APP_WEB3STORAGE_API_KEY;

function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

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
    <div className="App">
      {console.log(apiKey)}
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
