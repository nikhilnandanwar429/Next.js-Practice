"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login Success " ,response.data);
      toast.success("Login Succcess");
      router.push("/profile");
    } catch (error: any) {
      // console.log("Login Failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const keyEventHandler = (e: any) => {
    console.log("Key Pressed : ", e.key);
    if (e.key === "Enter") {
      onLogin();
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen py-2 ">
      <div
        onKeyDown={keyEventHandler}
        className="flex flex-col items-center border p-4 rounded-xl"
      >
        <h1 className="text-3xl mb-4"> {loading ? "Processing..." : "Login"}</h1>

        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className=" p-2 m-2 text-black rounded-lg"
        />
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className=" p-2 m-2 text-black rounded-lg"
        />
        <button

          className="bg-orange-500 p-2 px-4 text-black rounded-lg"
          onClick={onLogin}
        >
          Login Here
        </button>
        <Link 
        href="/forgotpassword"
        className="my-2"
        >forgot password</Link>
        <Link href="/signup">visit signup</Link>
      </div>
    </div>
  );
}
