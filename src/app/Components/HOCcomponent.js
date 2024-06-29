'use client'

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

function withPageAuthRequired(WrappedComponent) {
    function WithPageAuthRequired(props) {
        const authState = useSelector((state) => state.auth);  
        const router = useRouter();
        
        useEffect(() => {
            if (!authState.token) {
                router.push('/'); 
            }
        }, [authState.token, router]);
    
        if (!authState.token) {
            return null;
        }

        return <WrappedComponent {...props} />;
    }

    return WithPageAuthRequired;
}

export default withPageAuthRequired;
