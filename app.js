// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

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
    res.render('index', {
        title: 'Rose and Co. Beauty Salon Marketing',
        emailjs_user_id: process.env.EMAILJS_USER_ID,
        emailjs_service_id: process.env.EMAILJS_SERVICE_ID,
        emailjs_template_id: process.env.EMAILJS_TEMPLATE_ID
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
