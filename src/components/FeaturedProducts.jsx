import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Product from "./Product";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get("https://shop-x-backend-seven.vercel.app/featured");
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>

  return (
    <section className="py-12 bg-white">
      <h2 className="text-[40px] font-extrabold text-[#0F0F0F] text-center mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto">
        {products.map((product) => (
          <Product product={product} key={product._id}></Product>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
