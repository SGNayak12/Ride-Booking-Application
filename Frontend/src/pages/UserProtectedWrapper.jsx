// import React from 'react'
import {useContext,useEffect,useState} from 'react'
import { UserDataContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({children}) => {
    const {user, setUser} = useContext(UserDataContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [token,setToken]=useState(localStorage.getItem('user-token'));

  useEffect(() => { 
     if (!token) {
            navigate('/user-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                setToken(localStorage.removeItem('token'));
                navigate('/user-login')
            })

  }, [token,navigate,setUser]);

  if(isLoading){
    return(
        <div>Loading....</div>
    )
  }
    return (
        <div>
        {children}
        </div>
    )
}

export default UserProtectedWrapper;
