import nodemailer from 'nodemailer';

export class EmailUtil {
    static async sendVerificationEmail(to: string, code: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Verify your email',
            text: `Your verification code is: ${code}`,
        });
    }
}
