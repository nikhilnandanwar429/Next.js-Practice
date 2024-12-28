"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      // console.log(email);

      const response = await axios.post("/api/users/forgotpassword", { email });
      // console.log("Link Send ", response.data);
      toast.success("Link Send");
      // router.push("/profile");
    } catch (error: any) {
      // console.log("ERROR in forgotpassword page", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello {loading ? "Processing..." : "forgot password"}</h1>

      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className=" p-2 m-2 text-black rounded-lg"
      />
      <button
        className="bg-orange-500 p-2 px-4 text-black rounded-lg"
        onClick={onForgotPassword}
      >
        {buttonDisabled ? "enter email" : "Send link"}
      </button>
      <Link href="/login">visit login</Link>
    </div>
  );
}
