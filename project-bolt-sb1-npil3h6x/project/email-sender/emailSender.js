const nodemailer = require('nodemailer');

// Configure the transporter (email service provider)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider, e.g., 'gmail', 'yahoo', 'hotmail', etc.
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password-or-app-password', // App-specific password (recommended for Gmail)
  },
});

// Function to send an email
const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>', // Sender's name and email
      to: 'recipient-email@example.com', // Recipient's email
      subject: 'Job Application Submission', // Subject line
      text: 'Hello, this is a test email sent using Node.js and Nodemailer.', // Plain text email body
      html: '<p><strong>Hello,</strong> this is a test email sent using Node.js and Nodemailer.</p>', // HTML email body
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Call the function
sendEmail();