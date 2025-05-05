const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.get('/drawdown', async (req, res) => {
  try {
    const trades = await Trade.find().sort({ date: 1 });
    let balance = 0, peak = 0;
    const data = trades.map(trade => {
      balance += trade.result;
      if (balance > peak) peak = balance;
      const drawdown = peak - balance;
      return {
        date: new Date(trade.date).toISOString().split('T')[0],
        drawdown: parseFloat(drawdown.toFixed(2))
      };
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/strategy', async (req, res) => {
  try {
    const trades = await Trade.find();
    const strategyMap = {};
    trades.forEach(trade => {
      const strat = trade.strategy || 'Unknown';
      strategyMap[strat] = (strategyMap[strat] || 0) + 1;
    });
    res.json(strategyMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
