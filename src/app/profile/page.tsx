"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log(res.data);
    console.log(res.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white py-2">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>

      <hr className="w-1/3 border-gray-700 mb-6" />

      <h2 className="text-lg">
        {data === "nothing" ? (
          <span className="text-gray-400">No Data to Display</span>
        ) : (
          <Link
            href={`/profile/${data}`}
            className="text-blue-400 hover:text-blue-500 underline transition"
          >
            {data}
          </Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
