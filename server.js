// server.js
// Will handle requests and responses between the frontend and the Chat GPT API

// Import required packages
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// load environmental variables from .env file
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Set up Express App
const app = express();

// Set up Middleware to handle JSON parsing
app.use(express.json());

// Middleware to handle CORS (optional, if you need to allow cross-origin requests)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // Endpoint to generate response using Chat GPT API
  app.post('/api/chat', authenticateToken, async (req, res) => {
    const { message } = req.body;

    // Send request to Chat GPT API
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: message,
        max_tokens: 50,
        n: 1,
        stop: '\n'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use environmental variable for API key
        }
    });
    // Return response from Chat GPT API
    res.json(response.data.choices[0].text);
  });

  // Middleware to authenticate JWT token
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => { // Use environment variable for secret key
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  // Start server
const PORT = process.env.PORT || 5000; // Use environment variable for port or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));