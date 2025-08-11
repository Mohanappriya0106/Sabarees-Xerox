import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testSend() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SHOP_EMAIL,
      subject: 'Test Email from Node.js',
      text: 'This is a test email to verify SMTP setup.',
    });
    console.log('Test email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

testSend();
