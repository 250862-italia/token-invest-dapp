from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Mock data for token investments
tokens = [
    {
        "id": 1,
        "name": "Bitcoin",
        "symbol": "BTC",
        "price": 45000.00,
        "change_24h": 2.5,
        "market_cap": 850000000000
    },
    {
        "id": 2,
        "name": "Ethereum",
        "symbol": "ETH",
        "price": 3200.00,
        "change_24h": -1.2,
        "market_cap": 380000000000
    },
    {
        "id": 3,
        "name": "Cardano",
        "symbol": "ADA",
        "price": 1.20,
        "change_24h": 5.8,
        "market_cap": 38000000000
    }
]

@app.route('/')
def home():
    return jsonify({
        "message": "Token Investment dApp API",
        "version": "1.0.0",
        "endpoints": {
            "GET /tokens": "Get all available tokens",
            "GET /tokens/<id>": "Get specific token by ID",
            "POST /invest": "Make an investment",
            "GET /portfolio": "Get user portfolio"
        }
    })

@app.route('/tokens', methods=['GET'])
def get_tokens():
    return jsonify(tokens)

@app.route('/tokens/<int:token_id>', methods=['GET'])
def get_token(token_id):
    token = next((t for t in tokens if t['id'] == token_id), None)
    if token:
        return jsonify(token)
    return jsonify({"error": "Token not found"}), 404

@app.route('/invest', methods=['POST'])
def invest():
    data = request.get_json()
    
    if not data or 'token_id' not in data or 'amount' not in data:
        return jsonify({"error": "Missing required fields: token_id and amount"}), 400
    
    token_id = data['token_id']
    amount = data['amount']
    
    token = next((t for t in tokens if t['id'] == token_id), None)
    if not token:
        return jsonify({"error": "Token not found"}), 404
    
    if amount <= 0:
        return jsonify({"error": "Investment amount must be positive"}), 400
    
    # Calculate tokens purchased
    tokens_purchased = amount / token['price']
    
    return jsonify({
        "success": True,
        "investment": {
            "token_id": token_id,
            "token_name": token['name'],
            "token_symbol": token['symbol'],
            "amount_invested": amount,
            "tokens_purchased": round(tokens_purchased, 8),
            "price_per_token": token['price']
        }
    })

@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    # Mock portfolio data
    portfolio = [
        {
            "token_id": 1,
            "token_name": "Bitcoin",
            "token_symbol": "BTC",
            "tokens_owned": 0.5,
            "current_value": 22500.00,
            "total_invested": 20000.00,
            "profit_loss": 2500.00,
            "profit_loss_percentage": 12.5
        },
        {
            "token_id": 2,
            "token_name": "Ethereum",
            "token_symbol": "ETH",
            "tokens_owned": 3.125,
            "current_value": 10000.00,
            "total_invested": 9500.00,
            "profit_loss": 500.00,
            "profit_loss_percentage": 5.26
        }
    ]
    
    total_value = sum(item['current_value'] for item in portfolio)
    total_invested = sum(item['total_invested'] for item in portfolio)
    total_profit_loss = sum(item['profit_loss'] for item in portfolio)
    
    return jsonify({
        "portfolio": portfolio,
        "summary": {
            "total_value": total_value,
            "total_invested": total_invested,
            "total_profit_loss": total_profit_loss,
            "total_profit_loss_percentage": round((total_profit_loss / total_invested) * 100, 2) if total_invested > 0 else 0
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 