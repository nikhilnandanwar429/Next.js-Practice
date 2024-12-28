"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout SUccessful");
      router.push("/login");
    } catch (error: any) {
      // console.log("Error from profile ", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    // console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <p>Profile Page</p>
      <h2 className="p-3 bg-green-500 rounded-lg m-2 text-black">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-orange-500 p-2 px-4 text-black rounded-lg m-2"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-violet-600 p-2 px-4 text-black rounded-lg m-2"
      >
        getUserDetails
      </button>
    </div>
  );
}
