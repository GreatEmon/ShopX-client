import React from 'react'

const Contact = () => {
    document.title = "Contact US"

    return (
        <div className="hero bg-base-100 md:py-40">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Contact Us</h1>
                    <p className="py-6">
                        Reach out to ShopX for any inquiries, feedback, or partnership opportunities.
                        Customer care is available 7 days a week to ensure your shopping experience stays smooth.
                    </p>
                    <div className="py-2">
                        <ul>
                            <li>support@shopX.com</li>
                            <li>+965 1256 8563</li>
                            <li>Dhaka, Bangladesh</li>
                        </ul>
                    </div>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />
                            <label className="label">Message</label>
                            <textarea type="text" className="input" placeholder="Write Message..." />
                            <button className="btn btn-neutral mt-4">Reach Us</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact