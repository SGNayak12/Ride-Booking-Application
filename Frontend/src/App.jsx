import {Route, Routes} from 'react-router-dom'
import 'typeface-roboto';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainSignup" element={<CaptainSignup/>} />

      </Routes>
    </>
  )
}

export default App