import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { useEffect, useState } from 'react';
import { darktheme } from './styles/Darktheme';

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
