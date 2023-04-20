import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import { Route, Routes } from 'react-router-dom';
import { useCallback, useState } from 'react';
import AuthPage from "./Pages/Auth"
import NotFound from './Pages/NotFound';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';


function App() {
  const[active, setActive] = useState(false);
  const navigate = useNavigate();
  const { active: isConnected } = useWeb3React();
  const navigateToAuth = useCallback(() => navigate('/auth'), [navigate]);

  useEffect(() => {
    if (!isConnected) {
      navigateToAuth();
    } else {
      setActive(true);
    }
  }, [isConnected]);

  console.log(active);
  return <>
    {/* Rotes */}
    <Routes>
    <Route path='/' element={
      <div className="App">
        <Sidebar />
        <Feed />
        <Widgets />
    </div>
    }/>
    <Route path='/auth' element={<AuthPage active={active} setActive={setActive} /> } />
    <Route path='*' element={<NotFound />} />
  </Routes>
  </>
}

export default App;
