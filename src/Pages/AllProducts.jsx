import React from 'react'
import { useLoaderData } from 'react-router'
import Product from '../components/Product'

const AllProducts = () => {
  const data = useLoaderData()
  return (
    <div className='container mx-auto'>
        <h1 className='text-center font-bold md:text-4xl my-5'>All Products</h1>
        <div className='grid md:grid-cols-4 gap-5'>
            {
              data.map(item => <Product product={item} key={item._id}></Product>)
            }
        </div>
        
    </div>
  )
}

export default AllProducts