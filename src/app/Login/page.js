'use client'
import React, { useState } from 'react';
import Link from 'next/link';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

   

    // handeling submit and fetch api
    const handleSubmit = async (e) => {
        alert('hi');
        e.preventDefault();
        // const result = await signIn('credentials', {
        //   redirect: false, // Prevent default redirection
        //   username,
        //   password,
        // });
        // if (result.error) {
        //     console.error('Login error:', result.error); // Handle login errors
        // } else {
        //     // Successfully logged in
        //     dispatch(setUser(result.user)); // If using Redux to update user state
        // }
    };

    return(
        <section className="h-100">
          <form onSubmit={handleSubmit} className='form-border p-2 bg-white rounded container'>
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
            
             <button disabled={!username || !password} type="submit" className="btn btn-primary w-100 mt-5">
               Login
             </button>
             <Link href="/ForgetPassword">
               <button className="btn btn-primary w-100 mt-5">
                 forgot password
              </button>
             </Link>
             <Link href="/SignUp">
              <button type="submit" className="btn btn-primary w-100 mt-5">
                 signup
              </button>
             </Link>
             
             {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
           </form>
          
        </section>
    )
}