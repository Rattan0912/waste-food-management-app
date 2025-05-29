const nodemailer = require('nodemailer');
require('dotenv').config(); // <-- make sure you have dotenv installed

// ✅ Using environment variables for secure credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,       // e.g., rattansingh0912@gmail.com
    pass: process.env.MAIL_PASSWORD    // app password, not Gmail password
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Waste-Free Kitchen" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error(`❌ Email sending failed to ${to}:`, error);
  }
};

module.exports = sendEmail;
