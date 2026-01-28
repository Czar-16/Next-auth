"use client";

import axios from "axios";

import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      console.log("Frontend token being sent:", token);
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-800 bg-gray-900 shadow-lg text-center">
        {!verified && !error && (
          <>
            <div className="mb-4 animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
            <h1 className="text-xl font-semibold mb-2">Verifying your email</h1>
            <p className="text-gray-400 text-sm">
              Please wait while we confirm your email address.
            </p>
          </>
        )}

        {verified && (
          <>
            <h1 className="text-2xl font-bold text-green-400 mb-3">
              Email Verified 🎉
            </h1>
            <p className="text-gray-300 mb-6">
              Your email has been successfully verified.
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Go to Login
            </a>
          </>
        )}

        {error && (
          <>
            <h1 className="text-2xl font-bold text-red-400 mb-3">
              Verification Failed ❌
            </h1>
            <p className="text-gray-300 mb-6">
              This verification link is invalid or has expired.
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
            >
              Back to Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}
