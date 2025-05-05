const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find().sort({ date: 1 });
    let balance = 0;
    const chartData = trades.map(trade => {
      balance += trade.result;
      return {
        date: new Date(trade.date).toISOString().split('T')[0],
        balance: parseFloat(balance.toFixed(2))
      };
    });
    res.json(chartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
