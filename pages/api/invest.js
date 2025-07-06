// Mock data for token investments
const tokens = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 45000.00,
    change_24h: 2.5,
    market_cap: 850000000000
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3200.00,
    change_24h: -1.2,
    market_cap: 380000000000
  },
  {
    id: 3,
    name: "Cardano",
    symbol: "ADA",
    price: 1.20,
    change_24h: 5.8,
    market_cap: 38000000000
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { token_id, amount } = req.body;
    
    if (!token_id || !amount) {
      return res.status(400).json({ 
        error: "Missing required fields: token_id and amount" 
      });
    }
    
    const token = tokens.find(t => t.id === token_id);
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }
    
    if (amount <= 0) {
      return res.status(400).json({ 
        error: "Investment amount must be positive" 
      });
    }
    
    // Calculate tokens purchased
    const tokens_purchased = amount / token.price;
    
    return res.status(200).json({
      success: true,
      investment: {
        token_id: token_id,
        token_name: token.name,
        token_symbol: token.symbol,
        amount_invested: amount,
        tokens_purchased: parseFloat(tokens_purchased.toFixed(8)),
        price_per_token: token.price
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 