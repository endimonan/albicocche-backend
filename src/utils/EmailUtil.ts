import nodemailer from "nodemailer";
import { verificationEmailTemplate } from "./templates/verificationEmail";

export class EmailUtil {
  static async sendVerificationEmail(to: string, code: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Albicocche" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify your email",
      html: verificationEmailTemplate(code),
    });
  }
}
