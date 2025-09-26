import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { use } from 'react'
import { AuthContext } from '../context/AuthProvider'
import Product2 from './Product2'
import { Link } from 'react-router'

const Cart = () => {
  document.title = "Cart"
  const [uid, setUid] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartProduct, setCartProduct] = useState([])
  const { user } = use(AuthContext)

  useEffect(() => {
    let data = []
    fetch(`http://localhost:3000/cart/${user.email}`)
    .then(res => res.json())
    .then(async cartItems => {
      setUid(cartItems);
      const products = await Promise.all(
        cartItems.map(item =>
          fetch(`http://localhost:3000/products/${item.id}`)
          .then(res => res.json())
        )
      );
      setCartProduct(products);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [uid])


  if (loading) return <LoadingSpinner></LoadingSpinner>
  // console.log(cartProduct)
  else return (
    <div className='py-10 container mx-auto'>
      {
        uid.length > 0 ? <>
          <h1 className='text-3xl text-center font-bold my-10'>My Cart</h1>
          <div className='grid md:grid-cols-4 gap-5'>
            {
              cartProduct.map(item => <Product2 product={item} key={item._id} uid = {uid}></Product2>)
            }
          </div>


        </> : <div className='text-center'>
          <h1 className='my-5 text-3xl text-center'> No item found</h1>
          <Link to='/allProducts' className=" btn btn-primary my-5 px-4 py-4 text-white text-bold text-xl rounded-xl">Add Products</Link>
        </div>
      }

    </div>
  )
}

export default Cart