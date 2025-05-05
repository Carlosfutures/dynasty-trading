const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade'); // adjust path as needed

// PUT /api/trades/:id – Update a trade
router.put('/:id', async (req, res) => {
  try {
    const updated = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Trade not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update trade' });
  }
});

// DELETE /api/trades/:id – Delete a trade
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Trade.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Trade not found' });
    res.json({ message: 'Trade deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trade' });
  }
});

module.exports = router;
