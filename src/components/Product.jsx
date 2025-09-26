import React from 'react'
import { Link } from 'react-router'

const Product = ({ product }) => {
    // console.log(product)
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
                        { product.tags.map(e => (
                             <div className="badge badge-outline">{e}</div>
                         ))}
                    </div>
                    <Link to={`/product/${product._id}`} className="mt-auto inline-block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                        Details
                    </Link>
                    <Link to={`/update/${product._id}`} className="mt-auto inline-block text-center bg-secondary text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                        Update
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product