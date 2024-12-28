"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        // console.log("Signup Success ",response.data );
        router.push("/login");
        
    } catch (error: any) {
        // console.log("Signup Failed ", error.message);
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setButtonDisabled(false);
    }else{
        setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello {loading ? "Processing ..." : "Signup"}</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className=" p-2 m-2 text-black rounded-lg"
      />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className=" p-2 m-2 text-black rounded-lg"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className=" p-2 m-2 text-black rounded-lg" 
      />
      <button className="bg-orange-500 p-2 px-4 text-black rounded-lg" onClick={onSignup}>
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">visit login</Link>
    </div>
  );
}
