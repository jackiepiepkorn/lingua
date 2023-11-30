const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = 'your_openai_api_key_here';

app.post('/generate-quiz', async (req, res) => {
    const fileText = req.body.fileText; // Assume file text is sent in the request body

    try {
        const response = await axios.post(OPENAI_API_URL, {
            prompt: fileText, // Your prompt based on the file content
            max_tokens: 150 // Adjust as needed
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const quizQuestions = response.data.choices[0].text;
        res.send({ quizQuestions });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error generating quiz');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
