import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='text-center'>
      <p className='p-2 font-bold text-2xl'> not found </p>
      <Link to="/" className='border-gray-200 bg-gray-100 rounded-sm hover:bg-gray-50 border-2 p-1'> Go to calendar </Link>
    </div>
  )
}

export default NotFound
