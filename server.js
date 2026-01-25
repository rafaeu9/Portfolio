const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('website')); // Serve static files from 'public' folder

app.use((req, res, next) => {
    next();
});

app.use((req, res, next) => {
    // Get IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Get user agent
    const userAgent = req.headers['user-agent'];

    // Log basic info
    console.log(`[${new Date().toISOString()}] Connection from IP: ${ip}, URL: ${req.originalUrl}, User-Agent: ${userAgent}`);

    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Serve robots.txt explicitly
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'website', 'robots.txt'));
});

app.use('/list', express.static(path.join(__dirname, 'website')));

// Endpoint to list folders as JSON
app.get('/list/:folder', (req, res) => {
    const folderPath = path.join(__dirname, 'website', req.params.folder);

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading folder: ${folderPath}`, err);
            return res.status(500).json({ error: 'Cannot read folder' });
        }

        const dirs = files.filter(f => f.isDirectory()).map(f => f.name);
        res.json(dirs);
    });
});

app.listen(8080, '0.0.0.0', () => console.log('Server running on http://localhost:8080'));