import { useNavigate, useParams } from "react-router";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductPage() {
  const { id } = useParams();                  // get dynamic id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = use(AuthContext)
  const [oCount, setOCount] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries());
    if (data.orderQuantity > product.stock) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: " Not in stock",
        showConfirmButton: false,
        timer: 1500
      });
    }

    if (data.orderQuantity < product.minimumOrderQuantity) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: " Order above minimum quantity",
        showConfirmButton: false,
        timer: 1500
      });
    }
    data['userEmail'] = form.userEmail.value
    data['userName'] = form.userName.value
    data['id'] = id;

    fetch(`https://shop-x-backend-seven.vercel.app/api/products/${product._id}/decrement`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: parseInt(data.orderQuantity) })
    }).
      then(res => res.json()).
      then(out => {
        console.log(out)
        if (out.modifiedCount) {
          fetch(`https://shop-x-backend-seven.vercel.app/cart/add`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).
            then(res => res.json()).
            then(out => {
              if (out.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Order Done",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/cart')

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
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://shop-x-backend-seven.vercel.app/products/${id}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        let val = data.minimumOrderQuantity
        setOCount(val)

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner></LoadingSpinner>
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
          <p className="text-gray-600">Minimum Order Quantity : {product.minimumOrderQuantity}</p>

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
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_4').showModal()}>Buy Now</button>
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

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-3/12 max-w-5xl">
          <h1 className="py-4 text-2xl font-bold">Buy Now</h1>

          <form onSubmit={handleSubmit} method="dialog">
            <fieldset className="fieldset">
              <label className="label mt-5">Email</label>
              <input type="email" className="input" placeholder="Contact Info"
                name='userEmail' disabled={true} value={user.email} />

              <label className="label mt-5">Name</label>
              <input type="text" className="input" placeholder="Contact Info"
                name='userName' disabled={true} value={user.displayName} />

              <label className="label mt-5">Order Quantity</label>
              <input type="number" className="input" placeholder="Order Quantity"
                name='orderQuantity' required value={oCount} onChange={e => setOCount(e.target.value)} />

              <div className="flex gap-3">
                <span className="btn btn-primary btn-outline" onClick={() => {
                  if (oCount < parseInt(product.stock))
                    setOCount(parseInt(oCount) + 1)
                }}>+</span>
                <span className="btn btn-primary btn-outline" onClick={() => {
                  if (oCount > 0)
                    setOCount(parseInt(oCount) - 1)
                }}>-</span>
              </div>

              <label className="label mt-5">Address</label>
              <input type="text" className="input" placeholder="Address"
                name='address' required />
              <button className="btn btn-primary text-white mt-4 w-[320px]" type='submit'>Buy Now</button>
            </fieldset>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  );
}
