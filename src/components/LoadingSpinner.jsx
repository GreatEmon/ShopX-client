import React from 'react'

const LoadingSpinner = () => {
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        </>
    )
}

export default LoadingSpinner