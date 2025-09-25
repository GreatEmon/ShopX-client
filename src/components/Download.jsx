import React from 'react'
import Dw from "../assets/Download.jpg"

const Download = () => {
    
    return (
        <div className="hero pb-10 md:mx-0 mx-2">
            <div className="flex justify-between items-center flex-col lg:flex-row-reverse lg:gap-70">
                <img
                    src={Dw}
                    className="max-w-sm rounded-lg "
                />
                <div className='md:text-left text-center'>
                    <h1 className="text-5xl font-bold">Download Our App!</h1>
                    <p className="py-6">
                        Windows, Apple and Android App Available.
                    </p>
                    <button className="btn btn-primary">Download Now</button>
                </div>
            </div>
        </div>
    )
}

export default Download