const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// API routes
app.use('/api/trades', require('./routes/trades'));

// ✅ Serve React static files from client/build
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ Fallback to React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
