import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({  
    service: 'gmail', // Use your email service  
    auth: {  
      user: process.env.USER_MAILID, // Your email  
      pass: process.env.USER_PWD, // Your email password or app password  
    },  
  });  
  
  export const sendNotification = async (userEmail, bookTitle) => {  
    const mailOptions = {  
      from: process.env.USER_MAILID,  
      to: userEmail,  
      subject: 'Book Reservation Notification',  
      text: `The book "${bookTitle}" is now available for you to borrow!`,  
    };  
  
    try {  
      await transporter.sendMail(mailOptions);  
      console.log(`Notification sent to ${userEmail}`);  
    } catch (error) {  
      console.error('Error sending email:', error);  
    }  
  };  