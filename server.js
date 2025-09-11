const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public')); // Serve static files from 'public' folder

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/list', express.static(path.join(__dirname, 'public')));

// Endpoint to list folders as JSON
app.get('/list/:folder', (req, res) => {
    const folderPath = path.join(__dirname, 'public', req.params.folder);
    console.log(`Listing folders in: ${folderPath}`);

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading folder: ${folderPath}`, err);
            return res.status(500).json({ error: 'Cannot read folder' });
        }

        const dirs = files.filter(f => f.isDirectory()).map(f => f.name);
        console.log(`Found directories: ${dirs}`);
        res.json(dirs);
    });
});

app.listen(8080, '0.0.0.0', () => console.log('Server running on http://localhost:8080'));