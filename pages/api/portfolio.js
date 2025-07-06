export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Mock portfolio data
    const portfolio = [
      {
        token_id: 1,
        token_name: "Bitcoin",
        token_symbol: "BTC",
        tokens_owned: 0.5,
        current_value: 22500.00,
        total_invested: 20000.00,
        profit_loss: 2500.00,
        profit_loss_percentage: 12.5
      },
      {
        token_id: 2,
        token_name: "Ethereum",
        token_symbol: "ETH",
        tokens_owned: 3.125,
        current_value: 10000.00,
        total_invested: 9500.00,
        profit_loss: 500.00,
        profit_loss_percentage: 5.26
      }
    ];
    
    const total_value = portfolio.reduce((sum, item) => sum + item.current_value, 0);
    const total_invested = portfolio.reduce((sum, item) => sum + item.total_invested, 0);
    const total_profit_loss = portfolio.reduce((sum, item) => sum + item.profit_loss, 0);
    
    return res.status(200).json({
      portfolio: portfolio,
      summary: {
        total_value: total_value,
        total_invested: total_invested,
        total_profit_loss: total_profit_loss,
        total_profit_loss_percentage: total_invested > 0 ? 
          parseFloat(((total_profit_loss / total_invested) * 100).toFixed(2)) : 0
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 