import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";

export function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <>
    <p className="text-center mt-4">Login to create, edit and view your templates</p>
    <h1 className="mt-8">Google Login</h1>
    <div className="flex items-center justify-center">
      <div className="flex-col text-center p-8 bg-base-300 rounded-md">
        <button className="btn btn-lg btn-primary" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
</>
  );
}