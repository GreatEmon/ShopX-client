import React from 'react'
import { Link } from 'react-router'

const Table = ({ product }) => {
    return (
            <tr>
                <td>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={product.thumbnail}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </td>
                <td>
                    {product.title}
                </td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.minimumOrderQuantity}</td>
                <th>
                    <Link to={`/product/${product._id}`} className="mt-auto inline-block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-800 mr-2">
                        Details
                    </Link>
                    <Link to={`/update/${product._id}`} className="mt-auto inline-block text-center bg-secondary text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                        Update
                    </Link>
                </th>
            </tr>
    )
}

export default Table