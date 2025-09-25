import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import { AuthContext } from './AuthProvider'


const PrivateRoute = ({children}) => {
  const {user,loading} = use(AuthContext)
  const location = useLocation()

  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }
  
  if(user && user?.email){
    return children
  }else{
    return <Navigate state={location.pathname} to='/login'></Navigate>
  }
}

export default PrivateRoute