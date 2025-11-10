const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'America0704',
  database: 'github_finder'
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed');
  } else {
    console.log('Database connected');
  }
});

app.get('/api/repos/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

app.post('/api/history', (req, res) => {
  const { username } = req.body;
  const query = 'INSERT INTO search_history (username) VALUES (?)';
  
  db.query(query, [username], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to save history' });
    } else {
      res.json({ message: 'History saved' });
    }
  });
});

app.get('/api/history', (req, res) => {
  const query = 'SELECT * FROM search_history ORDER BY searched_at DESC LIMIT 10';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch history' });
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});