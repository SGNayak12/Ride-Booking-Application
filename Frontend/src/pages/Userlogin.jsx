import React, { useState, useContext } from 'react'
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ Password, setPassword ] = useState('')

  const { user, setUser } = useContext(UserDataContext);
  
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData= {
      email: email,
      Password: Password
    }
    // console.log(userData)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/user-home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen p-7'>
      <div>
        <img className='w-24 h-10 mb-2 ml-0 border rounded-md mix-blend-h-screen mix-blend-multiply' src={Logo} alt="" />

        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='mb-2 text-lg font-medium'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='mb-2 text-lg font-medium'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin