// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Rose and Co. Beauty Salon Marketing' });
});

app.post('/contact', (req, res) => {
    const { firstName, lastName, email, phone, companyName, position } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS  // Use environment variables
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
        from: `"Rose and Co." <${process.env.EMAIL_USER}>`, // Sender address
        to: 'destination-email@gmail.com', // List of receivers
        subject: 'New Contact Request', // Subject line
        text: `You have a new contact request:
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Company: ${companyName}
        Position: ${position}`, // Plain text body
        html: `<p>You have a new contact request:</p>
               <ul>
                   <li>Name: ${firstName} ${lastName}</li>
                   <li>Email: ${email}</li>
                   <li>Phone: ${phone}</li>
                   <li>Company: ${companyName}</li>
                   <li>Position: ${position}</li>
               </ul>` // HTML body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Redirect or respond with a success message
        res.redirect('/'); // Redirect to home or show a success message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});