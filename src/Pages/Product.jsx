import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();                  // get dynamic id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!product) return null;

  const discountPrice = (
    product.price - (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 my-10">
      <div className="grid md:grid-cols-2 gap-8 bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Product Images */}
        <div>
          <figure className="rounded-xl overflow-hidden border">
            <img src={product.thumbnail} alt={product.title} className="w-full" />
          </figure>
          <div className="flex gap-2 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-16 h-16 object-cover rounded-md border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="font-semibold">{product.rating} / 5</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{discountPrice}
            </span>
            <span className="line-through text-gray-400">৳{product.price}</span>
            <span className="badge badge-secondary">
              -{product.discountPercentage}%
            </span>
          </div>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-success">{product.availabilityStatus}</span>
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, i) => (
              <span key={i} className="badge badge-outline">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-outline btn-primary">Buy Now</button>
          </div>

          {/* Extra Details */}
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Weight:</strong> {product.weight} g</p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
            </p>
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
            <p><strong>Stock:</strong> {product.stock} pcs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
