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

  if (req.method === 'GET') {
    res.status(200).json(tokens);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 