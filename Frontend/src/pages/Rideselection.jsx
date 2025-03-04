import PropTypes from 'prop-types'; 
import axios from 'axios';
import { useState,useEffect} from 'react';
import VehicleCard from './VehicleCard.jsx';

const Rideselection = ({pickup,destination}) => {
  const [fare,setFare]=useState(null);
  const calculateFare = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: {
          pickup,
          destination
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('user-token')}`
        }
      });
      setFare(response.data.fare);
    } catch (err) {
      console.log(err);
    }
  }

   useEffect(() => {
    calculateFare();
    // console.log(fare);
  }, [fare]);

  const vehicleDetails=[
    {
      vehicleName:"Rider Car",
      vehicleType:"car",
      vehicleImage:"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png",
      vehicleCapacity:"4",
      // fare:fare[this.vehicleType]
    },
    {
      vehicleName:"Rider Auto",
      vehicleType:"auto",
      vehicleImage:"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
      vehicleCapacity:"3",
      // fare:fare[this.vehicleType]
    },
    {
      vehicleName:"Rider Moto",
      vehicleType:"moto",
      vehicleImage:"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
      vehicleCapacity:"2",
      // fare:fare[this.vehicleType]
    }
  ]
  
  return (
    <>
      {fare ? (
        <div className="flex items-center w-full h-full gap-5 p-2 mt-2 bg-white border rounded-md justify-evenly">
       
          {vehicleDetails.map((item, index) => (
            <div key={index}>
              <VehicleCard
                vehicleName={item.vehicleName}
                vehicleImage={item.vehicleImage}
                fare={fare[item.vehicleType]} 
              />
            </div>
            
          ))}
        </div>
      ) : (
        <div className='text-xl'>Loading...</div>  // Display loading until fare is fetched
      )}
      <div className='flex items-center justify-center w-full h-32 bg-black border rounded-md'>
        <button className='text-xl font-semibold text-center text-white '>Select the Ride</button>
      </div>
    </>

  )
}
Rideselection.propTypes ={
    pickup: PropTypes.string.isRequired,       // Declare 'pickup' prop is a required string
    destination: PropTypes.string.isRequired,  // Declare 'destination' prop is a required string
};

export default Rideselection;
