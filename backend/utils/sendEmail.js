//Install firstlly nodemailer
const nodeMailer = require("nodemailer");
//format of nodemailer to send email ot anyone
const sendEmail = async (options) => {
  //ye vhi object jo send kia hai

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_Service,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

 const info= await transporter.sendMail(mailOption);

};

module.exports = sendEmail;
