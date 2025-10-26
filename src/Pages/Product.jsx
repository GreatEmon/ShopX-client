import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [oCount, setOCount] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (oCount > product.stock) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Not enough stock",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (oCount < product.minimumOrderQuantity) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Order above minimum quantity",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    console.log(data)
    data.userEmail = user.email;
    data.userName = user.displayName;
    data.orderqty = oCount;
    data.id = id;

    fetch(`https://shop-x-backend-seven.vercel.app/api/products/${product._id}/decrement`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseInt(oCount) }),
    })
      .then((res) => res.json())
      .then((out) => {
        if (out.modifiedCount) {
          fetch(`https://shop-x-backend-seven.vercel.app/cart/add`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((out) => {
              if (out.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Order Done",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/cart");
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Something went wrong",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://shop-x-backend-seven.vercel.app/products/${id}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setOCount(data.minimumOrderQuantity);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, user.accessToken]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!product) return null;

  const discountPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden shadow-md">
            <img src={product.thumbnail} alt={product.title} className="w-11/12 object-cover" />
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">{product.title}</h1>
            <p className="text-gray-500 text-lg">Brand: {product.brand}</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-2xl">⭐</span>
              <span className="font-semibold text-lg">{product.rating} / 5</span>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <span className="text-4xl font-bold text-primary">৳{discountPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="line-through text-gray-400 text-lg">৳{product.price}</span>
              )}
              {product.discountPercentage > 0 && (
                <span className="badge badge-secondary text-lg">-{product.discountPercentage}%</span>
              )}
            </div>

            <p className="text-green-600 font-semibold">
              {product.stock > 0 ? product.availabilityStatus : "Out of Stock"}
            </p>

            <p className="text-gray-700 text-lg">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <span key={i} className="badge badge-outline">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buy Panel */}
          <div className="mt-6 border-t pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" value={user.email} disabled className="input input-bordered w-full" />
                <input type="text" value={user.displayName} disabled className="input input-bordered w-full" />
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="btn btn-outline btn-primary" onClick={() => oCount < product.stock && setOCount(parseInt(oCount) + 1)}>+</button>
                <input type="number" value={oCount} onChange={e => setOCount(e.target.value)} className="input input-bordered w-24 text-center" />
                <button type="button" className="btn btn-outline btn-primary" onClick={() => oCount > 1 && setOCount(parseInt(oCount) - 1)}>-</button>
              </div>

              <input type="text" placeholder="Address" name="address" required className="input input-bordered w-full" />

              <button type="submit" className="btn btn-primary w-full text-lg">Add to Cart</button>
            </form>

            {/* Product Specifications */}
            <div className="mt-8 space-y-2">
              <h3 className="text-2xl font-bold">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Weight:</strong> {product.weight} g</p>
                <p><strong>Dimensions:</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</p>
                <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                <p><strong>Stock:</strong> {product.stock} pcs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections: Reviews and FAQ */}
      <div className="mt-16 space-y-12">

        {/* Modern Reviews Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      U{i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">User {i + 1}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <span
                            key={star}
                            className={`text-yellow-500 text-xl ${star < (review.rating || product.rating) ? '' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="text-gray-500 text-sm ml-2">
                          {(review.rating || product.rating).toFixed(1)} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">{review.comment || "No comment provided."}</p>

                  <p className="text-gray-400 text-xs mt-4">Reviewed on: {review.date || "2025-10-26"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <div className="collapse-title text-lg font-medium">
                What is the return policy?
              </div>
              <div className="collapse-content text-gray-700">
                {product.returnPolicy || "No return policy."}
              </div>
            </div>

            <div tabIndex={1} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <div className="collapse-title text-lg font-medium">
                How long does shipping take?
              </div>
              <div className="collapse-content text-gray-700">
                {product.shippingInformation || "Shipping information not available."}
              </div>
            </div>

            <div tabIndex={2} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <div className="collapse-title text-lg font-medium">
                Is there a warranty on this product?
              </div>
              <div className="collapse-content text-gray-700">
                {product.warrantyInformation || "Warranty information not available."}
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
