// Import libraries
const express = require("express");
require("dotenv").config(); // Import environmental variables
const { Configuration, OpenAIApi } = require("openai"); // OpenAi API
const cors = require("cors"); // Cross Origin Resource Sharing

const app = express(); // server

// serve static files
app.use(express.static('public'));
app.use(cors()); // middleware
app.use(express.json()); // middleware

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

// app.get("/", (req, res) => {
//   res.send("GPT CHAT HOME!");
// });

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("req.body is: ", req.body);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
      
              
            `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    // console.log("Response is: ", response); // log response

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
