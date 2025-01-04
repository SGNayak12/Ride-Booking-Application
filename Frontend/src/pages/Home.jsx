import React, { useState, useEffect,useRef} from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import Rideselection from "./Rideselection.jsx";
import ConfirmRide from "./ConfirmRide.jsx";

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestedPickup, setSuggestedPickup] = useState([]);
  const [suggestedDestination, setSuggestedDestination] = useState([]);
  const [selectRide,setSelectRide] = useState(false);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [error,setError]=useState('');
  const [fare,setFare]=useState({});
  const [vehicleType,setVehicleType]=useState('');
  const buttonRef=useRef(null);

  const calculateDistanceTime = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
        params: {
          pickup,
          destination
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('user-token')}`
        }
      });
      setDistance(response.data.distance.text);
      setDuration(response.data.duration.text);
    } catch (err) {
      setError('Error fetching distance and time');
      console.error(err);
    }
  };

  const calculateFare = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-fare`, {
        params: {
          pickup,
          destination
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('user-token')}`
        }
      });
      console.log(response);
      // setFare(response.data.fare);
    } catch (err) {
      setError('Error fetching fare');
      console.error(err);
    }
  }

  const getPickupSuggestions = async () => {
    try {
      if (!pickup) return;

      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(pickup)}&key=${import.meta.env.GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.status === "OK") {
        setSuggestedPickup(
          response.data.predictions.map((prediction) => prediction.description).filter((value) => value)
        );
      } else {
        throw new Error("Unable to fetch pickup suggestions");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDestinationSuggestions = async () => {
    try {
      if (!destination) return; 

      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(destination)}&key=${import.meta.env.GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.status === "OK") {
        setSuggestedDestination(
          response.data.predictions.map((prediction) => prediction.description).filter((value) => value)
        );
      } else {
        throw new Error("Unable to fetch destination suggestions");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch suggestions when the 'pickup' or 'destination' input changes
  useEffect(() => {
    getPickupSuggestions();
    buttonRef.current.style.display='block';
  }, [pickup]);

  useEffect(() => {
    getDestinationSuggestions();
    buttonRef.current.style.display='block';
  }, [destination]);

  
  const handlePickupSelect = (place) => {
    setPickup(place); 
    setSuggestedPickup([]);
  };

  
  const handleDestinationSelect = (place) => {
    setDestination(place);
    setSuggestedDestination([]); 
   
  };

  const submitHandler = (e) => {
    e.preventDefault();
    buttonRef.current.style.display='none';
    setSelectRide(true);
  };

  return (
    <div className="flex w-screen h-screen p-4 bg-gray-200">
      <img
        src={Logo}
        alt="AppLogo"
        className="absolute w-24 h-10 rounded-md top-3 left-5"
      />
      <div className="flex flex-col w-1/3 p-2 mt-12 bg-white border rounded-md">
        <h3 className="p-2 mt-2 ml-2 text-3xl font-semibold">Get a ride</h3>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 pl-2 pr-2">
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full h-10 p-4 bg-gray-200 rounded-md placeholder:text-xl"
            type="text"
            placeholder="Pickup location"
          />

          {/* Render pickup suggestions */}
          {pickup && suggestedPickup.length > 0 && (
            <div className="p-2 mt-2 bg-white border rounded-md">
              {suggestedPickup.map((place, index) => (
                <div
                  key={index}
                  onClick={() => handlePickupSelect(place)} // Clear suggestions after selecting a place
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {place}
                </div>
              ))}
            </div>
          )}

          {/* Destination location input */}
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-10 p-4 bg-gray-200 rounded-md placeholder:text-xl"
            type="text"
            placeholder="Destination location"
          />

          {/* Render destination suggestions */}
          {destination && suggestedDestination.length > 0 && (
            <div className="p-2 mt-2 bg-white border rounded-md">
              {suggestedDestination.map((place, index) => (
                <div
                  key={index}
                  onClick={() => handleDestinationSelect(place)} // Clear suggestions after selecting a place
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {place}
                </div>
              ))}
            </div>
          )}

          <button ref={buttonRef} onClick={submitHandler} className="h-10 text-xl text-white bg-black border rounded-md">
            Search
          </button>
        </form>
      </div>

      {/* {selectRide && pickup && destination  && <Rideselection pickup={pickup} destination={destination} />} */}
      <Rideselection pickup={pickup} destination={destination} vehicleType={vehicleType} fare={fare} />

      <confirmRide/>
    </div>
  );
};

export default Home;
