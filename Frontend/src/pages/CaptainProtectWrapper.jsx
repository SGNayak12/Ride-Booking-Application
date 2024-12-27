import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../contexts/CaptainContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        if (!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.status === 200) {
                // console.log(response.data);
                setCaptain(response.data.captain);
                setIsLoading(false);
            }
        })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token,navigate, setCaptain ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}
export default CaptainProtectWrapper