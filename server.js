const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Serve static HTML files from the 'public' directory
app.use(express.static('public'));

// POST route to handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;

    if (!name || name.trim() === '') {
        return res.status(400).send('Name is required.');
    }

    // Log the incoming data for debugging
    console.log('Received name:', name);

    // File path where confirmed names are saved
    const filePath = path.join(__dirname, 'confirmations.txt');

    // Append the name to the .txt file
    fs.appendFile(filePath, `${name}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Error occurred while confirming presence. Please try again.');
        }

        console.log(`Name '${name}' has been written to file.`);
        res.send({ message: 'Presença Confirmada!!!', name });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
