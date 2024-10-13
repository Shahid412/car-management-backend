// backend/utils/email.js
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to, // recipient email address
      from: process.env.SENDGRID_FROM_EMAIL, // verified sender email
      subject,
      text,
    };

    await sgMail.send(msg);
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Email not sent to:', to);
    console.error(error);
  }
};

module.exports = sendEmail;
