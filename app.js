const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();  // To load environment variables from .env file

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS (Cross-Origin Resource Sharing) for localhost connections
app.use(cors());

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { full_name, email, mobile_number, subject, message } = req.body;

    // Create a transporter object using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,  // Your Gmail address (from environment variables)
            pass: process.env.GMAIL_PASS,  // Your Gmail App Password (from environment variables)
        },
    });

    // Email options
    const mailOptions = {
        from: email,  // Sender's email address (user's email)
        to: process.env.GMAIL_USER,  // Recipient's email address
        subject: `New Contact Message: ${subject}`,
        text: `
            Full Name: ${full_name}
            Email: ${email}
            Mobile Number: ${mobile_number}
            Message: ${message}
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
