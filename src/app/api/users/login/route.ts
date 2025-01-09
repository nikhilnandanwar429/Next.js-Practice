import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;
		// console.log(reqBody);

		//check if user exists or not
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "User Does not Exists" },
				{ status: 400 }
			);
		}

		//check if password is correct
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json(
				{ error: "Invalid Passwprd" },
				{ status: 400 }
			);
		}

		//create token data
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		//create token
		const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Login Successful",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
