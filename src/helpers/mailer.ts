import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		//create hash token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		console.log("Hello form malier");
		
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}
		// Looking to send emails in production? Check out our Email API/SMTP product!
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
		});

		const mailOptions = {
			from: "nikhil@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY"
					? "Verify your email"
					: "Reset your password",
			html: `<p>Click <a 
      href="${
			process.env.DOMAIN
		}/verifyemail?type=${emailType}&token=${hashedToken}"
      >
      here
      </a> to 
      ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
      or copy paste the link in browser. <br> 
      ${process.env.DOMAIN}/verifyemail?type=${emailType}&&token=${hashedToken}
       </p> `,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error("Error at mailer.ts" + error.message);
	}
};
