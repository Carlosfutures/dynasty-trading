const express = require('express');
const path = require('path');
const app = express();

// API routes here...
app.use('/api/trades', require('./routes/trades'));

// Serve static files from React
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
