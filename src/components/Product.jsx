import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  return (
    <div className="group relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white">
      
      {/* Product Image */}
      <figure className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Low Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            Low Stock
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-900 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            Out of Stock
          </div>
        )}
      </figure>

      {/* Product Info */}
      <div className="p-4 flex flex-col h-[320px] justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <p className="text-sm text-gray-400 mt-1">Brand: {product.brand}</p>
          <p className="text-xs text-gray-400 mt-0.5">Category: {product.category}</p>
        </div>

        <div className="mt-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.map((tag, i) => (
              <span key={i} className="badge badge-outline badge-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <p className="text-primary font-bold text-lg mb-3">${product.price}</p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/product/${product._id}`}
              className="flex-1 text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-focus transition"
            >
              Details
            </Link>
            <Link
              to={`/update/${product._id}`}
              className="flex-1 text-center bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-focus transition"
            >
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
