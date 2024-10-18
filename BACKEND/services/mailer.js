const nodemailer = require('nodemailer');

const  sendOTP = async (email, otp) => {

    const otpsend = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "diyoraharsh6@gmail.com",
        pass: "qful anrw rmov oekc",
      },
    });

    const mailOptions = {
      from:"diyoraharsh6@gmail.com" ,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}.`,
    };

    await otpsend.sendMail(mailOptions);
    console.log('OTP sent successfully!');
};

const sendingMail = (to, subject, html) => {
  const sendmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "diyoraharsh6@gmail.com",
      pass: "qful anrw rmov oekc",
    },
  });

  const mailOptions = {
          from: "diyoraharsh6@gmail.com",
          to: to,
          subject,
          html
      }
      sendmail.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log(err);
          }
          else {
              console.log(info);
          }
      })
  }
module.exports = {sendOTP , sendingMail}