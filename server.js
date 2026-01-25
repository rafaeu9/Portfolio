const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const geoip = require('geoip-lite');

// Only log connections for the main homepage
app.get('/', (req, res) => {
    // Get IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Lookup location
    const geo = geoip.lookup(ip);

    console.log(`[${new Date().toISOString()}] Connection to /`);
    console.log(`IP: ${ip}`);
    console.log(`Location: ${geo ? `${geo.city || 'Unknown'}, ${geo.country}` : 'Unknown'}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);

    // Serve homepage
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'website')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Serve robots.txt explicitly
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'website', 'robots.txt'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'favicon.ico'));
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