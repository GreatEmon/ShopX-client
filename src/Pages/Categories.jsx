import { Link, useLoaderData } from 'react-router';

const Categories = () => {
  const categories = useLoaderData()
  
  return (
    <div className='container mx-auto my-15'>
      <h1 className='text-center font-bold md:text-4xl'>Shop By Categories</h1>

      {categories.map(cat => (
          <div className='my-15' key={cat._id}>
            <h1 className='font-bold text-2xl mb-3'>{cat.group}</h1>
            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5'>
              { cat.categories.map(item => (
                <div className="bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <div className="card-actions justify-start">
                      <Link to={`/category/${item.slug}`} className="btn btn-primary">Shop Now</Link>
                    </div>
                  </div>
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