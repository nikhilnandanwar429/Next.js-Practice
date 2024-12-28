import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    //check if user exists or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "User not Exists",
        success: false,
      });
    }
    // console.log("user from forgotpassword route : ", user);

    //send  verification email
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "Email Send Successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error from forgotpassword route " + error.message,
      },
      { status: 400 }
    );
  }
}
