const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    const calendarData = {};
    trades.forEach((trade) => {
      const day = new Date(trade.date).toISOString().split('T')[0];
      if (!calendarData[day]) calendarData[day] = { pnl: 0, trades: [] };
      calendarData[day].pnl += trade.result;
      calendarData[day].trades.push(trade);
    });
    res.json(calendarData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
