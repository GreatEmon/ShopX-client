import React, { use, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const Updata = () => {

    const categories = useLoaderData()
    document.title = "Update Product";
    const { user } = use(AuthContext)
    const { id } = useParams()
    const [listing, setListing] = useState({})
    const [load, setload] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://shop-x-backend-seven.vercel.app/products/${id}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        }).
            then(res => res.json()).
            then(r => {
                setListing(r)
                setload(false)
            })
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());
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

        if (data.discountPercentage < 0 || data.minimumOrderQuantity < 0 || data.price < 0 || data.rating < 0 || data.stock < 0) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: " Must Be positive number",
                showConfirmButton: false,
                timer: 1500
            });
        }

        if (data.stock < data.minimumOrderQuantity) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Stock must be greater than minimum order quantity",
                showConfirmButton: false,
                timer: 1500
            });
        }

        fetch(`https://shop-x-backend-seven.vercel.app/update/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).
            then(res => res.json()).
            then(out => {
                console.log(out)
                if (out.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product Updated ",
                        showConfirmButton: false,
                        timer: 1500
                    });

                navigate(`/product/${id}`)
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

    if (load) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className='flex justify-center my-[60px]'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleForm}>
                        <h2 className='font-semibold text-2xl text-center py-5'>Update product</h2>
                        <fieldset className="fieldset">

                            <label className="label mt-5">Title</label>
                            <input type="text" className="input" placeholder="Title"
                                name='title' required defaultValue={listing.title} />

                            <label className="label mt-5">Description</label>
                            <input type="text" className="input" placeholder="Description"
                                name='description' required defaultValue={listing.description} />

                            <label className="label mt-5">Brand Name</label>
                            <input type="text" className="input" placeholder="Brand Name"
                                name='brand' required defaultValue={listing.brand} />

                            <label className="label mt-5">Price</label>
                            <input type="number" className="input" placeholder="Price"
                                name='price' required defaultValue={listing.price} />

                            <label className="label mt-5">Rating</label>
                            <input type="number" className="input" placeholder="Rating(1-5)"
                                name='rating' required defaultValue={listing.rating} />

                            <label className="label mt-5">Minimum Order Quantity</label>
                            <input type="number" className="input" placeholder="Minimum Order Quantity"
                                name='minimumOrderQuantity' required min="1" defaultValue={listing.minimumOrderQuantity} />

                            <label className="label mt-5">Stock</label>
                            <input type="number" className="input" placeholder="Product in Stock"
                                name='stock' required min="1" defaultValue={listing.stock} />

                            <select defaultValue={listing.category} className="select mt-5" name='category' required>
                                <option disabled={true}>Pick Product Category</option>
                                {
                                    categories.map(cat => (
                                        <>
                                            {
                                                cat.categories.map(item => <option key={item.slug} value={item.name}>{item.name}</option>)
                                            }
                                        </>
                                    ))
                                }
                            </select>
                            <label className="label mt-5">Tags</label>
                            <input type="text" className="input" placeholder="Tags (seperated by comma)"
                                name='tags' required defaultValue={listing.tags} />

                            <label className="label mt-5">Image URL</label>
                            <input type="url" className="input" placeholder="Image link"
                                name='thumbnail' required defaultValue={listing.thumbnail} />

                            <label className="label mt-5">Discount Parcentage</label>
                            <input type="number" className="input" placeholder="discountPercentage"
                                name='discountPercentage' required min="0" defaultValue={listing.discountPercentage} />

                            <label className="label mt-5">Email</label>
                            <input type="email" className="input" placeholder="Contact Info"
                                name='userEmail' disabled={true} value={user.email} />

                            <label className="label mt-5">Name</label>
                            <input type="text" className="input" placeholder="Contact Info"
                                name='userName' disabled={true} value={user.displayName} />

                            <button className="btn btn-primary text-white mt-4" type='submit'>Update</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Updata
