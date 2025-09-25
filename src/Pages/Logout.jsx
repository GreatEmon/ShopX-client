import React, { use } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const Logout = () => {
    const navigate = useNavigate()
    const { logout, setUser } = use(AuthContext)
    logout().then(() => {
        setUser(null)
        Swal.fire({
            title: 'Logout',
            text: 'Logout Successfull',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        navigate('/')
    }).catch((error) => {
        
    });


    return (
        <></>
    )
}

export default Logout