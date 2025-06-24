var express = require('express');
var router = express.Router();

// Mock database in memory
const investments = [];

// POST /api/invest
router.post('/api/invest', function(req, res) {
  const { wallet, amount, lock } = req.body;
  if (!wallet || !amount || !lock) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const investment = {
    wallet,
    amount,
    lock,
    date: new Date().toISOString(),
    id: investments.length + 1
  };
  investments.push(investment);
  res.json({ success: true, investment });
});

// GET /api/portfolio/:wallet
router.get('/api/portfolio/:wallet', function(req, res) {
  const { wallet } = req.params;
  const userInvestments = investments.filter(inv => inv.wallet === wallet);
  res.json({ investments: userInvestments });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
