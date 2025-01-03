import Logo from "../assets/Logo.png"
import { useState } from "react"

const Home = () => {
    const [pickup,setPickup]=useState('');
    const [destination,setDestination]=useState('');

    const submitHandler=(e)=>{
      e.preventDefault();
setPickup('');
setDestination('');
      
    }

    return(
      <>
      <div>
         <div id="Navbar" className="flex justify-between w-full p-2 border-b-4 h-15 ">
          <div className="flex items-center gap-6 ">
            <img className="w-24 h-10 ml-4 mix-blend-multiply" src={Logo} alt="AppLogo" />
          <h4 className="text-xl font-roboto">Ride</h4>
          <h4 className="text-xl font-roboto">Package</h4>
          </div>
          

          <div className="flex items-center gap-6">
            <button className="text-xl">Activity</button>
            <img className="w-12 h-12 mix-blend-multiply" src="data:image/png;base64,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" alt="UserProfileImage" />
          </div>
         </div>

          <div className="flex flex-col w-[50%] border rounded-md p-5 mt-5 ml-5">
          <h3 className="mt-5 mb-5 ml-1 text-xl font-semibold ml- font-roboto">Get a ride</h3>
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <input value={pickup}  onChange={(e)=>{setPickup(e.target.value)}} className="w-full h-10 p-4 bg-gray-200 rounded-md placeholder:text-xl " type="text" placeholder="Pickup location" />
            <input value={destination} onChange={(e)=>{setDestination(e.target.value)}} className="w-full h-10 p-4 bg-gray-200 rounded-md placeholder:text-xl " type="text" placeholder="Dropoff location" />
            <button className="h-10 text-xl text-white bg-black border rounded-md">Search</button>
          </form>
          
         </div>
      </div>
        
      </>
    )
  
}

export default Home

