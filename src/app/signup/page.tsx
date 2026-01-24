
'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length){
      setButtonDisabled(false)

    }
    else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="w-full max-w-md p-6 bg-neutral-900 rounded-xl shadow-lg border border-neutral-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          {loading ? "Processing..." : "Signup"}
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="p-2 rounded-md bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-2 rounded-md bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-2 rounded-md bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className={`p-2 rounded-md font-medium transition ${
              buttonDisabled
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Signup
          </button>
          <Link
            href="/login"
            className="mt-4 block text-center text-sm text-neutral-400 hover:text-blue-500 transition"
          >
            Already have an account?{" "}
            <span className="font-medium underline underline-offset-4">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

}
