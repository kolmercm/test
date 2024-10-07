const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to save notes
app.post('/save', async (req, res) => {
    const { notes } = req.body;
    try {
        await fs.appendFile('notes.txt', notes + '\n');
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving notes:', err);
        res.json({ success: false });
    }
});

// Route to get saved notes
app.get('/notes', async (req, res) => {
    try {
        const data = await fs.readFile('notes.txt', 'utf8');
        const notes = data.split('\n').filter(note => note.trim() !== '');
        res.json({ success: true, notes });
    } catch (err) {
        console.error('Error reading notes:', err);
        res.json({ success: false, error: 'Failed to read notes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});