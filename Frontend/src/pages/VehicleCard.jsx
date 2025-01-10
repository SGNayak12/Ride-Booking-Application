// import React from 'react';
import PropTypes from 'prop-types';

const VehicleCard = ({vehicleName,vehicleImage,vehicleCapacity,fare}) => {
  return (
    <>
    <div className="flex items-center justify-center p-4 space-x-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 active:border-2 active:border-blue-500">
  <div id="vehicleImage">
    <img className="object-cover rounded-md h-36" src={vehicleImage} alt="vehicleImage" />
  </div>
  <div id="vehicleInfo">
    <h3 className="text-xl font-semibold text-gray-800">{vehicleName}</h3>
  </div>
  <div id="vehicleFare">
    <h3 className="text-xl font-bold text-gray-700">{`₹${fare}`}</h3>
  </div>
</div>


    </>
  );
};

VehicleCard.propTypes ={
    vehicleName: PropTypes.string.isRequired,
    vehicleImage: PropTypes.string.isRequired, 
    vehicleCapacity:PropTypes.number.isRequired,
    fare:PropTypes.number.isRequired
};
export default VehicleCard;
