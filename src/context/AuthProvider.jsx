import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import {app} from '../Firebase/Firebase.configue'
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext()
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
  const [user,setUser] = useState()
  const [loading,setLoading] = useState(true)
  
  const register = (email, password)=>{
     return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email,password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () =>{
    return signOut(auth)
  }

  const logwGoogle = ()=>{
    return signInWithPopup(auth, provider)
  }


  const resetPassword = (email) =>{
    return sendPasswordResetEmail(auth, email)
  }

  const updateUser = (updateData) =>{
    return updateProfile(auth.currentUser, updateData)
  }

   useEffect(()=>{
     const unsubscribe =  onAuthStateChanged(auth,(user)=>{
          if (user) {
            setUser(user)
            setLoading(false)
          } else {
              setLoading(false)
          }
      });
  
      return  () => unsubscribe()
  
    },[])


  const authData = {
      register,
      login,
      user,
      setUser,
      logout,
      logwGoogle,
      resetPassword,
      loading,
      setLoading,
      updateUser
  }




  return <AuthContext value={authData}> {children}</AuthContext>
}

export default AuthProvider