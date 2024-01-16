const express = require('express');
const nodemailer = require('nodemailer');
// const speakeasy = require('speakeasy');
const cors = require('cors');
const bodyParser = require('body-parser'); 
// const multer = require('multer');

const app = express();

const port = 5000;
app.use(cors({
  origin: 'https://mass-mailer-frontend.vercel.app', // Replace with your frontend's actual domain
  credentials: true,
}));
app.use(bodyParser.json()); 
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vineetalp002@gmail.com',
    pass: 'gubq agfa dldr nwqq',
  },
});

// const globalSecret = speakeasy.generateSecret();
app.post('/send-email', (req, res) => {
  const { email,Message } = req.body;

  // const token = speakeasy.totp({
  //   secret: globalSecret.base32,
  //   encoding: 'base32',
  // });
  console.log(email)

  const mailOptions = {
    from: "vineetalp002@gmail.com",
    to: email,
    subject: 'You got a message!!',
    html: `${Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending OTP: ${error}`);
      res.status(500).send('Error sending OTP');
    } else {
      console.log(`OTP sent: ${info.response}`);
      res.status(200).send('OTP sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



