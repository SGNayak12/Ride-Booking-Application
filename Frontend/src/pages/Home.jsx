// import React from 'react'
import HomePageImage from '../assets/HomePage.jpg'
const Home = () => {
  return (
    <>
<div className="flex items-center justify-end w-screen h-screen bg-center bg-cover" style={{ backgroundImage: `url(${HomePageImage})` }}>
  <div className="flex flex-col items-center w-1/3 h-full p-6 space-y-6 bg-white rounded-lg shadow-lg bg-opacity-80">
    {/* "Rider" Header aligned to the left */}
    <div className="flex justify-start w-full">
      <h3 className="text-5xl font-semibold text-gray-800">Rider</h3>
    </div>
    <div className="flex flex-col items-center flex-grow w-full p-2 text-white bg-black rounded-lg shadow-md justify-evenly">
      <h3 className="text-4xl ">Get Started with Rider</h3>
      <div className="w-full text-center text-gray-600">
  <p className="text-xl text-white">Your ride is just a tap away.</p>
  <p className="mt-3 text-xl tracking-wide text-white">Fast. Safe. Convenient.</p>
</div>
      <button style={{ backgroundColor: '#a15c16' }} className="w-40 py-2 font-bold text-black transition duration-300 rounded-md shadow-lg hover:bg-yellow-400">
        Continue
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default Home
