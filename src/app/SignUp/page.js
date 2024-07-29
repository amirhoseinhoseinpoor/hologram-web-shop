

'use client'
import React, { useState , useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {login} from '../Store/thunks';
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function SignUp() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter()
    
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
      event.preventDefault();
      try{
        const credentials = { username, password }; // Create credentials object from form data
        await dispatch(login(credentials)); // Dispatch login thunk with credentials
        
        // router.push('../page.js')
      }catch (error) {
        console.error('login error me:' , error );
      }
      
      
      // 
    };
    
    const handleLogi2n = async (e) => {
      e.preventDefault();
      try {
        await dispatch(login({username , password}));
        alert("suc login")
      } catch (error) {
        console.error('login error me:' , error ); // Handle login errors gracefully (e.g., display error message)
      }
    };
   
    //handeling submit and fetch api
    // const handleSubmit = async (e) => {
    //     alert('hi');
    //     e.preventDefault();
    //     // const result = await signIn('credentials', {
    //     //   redirect: false, // Prevent default redirection
    //     //   username,
    //     //   password,
    //     // });
    //     // if (result.error) {
    //     //     console.error('Login error:', result.error); // Handle login errors
    //     // } else {
    //     //     // Successfully logged in
    //     //     dispatch(setUser(result.user)); // If using Redux to update user state
    //     // }
    // };

    return(
      
        <section className="h-100">
          <form onSubmit={handleLogin} className='form-border p-2 bg-white rounded container'>
             <div className='d-flex flex-row justify-content-center mt-3 mb-4'>           
                <div>
                  <p className='fs-5 fw-medium'>Sign in</p>
                </div>
             </div>  
   
             
             
             <div className="d-flex flex-row align-items-center mb-4">
               <label htmlFor="username" className='ms-3'>Username</label>
               <input
                 type="text"
                 className="form-control"
                 id="username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 required
               />
             </div>
             <div className="d-flex flex-row align-items-center">
               <label htmlFor="password" className='ms-3'>Password</label>
               <input
                 type="password"
                 className="form-control"
                 id="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>
             <div className="d-flex flex-row align-items-center mt-2">
               <label htmlFor="confirmPassword" className='ms-3' style={{whiteSpace: 'nowrap'}}>confirm password</label>
               <input
                 type="password"
                 className="form-control"
                 id="confirmPassword"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />
             </div>
            
             <button disabled={!username || !password || password !== confirmPassword} type="submit" className="btn btn-primary w-100 mt-5">
                 signup
             </button>
             <Link href="/Login">
               <button className="btn btn-primary w-100 mt-5">
                 have an account ? forgot password
              </button>
             </Link>
             
             
             {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
           </form>
          
        </section>
    )
}