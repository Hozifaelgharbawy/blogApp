const nodeMailer = require("nodemailer")

exports.sendEmail = async (receiver, subject, text, html) => {
    
    let transporter = nodeMailer.createTransport({
        // host: "smtp.ethereal.email",
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MY_USER,
            pass: process.env.MY_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Node Mailer" <node@mailer.org>', // sender address
        to: receiver, // list of receivers
        subject,
        text,
        html
    });

    console.log("Message sent: ", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}


