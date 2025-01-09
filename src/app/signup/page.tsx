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
			console.log("Signup Success ",response.data );
			router.push("/login");
		} catch (error: any) {
			// console.log("Signup Failed ", error);
			toast.error("User Already Exists"			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	const keyEventHandler = (e: any) => {
		console.log("Key Pressed : ", e.key);
		if (e.key === "Enter") {
			onSignup();
		}
	
	  }
	

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<div className="flex flex-col items-center border p-4 rounded-xl " onKeyDown={keyEventHandler}>
			<h1 className="text-3xl mb-4">{loading ? "Processing ..." : "Signup"}</h1>
			{/* <label htmlFor="username">Username</label> */}
			<input
				type="text"
				id="username"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="Username"
				className=" p-2 m-2 text-black rounded-lg"
			/>
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
				onClick={onSignup}
			>
				{buttonDisabled ? "No Signup" : "Signup"}
			</button>
			<Link href="/login" className="my-2">visit login</Link>
			</div>
		</div>
	);
}
