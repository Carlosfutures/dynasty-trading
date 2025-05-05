const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// API routes
app.use('/api/trades', require('./routes/trades'));

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../build')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
