import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios"
import LoadingSpinner from "./LoadingSpinner";

export default function CategoryCards() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/category")
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
    }, []);
    
    if(loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <>
            <div className="text-center mt-20">
                <h1 className='text-[40px] font-extrabold text-[#0F0F0F]'>Explore Categories</h1>
                <p className='text-[#0F0F0F]'> All in one place, Buy what you want.. </p>
            </div>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 text-left">

                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        className="cursor-pointer p-4"
                    >
                        <h3 className="text-center font-semibold bg-primary text-white text-lg py-2">{cat.group}</h3>
                        <div className=" bg-[#0F0F0F05] rounded-md mb-3 p-3">
                            {cat.categories.map(item => (
                                <div key={item.slug}>
                                    <Link to={`/category/${item.slug}`} className="mt-3">{item.name} </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
