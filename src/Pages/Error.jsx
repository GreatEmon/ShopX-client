import React from 'react'
import NF from '../assets/NotFound.svg'
import { NavLink } from 'react-router'

const Error = () => {
  document.title = "Page not found"
  return (
    <div className='container my-10 mx-auto text-center'>
        <div className='text-center flex justify-center'>
            <img src={NF} alt="" className='w-2/3'/>
        </div>
        <NavLink to='/' className=" btn btn-primary my-5 px-4 py-4 text-white text-bold text-xl rounded-xl">Go to Home Page</NavLink>
    </div>
  )
}

export default Error