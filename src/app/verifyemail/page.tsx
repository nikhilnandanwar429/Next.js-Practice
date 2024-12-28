"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [urlType, setUrlType] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onResetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, password });
      // console.log("reset password success");

      router.push("/login");
    } catch (error: any) {
      setError(true);
      // console.log("ERROR in OnResetPassword page : ", error.message);
    }
  };

  const verifyUserEmail = async () => {
    try {
      // console.log("MERA TOKEN IS: ", token);
      // console.log("MERA TYPE IS: ", urlType);

      await axios.post("/api/users/verifyemail", { token, urlType });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      // console.log("ERRoR from verify email client ", error.response.data);
    }
  };

  useEffect(() => {
    // console.log(
    //   "YE WALA ++> ",
    //   window.location.search.split("&")[0].split("=")[1]
    // );

    const urltype = window.location.search.split("&")[0].split("=")[1];
    const urlToken = window.location.search.split("&")[1].split("=")[1];
    setToken(urlToken || "");
    setUrlType(urltype || "");
    // console.log("MERA TOKEN IS: ",urlToken);
    // console.log("MERA TYPE IS: ",urltype);
    // console.log("MERA TOKEN IS: ",token);
    // console.log("MERA TYPE IS: ",urlType);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl m-2">Verify Email</h1>
      {/* <h2 className="p-2 m-2 rounded-lg bg-orange-500 text-black">
        {token ? `${token} ` : "no token"}
      </h2> */}
      <h2 className="p-2 m-2 rounded-lg bg-orange-500 text-black">
        {urlType ? ` ${urlType}` : "no urlType"}
      </h2>
      {urlType === "RESET" && verified && (
        <>
          <label htmlFor="password">username</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="new password"
            className=" p-2 m-2 text-black rounded-lg"
          />
          <button
            className="bg-orange-500 p-2 px-4 text-black rounded-lg"
            onClick={onResetPassword}
          >
            Reset password
          </button>
        </>
      )}
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className=" m-2 text-2xl p-2 bg-red-500 text-black rounded-lg">
            Error {error}
          </h2>
        </div>
      )}
    </div>
  );
}
