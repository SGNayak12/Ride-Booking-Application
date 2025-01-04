import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rideselection = ({ pickup, destination }) => {
  
    const [vehicleType, setVehicleType] = useState('car');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [fare, setFare] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const getFare = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
            });
            setFare(response.data);
        } catch (err) {
            setError('Error fetching fare');
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    };

    if (pickup && destination) {
        getFare();
    }
}, [pickup, destination]);

    const vehicleInfo = [
        {
            vehicleImage: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/UberGo_2025_Balloons.png',
            vehicleName: 'Rider Car',
            vehicleCapacity: '4 people',
            vehiclePrice: fare.car|| 'Loading...', // Default to "Loading..." if the fare is not available
        },
        {
            vehicleImage: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/TukTuk_2025_Balloons.png',
            vehicleName: 'Rider Auto',
            vehicleCapacity: '3 people',
            vehiclePrice: fare.auto || 'Loading...', // Default to "Loading..."
        },
        {
            vehicleImage: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Moto_2025_Balloons.png',
            vehicleName: 'Rider Moto',
            vehicleCapacity: '2 people',
            vehiclePrice:fare.moto || 'Loading...', // Default to "Loading..."
        },
    ];

    return (
        <div className="max-h-full overflow-y-auto mt-12 w-[35%]">
            <div className="flex flex-col max-h-full p-6 ml-4 bg-white border rounded-md shadow-lg ">
                <h3 className="mb-3 text-3xl font-semibold text-gray-800">Choose a ride</h3>
                <div className="flex flex-col w-full max-h-full gap-6 overflow-y-auto">
                    {vehicleInfo.map((vehicle, index) => (
                        <div key={index} className="flex flex-row items-center justify-center p-4 transition-all duration-300 rounded-md shadow-md bg-gray-50 hover:shadow-lg">
                            <img
                                className="object-cover w-20 h-20 mb-4 mr-5 rounded-md "
                                src={vehicle.vehicleImage}
                                alt={vehicle.vehicleName}
                            />
                            
                            <div className="flex flex-row h-20 gap-12">
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-800">{vehicle.vehicleName}</h4>
                                    <p className="text-lg text-gray-600">{vehicle.vehicleCapacity} seats</p>
                                </div>
                                <div>
                                    <p className="text-xl font-medium text-black">{vehicle.vehiclePrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full p-3 mt-6 text-xl text-white transition-all duration-300 bg-black border rounded-md hover:bg-gray-800">
                    Request a Ride
                </button>
            </div>
        </div>
    );
};

export default Rideselection;