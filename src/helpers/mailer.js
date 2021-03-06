/* eslint-disable no-console */
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import config from '../config';

const mailer = async (emailToSend) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
      }
    });
    let template;
    let subject;
    switch (emailToSend[0]) {
      case 'sign-up':
        template = '../public/templates/signUp.ejs';
        subject = 'Email Verification';
        break;
      case 'reset-password':
        template = '../public/templates/resetPassword.ejs';
        subject = 'Reset password';
        break;
      default:
        template = '';
    }
    const data = await ejs.renderFile(path.join(__dirname, template), emailToSend[1]);

    const emailOptions = {
      from: '"Ubusizi Support" <support@ingoma.app>',
      to: emailToSend[2],
      subject,
      html: data
    };

    await transporter.sendMail(emailOptions);

    return 1;
  } catch (error) {
    throw error;
  }
};
export default mailer;
