import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User Already Exists" },
        {status: 500}
      );
    }
// console.log("Hello before hash");

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    
    // console.log("Hello after save ",newUser);

    const savedUser = await newUser.save();
    // console.log(savedUser);
    //send  verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
