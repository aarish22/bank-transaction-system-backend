// The email.services.js file is responsible for sending emails to users. It uses the nodemailer package to send emails through a Gmail account. The transporter object is created with the necessary configuration for the email service and authentication details. The sendEmail function is defined to send an email with the specified recipient, subject, text, and HTML content. Additionally, there are specific functions for sending registration emails, transaction alert emails, and transaction failure alert emails, which utilize the sendEmail function to send the appropriate messages to users.

require('dotenv').config();
const nodemailer = require('nodemailer');

// SMTP servers are used to send emails. In this case, we are using Gmail's SMTP server to send emails from a Gmail account. The transporter object is created using the nodemailer.createTransport() method, which takes an object with the configuration for the email service and authentication details. The authentication details include the type of authentication (OAuth2), the email address of the sender, and the client ID, client secret, and refresh token for OAuth2 authentication. These values are stored in environment variables for security reasons.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank Backend" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, userName){
  const subject = 'Welcome to Bank Transaction System';
  const text = `Hi ${userName},\n\nWelcome to Bank Transaction System! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nBank Transaction System Team`;
  const html = `<p>Hi ${userName},</p><p>Welcome to Bank Transaction System! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>Bank Transaction System Team</p>`;
  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, userName, amount, toAccount){
  const subject = 'Transaction Alert';
  const text = `Hi ${userName},\n\nA transaction of $${amount} has been made to account ${toAccount}. If you did not authorize this transaction, please contact our support team immediately.\n\nBest regards,\nBank Transaction System Team`;
  const html = `<p>Hi ${userName},</p><p>A transaction of $${amount} has been made to account ${toAccount}. If you did not authorize this transaction, please contact our support team immediately.</p><p>Best regards,<br>Bank Transaction System Team</p>`;
  await sendEmail(userEmail, subject, text, html);
 
}

async function sendTransactionfailedEmail(userEmail, userName, amount, toAccount){
  const subject = 'Transaction Failed Alert';
  const text = `Hi ${userName},\n\nA transaction of $${amount} to account ${toAccount} has failed. Please check your account balance and try again. If you continue to experience issues, please contact our support team.\n\nBest regards,\nBank Transaction System Team`;
  const html = `<p>Hi ${userName},</p><p>A transaction of $${amount} to account ${toAccount} has failed. Please check your account balance and try again. If you continue to experience issues, please contact our support team.</p><p>Best regards,<br>Bank Transaction System Team</p>`;
  await sendEmail(userEmail, subject, text, html);
}

module.exports = {sendRegistrationEmail , sendTransactionEmail, sendTransactionfailedEmail};