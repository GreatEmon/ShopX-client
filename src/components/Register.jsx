import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { GoogleAuthProvider } from 'firebase/auth'
import Swal from 'sweetalert2'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from '../context/AuthProvider'

const Register = () => {
  document.title = "Register"
  const { register, user, setUser, logwGoogle, updateUser } = use(AuthContext)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    setLoad(true)
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    register(email, password).
      then(result => {
        const user = result.user
        updateUser({
          displayName: name,
          photoURL: photoURL
        }).then(() => {
          setUser(user)
        }).catch((error) => {
          Swal.fire({
          title: 'Error',
          text: 'Please check all the field',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        });

        
        setLoad(false)
        Swal.fire({
          title: 'Success',
          text: 'Register Successful',
          icon: 'success',
          confirmButtonText: 'Done'
        })
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoad(false)

        Swal.fire({
          title: 'Error',
          text: 'Please check all the field',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });

  }

  const handleGoogle = () => {
    logwGoogle().then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser(setUser)
      navigate('/')
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });  
  }



  return load ? <LoadingSpinner></LoadingSpinner> :(
    <div className='flex justify-center my-[135px]'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className='card-body'>
          <form onSubmit={handleRegister}>
            <h2 className='font-semibold text-2xl text-center py-5'>Register your account</h2>
            <fieldset className="fieldset space-y-2">
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Name"
                name='name'
                required />

              <label className="label">Photo URL</label>
              <input type="text" className="input" placeholder="Photo URL"
                name='photoURL'
                required />

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email"
                name='email'
                required />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password"
                name='password'
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                required />
              <div className='text-[13px] list text-red-400 px-5'>
                <li>Must contain 1 lower case letter</li>
                <li>Must contain 1 Upper case letter</li>
                <li>Minimum 6 character</li>

              </div>

              <button className="btn btn-primary mt-4" type='submit'>Register</button>
              <p className=' text-center font-semibold'>Already Have An Account ? <Link to="/login" className='text-secondary py-2'>Login</Link></p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register