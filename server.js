const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // You'll need to install this: npm install cors
const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add this route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/save', (req, res) => {
    const { notes } = req.body;
    fs.appendFile('notes.txt', notes + '\n', (err) => {
        if (err) {
            console.error('Error saving notes:', err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});