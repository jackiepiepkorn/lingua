const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle POST request
app.post('/api/random-number', (req, res) => {
    const name = req.body.name;
    const number = Math.floor(Math.random() * 100) + 1;
    res.json({ name: name, number: number });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
