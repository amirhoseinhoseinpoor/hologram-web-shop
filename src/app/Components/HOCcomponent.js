'use client'

import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';

function withPageAuthRequired(WrappedComponent) {
    return function withPageAuthRequired(props) {
        const authState = useSelector((state) => state.auth);  
        const router = useRouter();
        useEffect(() => {
            // if (!authState.token) {
            //     router.push('/Login'); 
            // }
        }, [authState.token, router]);
    
        // if (!authState.token) {
        //     return null 
        // }
        return (<WrappedComponent {...props} />);
    }
    
}

// const withPageAuthRequired = (WrappedComponent) => (props) => {
//     const authState = useSelector((state) => state.auth);
   
//     const router = useRouter();

//     useEffect(() => {
//         // if (!authState.token) {
//         //     router.push('/Login'); 
//         // }
//     }, [authState.token, router]);

//     // if (!authState.token) {
//     //     return null 
//     // }
//     return (<WrappedComponent {...props} />);
// };

export default withPageAuthRequired;