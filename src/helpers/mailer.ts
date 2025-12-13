import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry  : 1sec = 1000ms
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    //TODO : configure mail for usage
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const mailOptions = {
      from: "anoopjhaopt@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
    <h2>${
      emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
    }</h2>

    <p>Click the link below:</p>

    <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verify" : "reset-password"
      }?token=${hashedToken}">
      ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
    </a>

    <br /><br />

    <p><strong>Token:</strong></p>
    <code>${hashedToken}</code>

    <br /><br />
    <p>If you did not request this, you can ignore this email.</p>
  `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
