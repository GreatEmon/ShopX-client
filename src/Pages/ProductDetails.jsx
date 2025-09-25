import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { use } from 'react'
import { Link, useParams } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import Product from '../components/Product'
import LoadingSpinner from '../components/LoadingSpinner'


const ProductDetails = () => {
  document.title = "Product By Category"
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = use(AuthContext)
  const slug = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/category/${slug.slug}`).
      then(res => res.json()).
      then(r => {
        setData(r)
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className='py-10 container mx-auto'>
      {
        data.length > 0 ? <>
          <h1 className='text-3xl text-center font-bold my-10'>My Products</h1>
          <div className='grid md:grid-cols-4 gap-5'>
            {
              data.map(item => <Product product={item} key={item._id}></Product>)
            }
          </div>



        </> : <div className='text-center'>
          <h1 className='my-5 text-3xl text-center'> No item found</h1>
          <Link to='/add' className=" btn btn-primary my-5 px-4 py-4 text-white text-bold text-xl rounded-xl">Add Products</Link>
        </div>
      }

    </div>
  )
}

export default ProductDetails