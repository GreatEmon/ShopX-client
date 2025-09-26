import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import Swal from 'sweetalert2'

const Product2 = ({ product, uid }) => {

    let data = uid.find(item => item.id === product._id)

    const handleDelete = () =>{
        fetch(`http://localhost:3000/delete/${data._id}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
              },
            }).
              then(res => res.json()).
              then(out => {
                console.log(out)
                if (out.deletedCount) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product has been removed",
                    showConfirmButton: false,
                    timer: 1500
                  });
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something wrong",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
        
              })
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-sm h-140">
                <figure>
                    <img
                        src={product.thumbnail}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {product.title}
                        <div className="badge badge-secondary text-sm">-{product?.discountPercentage}%</div>
                    </h2>
                    <p>{product.description}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-xs text-gray-400">Category: {product.category}</p>
                    <p className="font-bold mt-2">$ {product.price}</p>
                    <div className="card-actions justify-start mb-3">
                        {product.tags.map(e => (
                            <div className="badge badge-outline">{e}</div>
                        ))}
                    </div>
                    <Link to={`/product/${product._id}`} className="mt-auto inline-block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                        Details
                    </Link>
                    <button className="mt-auto inline-block text-center bg-error text-white py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer" onClick={handleDelete}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product2