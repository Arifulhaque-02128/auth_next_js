import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendMail = async ({email, emailType, userId} : any) => {

    try {
        // hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken : hashedToken,
                verifyTokenExpiry : Date.now() + 3600000
            })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken : hashedToken,
                forgetPasswordTokenExpiry : Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 2525,
            auth: {
              user: process.env.MAILER_USER_ID,
              pass: process.env.MAILER_PASSWORD
            }
        });

        const mailOptions = {
            from : process.env.SOURCE_EMAIL,
            to : email,
            subject : emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html : emailType === "VERIFY" ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here </a> to Verify your email or please copy and paste this url to your browser : "${process.env.DOMAIN}/verifyemail?token=${hashedToken}" </p>` 
            :
            `<p>Click <a href="${process.env.DOMAIN}/resetpass?token=${hashedToken}"> Here </a> to Reset your password or please copy and paste this url to your browser : "${process.env.DOMAIN}/resetpass?token=${hashedToken}" </p>` 
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    } catch (err: any) {
        throw new Error(err.message)
    }
}
