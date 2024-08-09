import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import Profile from './pages/Profle/Profile';
import Acounts from './Acounts';
import Header from './Components/Header/Header';
import Messages from './pages/messages/messages';

function App() {

  const location = useLocation();

  // Check if the current path is 'signup'
  const hideHeaderPaths = ['/signup', '/login'];

  return (
    <div className="App ">
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='signup' element={<SignUp />} />
        <Route path='' element={<Home />} />
        <Route path='login/acounts' element={<Acounts />} />
        <Route path='login' element={<LogIn />} />
        <Route path='profile' element={<Profile />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='messages' element={<Messages/>} />
      </Routes>
    </div>
  );
}

export default App;
