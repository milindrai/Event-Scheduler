const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

// Define the scope of access for the Google Calendar API.
const scopes = ['https://www.googleapis.com/auth/calendar'];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2
(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
); 

app.get('/auth', (req, res) => {

    const url = oauth2Client.generateAuthUrl
    ({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
    }
);

app.get("/auth/redirect", async (req, res) => {

    const {tokens} = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
    }

);