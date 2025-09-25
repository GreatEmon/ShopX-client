import React, { use, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { GoogleAuthProvider } from 'firebase/auth'
import Swal from 'sweetalert2'
import LoadingSpinner from '../components/LoadingSpinner'
import { AuthContext } from '../context/AuthProvider'

const Login = () => {
    document.title = "Login"
    const { login, logwGoogle, setUser } = use(AuthContext)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const location = useLocation(); 
 
    const handleSubmit = (e) => {
        setLoad(true)
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password).then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                title: 'Success',
                text: 'Login Successful',
                icon: 'success',
                confirmButtonText: 'Done'
            })
            setLoad(false)
            navigate(location.state || '/')
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                title: 'Error',
                text: 'Invalid email or password',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setLoad(false)
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
            navigate(location.state || '/')
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            Swal.fire({
                title: 'Error',
                text: 'Access denied',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setLoad(false)
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

    return load ? <LoadingSpinner/> : 
    (
        <div className='flex justify-center my-[135px]'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h2 className='font-semibold text-2xl text-center py-5'>Login your account</h2>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email"
                                name='email' required />

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password"
                                name='password' required />

                            <button className="btn btn-primary mt-4" type='submit'>Login</button>
                            <p className='text-center font-semibold'>Dont’t Have An Account ? <Link to="/register" className='text-secondary py-2'>Register</Link></p>
                        </fieldset>
                    </form>
                    <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogle}>
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>

        </div>
        )
}

export default Login