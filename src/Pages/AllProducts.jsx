import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import LoadingSpinner from '../components/LoadingSpinner'
import Table from '../components/Table'
import { use } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AllProducts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [btn, setBtn] = useState(true)
  const [grid, setGrid] = useState(true)

  const {user} = use(AuthContext)

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3000/home", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, [user]);
  




  async function handleClick(e) {
    setBtn(false)
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/`, {
            headers : {
              authorization : `Bearer ${user.accessToken}`,
            }
          });
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();

      setData(data);
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }


  const handleClickSort = () => {
    const ndata = data.filter(item => item.minimumOrderQuantity > 100)
    setData(ndata)
  }

  if (loading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between my-6 items-center'>
        <h1 className='text-center font-bold md:text-4xl'>All Products</h1>
        <div className='space-x-2'>
          <button className='btn btn-outline btn-primary' onClick={handleClickSort}> Sort</button>
          <button className='btn btn-outline btn-primary' onClick={() => setGrid(true)}> Grid View </button>
          <button className='btn btn-outline btn-primary' onClick={() => setGrid(false)}> List View </button>
        </div>
      </div>
      {
        grid ? <>

          <div className='grid md:grid-cols-4 gap-5'>
            {
              data.map(item => <Product product={item} key={item._id}></Product>)
            }
          </div>
        </> :
          <>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>brand</th>
                    <th>category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Min Order</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    data.map(item => <Table product={item} key={item._id}></Table>)
                  }

                </tbody>
              </table>
            </div>
          </>
      }

      {
        btn ? <div className='text-center my-5'>
          <button className=" btn btn-primary my-5 px-4 py-4 text-white text-bold text-xl rounded-xl text-center" onClick={handleClick}>Load More</button>
        </div> : ""
      }

    </div>
  )
}

export default AllProducts