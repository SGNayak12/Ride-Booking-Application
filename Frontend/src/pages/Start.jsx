import Logo from "../assets/Logo.png"
import {Link} from "react-router-dom"
const Start = () => {
  return (
    <>
<div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-24 h-10 ml-8 border rounded-md mix-blend-h-screen' src={Logo} alt="LogoOfTheWebsite" />
        <div className='px-4 py-4 pb-8 bg-white'>
          <h2 className='text-[30px] font-semibold'>Get Started with RIDER</h2>
          <Link to='/user-login' className='flex items-center justify-center w-full py-3 mt-5 text-white bg-black rounded-lg'>Continue</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Start
