'use client';

import { useEffect } from 'react';
import axios from 'axios';

const LogVisit = () => {
  useEffect(() => {
    const logVisit = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/analytics/visit`, {
          userAgent: navigator.userAgent,
        });

        
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };

    logVisit();
  }, []);

  return null; // This component does not render anything
};

export default LogVisit;
