import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASSWORD,
    }
});

// transporter.verify(function (error, success) {
//     console.log(process.env.NODEMAILER_EMAIL);
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take messages");
//     }
// });

const emailSender = (option) => {

    const templatePath = path.join(import.meta.dirname, "../template/otpTemplate.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    const html = template.replace("{{otp}}", option.otp);
    const info = {
        from: process.env.NODEMAILER_SENDER_EMAIL,
        to: option.to,
        subject: option.subject,
        html: html
    }
    console.log("nodemailer section");
    transporter.sendMail(info, (err, info) => {
        if (err) {
            throw err;
        }
        console.log("Email sent: " + info.response);
        return true;
    })
}



export { emailSender }