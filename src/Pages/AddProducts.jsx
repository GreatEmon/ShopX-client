import React, { use } from 'react'
import { useLoaderData } from 'react-router'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider';

const AddProducts = () => {
  const categories = useLoaderData()
  document.title = "Add Product";
  const { user } = use(AuthContext)

  const handleForm = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries());
    data['userEmail'] = form.userEmail.value
    data['userName'] = form.userName.value
    data["sku"] = "new-1"
    data["weight"] = 50
    data["dimensions"] = {
      "width": 15.14,
      "height": 13.08,
      "depth": 22.99
    }
    data["warrantyInformation"] = "1 week warranty"
    data["shippingInformation"] = "Ships in 3-5 business days"
    data["availabilityStatus"] = "In Stock"
    data["reviews"] = []
    data["images"] = [form.thumbnail.value]


    if (form.category.value === "Pick Product Category") {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: " Please Select Product Category",
        showConfirmButton: false,
        timer: 1500
      });
    }

    const tagspreference = form.tags.value
    const cleaned = tagspreference.split(',').map(element => element.trim())
    data['tags'] = cleaned

    console.log(data)

    if(data.discountPercentage < 0 || data.minimumOrderQuantity < 0 || data.price < 0 || data.rating < 0 || data.stock <0){
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: " Must Be positive number",
        showConfirmButton: false,
        timer: 1500
      });
    }

    if(parseInt(data.stock) < parseInt(data.minimumOrderQuantity)){
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Stock must be greater than minimum order quantity",
        showConfirmButton: false,
        timer: 1500
      });
    }

    fetch("http://localhost:3000/add", {
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
            title: "Your product added",
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
    <div className='flex justify-center my-[60px]'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleForm}>
            <h2 className='font-semibold text-2xl text-center py-5'>Add a new product</h2>
            <fieldset className="fieldset">
              <label className="label mt-5">Title</label>
              <input type="text" className="input" placeholder="Title"
                name='title' required />

              <label className="label mt-5">Description</label>
              <input type="text" className="input" placeholder="Description"
                name='description' required />

              <label className="label mt-5">Brand Name</label>
              <input type="text" className="input" placeholder="Brand Name"
                name='brand' required />

              <label className="label mt-5">Price</label>
              <input type="number" className="input" placeholder="Price"
                name='price' required />

              <label className="label mt-5">Rating</label>
              <input type="number" className="input" placeholder="Rating(1-5)"
                name='rating' required />

              <label className="label mt-5">Minimum Order Quantity</label>
              <input type="number" className="input" placeholder="Minimum Order Quantity"
                name='minimumOrderQuantity' required min="1" />

              <label className="label mt-5">Stock</label>
              <input type="number" className="input" placeholder="Product in Stock"
                name='stock' required min="1" />

              <select defaultValue="Pick Product Category" className="select mt-5" name='category' required>
                <option disabled={true}>Pick Product Category</option>
                {
                  categories.map(cat => (
                    <>
                      {
                        cat.categories.map(item => <option key={item.slug}>{item.name}</option>)
                      }
                    </>
                  ))
                }
              </select>
              <label className="label mt-5">Tags</label>
              <input type="text" className="input" placeholder="Tags (seperated by comma)"
                name='tags' required />

              <label className="label mt-5">Image URL</label>
              <input type="url" className="input" placeholder="Image link"
                name='thumbnail' required />

              <label className="label mt-5">Discount Parcentage</label>
              <input type="number" className="input" placeholder="discountPercentage"
                name='discountPercentage' required min="0" />

              <label className="label mt-5">Email</label>
              <input type="email" className="input" placeholder="Contact Info"
                name='userEmail' disabled={true} value={user.email} />

              <label className="label mt-5">Name</label>
              <input type="text" className="input" placeholder="Contact Info"
                name='userName' disabled={true} value={user.displayName} />

              <button className="btn btn-primary text-white mt-4" type='submit'>Add Now</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProducts

