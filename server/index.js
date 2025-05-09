const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

app.use(cors()); // ✅ Allows requests from frontend
app.use(express.json());

// Routes
app.use('/api/trades', require('./routes/trades'));

// Serve React build if deployed
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
