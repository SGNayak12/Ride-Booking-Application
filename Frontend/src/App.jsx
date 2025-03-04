import {Route, Routes} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';
import Home from './pages/Home';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainHome from './pages/CaptainHome';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin/>} />
        <Route path="/user-signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/user-home" element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }/>
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        }/>
      </Routes>

    </>
  )
}

export default App