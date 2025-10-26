import { Link, useLoaderData } from 'react-router';
import { motion } from "framer-motion";

const Categories = () => {
  const categories = useLoaderData()

  return (
    <div className='container mx-auto my-15'>
      <h1 className='text-center font-bold text-4xl'>Shop By Categories</h1>

      {categories.map(cat => (
        <div className='my-15 mx-2' key={cat._id}>
          <h1 className='font-bold text-2xl mb-3'>{cat.group}</h1>
          <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5'>
            {cat.categories.map(item => (

              <div className="bg-base-100 shadow-sm">
                <motion.div
                  whileHover={{ scale: 1.10 }}
                  whileTap={{ scale: 0.98 }}
                  className="card-body"
                >
                  <h2 className="card-title">{item.name}</h2>
                  <div className="card-actions justify-start">
                    <Link to={`/category/${item.slug}`} className="btn btn-primary">Shop Now</Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default Categories