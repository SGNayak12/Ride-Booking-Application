import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png';
import axios from 'axios'
import {UserDataContext}  from '../contexts/UserContext.jsx'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ Password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      Password: Password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',  // Explicitly set Content-Type as JSON
          },
        }
      );
      console.log('User registered:', response.data);
      console.log(response.data.newUser);
      navigate('/user-login'); 
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register. Please try again.');
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }
  return (
    <div>
      <div className='flex flex-col justify-between h-screen p-7'>
        <div>
          <img className='w-24 h-10 mb-2 ml-0 border rounded-md mix-blend-multiply' src={Logo} alt="" />

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='w-1/2 mb-2 text-lg font-medium'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <h3 className='mb-2 text-lg font-medium'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
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

            <button type='submit'
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default UserSignup