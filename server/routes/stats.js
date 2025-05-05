const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    const totalTrades = trades.length;

    if (totalTrades === 0) {
      return res.json({
        totalPnl: 0, winRate: 0, avgWin: 0, avgLoss: 0, maxDrawdown: 0, numTrades: 0
      });
    }

    let totalPnl = 0, wins = 0, totalWin = 0, totalLoss = 0, losses = 0, balance = 0, maxDrawdown = 0, peak = 0;

    trades.forEach(trade => {
      const pnl = trade.result;
      totalPnl += pnl;
      balance += pnl;
      if (balance > peak) peak = balance;
      const drawdown = peak - balance;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
      if (pnl >= 0) { wins++; totalWin += pnl; } else { losses++; totalLoss += pnl; }
    });

    const avgWin = wins ? totalWin / wins : 0;
    const avgLoss = losses ? totalLoss / losses : 0;
    const winRate = (wins / totalTrades) * 100;

    res.json({
      totalPnl,
      winRate: parseFloat(winRate.toFixed(2)),
      avgWin: parseFloat(avgWin.toFixed(2)),
      avgLoss: parseFloat(avgLoss.toFixed(2)),
      maxDrawdown: parseFloat(maxDrawdown.toFixed(2)),
      numTrades: totalTrades
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
