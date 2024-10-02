"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { token } from "../Store/slice";
import { useRouter } from "next/navigation";

function withPageAuthRequired(WrappedComponent) {
  function WithPageAuthRequired(props) {
    const authState = useSelector(token);
    const router = useRouter();

    useEffect(() => {
      if (!authState?.token) {
        router.push("/");
      }
    }, [authState, router]);

    if (!authState?.token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  return WithPageAuthRequired;
}

export default withPageAuthRequired;
