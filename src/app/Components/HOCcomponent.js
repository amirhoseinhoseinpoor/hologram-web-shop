"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function withPageAuthRequired(WrappedComponent) {
  function WithPageAuthRequired(props) {
    const authState = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      // wait until the saved session has been restored before deciding
      if (authState.authReady && !authState.token) {
        router.push("/");
      }
    }, [authState.authReady, authState.token, router]);

    if (!authState.authReady || !authState.token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  return WithPageAuthRequired;
}

export default withPageAuthRequired;
