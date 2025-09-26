import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { use } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import Product from '../components/Product'
import LoadingSpinner from '../components/LoadingSpinner'


const MyProducts = () => {
  document.title = "My Products"
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = use(AuthContext)

  useEffect(() => {
    fetch(`http://localhost:3000/myproducts/${user.email}`).
      then(res => res.json()).
      then(r => {
        setData(r)
        setLoading(false)
      })
  }, [user?.email, data])

  if (loading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className='py-10 container mx-auto'>
      {
        data.length > 0 ? <>
          <h1 className='text-3xl text-center font-bold my-10'>My Products</h1>
          <div className='grid md:grid-cols-4 gap-5'>
            {
              data?.map(item => <Product product={item} key={item._id}></Product>)
            }
          </div>



        </> : <div className='text-center'>
          <h1 className='my-5 text-3xl text-center'> No item found</h1>
          <Link to='/addProducts' className=" btn btn-primary my-5 px-4 py-4 text-white text-bold text-xl rounded-xl">Add Products</Link>
        </div>
      }

    </div>
  )
}

export default MyProducts