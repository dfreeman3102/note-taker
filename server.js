const express = require("express");
const path = require('path');
const { env } = require("process");

const app = express();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.listen(PORT, () => 
console.log(`Server running at http://localhost:${PORT}`)
);
