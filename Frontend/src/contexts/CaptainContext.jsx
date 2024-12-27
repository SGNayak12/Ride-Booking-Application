import React from 'react'
import { createContext,useState,useEffect } from 'react'

export const CaptainDataContext = createContext();

  const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    isLoading: false, // loading state
    error: '', // error state
  });

  const updateCaptain = (captainData) => {
    setCaptain(prevState => ({
      ...prevState,
      captain: captainData, // update captain info
    }));
  };
  
    
  return (
    <>
      <CaptainDataContext.Provider value={ {captain, setCaptain, updateCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext;
