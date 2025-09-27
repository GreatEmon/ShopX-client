import React from 'react'

const Slider = ({image,title,desc}) => {
    
    return (
        <div>
            <div
                className="hero min-h-[650px] rounded-3xl"
                style={{
                    backgroundImage:
                        `url(${image})`,
                }}
            >
                <div className="hero-overlay rounded-3xl"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <p className="mb-5">
                            {desc}
                        </p>
                        <button className="btn btn-primary">Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider