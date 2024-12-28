import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log("reqBody from verifyemail route ", reqBody);

    const { token, urlType } = reqBody;
    // console.log("THis is token from verifyemail route: ", token);
    // console.log("THis is type from verifyemail route: ", urlType);

    const user =
      urlType === "RESET"
        ? await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
          })
        : await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
          });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid token from verifyemail route" },
        { status: 400 }
      );
    }
    // console.log("This is user from verifyemail route: ", user);
    if (urlType === "RESET") {
      user.isVerified = true;
      // user.forgotPasswordToken = undefined;
      // user.forgotPasswordTokenExpiry = undefined;
    } else if (urlType === "VERIFY") {
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
    }
    await user.save();

    return NextResponse.json({
      message: "Email Successfully verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Verifyemail route" + error.message },
      { status: 500 }
    );
  }
}
