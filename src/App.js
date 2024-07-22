import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import Profile from './pages/Profle/Profile';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='login' element={<LogIn/>} />
        <Route path='signup' element={<SignUp/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='profile/:id' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
