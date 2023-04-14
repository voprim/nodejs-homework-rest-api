const nodemailer = require("nodemailer");
require("dotenv").config();

const { SMTP_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_USERNAME } = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  sacure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { from: SMTP_USERNAME, ...data };
  try {
    await transporter.sendMail(email, function (info) {
      console.log("Email sent: " + info.response);
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
