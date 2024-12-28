import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(params: NextRequest) {
  try {
    const reqBody = await params.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "NO user with token FROM resetpassword",
        },
        { status: 404 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.save();

    return NextResponse.json({
      message: "Reset password successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "ERROR at resetpassword route " + error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
