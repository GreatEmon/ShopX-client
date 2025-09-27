import React from 'react'
import CountUp from 'react-countup';
import { MdLocalOffer } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import { MdDesignServices } from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";


const Services = () => {
  return (

    <>
        <div className='text-center py-[100px] mulish md:mx-0 mx-2'>
                <h1 className='text-[40px] font-extrabold text-[#0F0F0F]'>Our Platform in Numbers</h1>
                <p className='text-[#0F0F0F]'>See how our shop services are making an impact every day.. </p>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 text-left mt-[32.5px]'>
                    <div className='bg-[#0F0F0F05] rounded-2xl px-12 py-10 flex items-center flex-col'>
                        <MdLocalOffer size={60}/>
                        <h1 className='text-5xl font-extrabold mt-4 mb-3'><CountUp end={50} duration={5}/>+</h1>
                        <p className='text-xl font-medium text-[#0F0F0F60]'>Total Sales</p>
                    </div>
                    <div className='bg-[#0F0F0F05] rounded-2xl px-12 py-10 flex items-center flex-col'>
                        <FaUserShield size={50}/>
                        <h1 className='text-5xl font-extrabold mt-4 mb-3'><CountUp end={500} duration={5}/>+</h1>
                        <p className='text-xl font-medium text-[#0F0F0F60]'>Total Customers</p>
                    </div>
                    <div className='bg-[#0F0F0F05] rounded-2xl px-12 py-10 flex items-center flex-col'>
                        <MdDesignServices size={50}/>
                        <h1 className='text-5xl font-extrabold mt-4 mb-3'><CountUp end={10} separator="" duration={5}/>+</h1>
                        <p className='text-xl font-medium text-[#0F0F0F60]'>Serving for</p>
                    </div>
                    <div className='bg-[#0F0F0F05] rounded-2xl px-12 py-10 flex items-center flex-col'>
                        <TbStarFilled size={50}/>
                        <h1 className='text-5xl font-extrabold mt-4 mb-3'><CountUp end={50} duration={5}/>+</h1>
                        <p className='text-xl font-medium text-[#0F0F0F60]'>Total Rating</p>
                    </div>
                </div>
            </div>
    </>
    
  )
}

export default Services