import React, { useState } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function App() {
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [lock, setLock] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [message, setMessage] = useState('');

  const handleInvest = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/invest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, amount, lock })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Investimento registrato!');
        setAmount('');
        setLock('');
        fetchPortfolio();
      } else {
        setMessage(data.error || 'Errore');
      }
    } catch (err) {
      setMessage('Errore di rete');
    }
  };

  const fetchPortfolio = async () => {
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/portfolio/${wallet}`);
      const data = await res.json();
      setPortfolio(data.investments || []);
    } catch (err) {
      setMessage('Errore di rete');
    }
  };

  return (
    <div className="App">
      <h1>Token Invest dApp</h1>
      <form onSubmit={handleInvest} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Wallet (es: 0x1234...)"
          value={wallet}
          onChange={e => setWallet(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Importo"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Lock (mesi)"
          value={lock}
          onChange={e => setLock(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <button type="submit">Investi</button>
      </form>
      <button onClick={fetchPortfolio} disabled={!wallet} style={{ marginBottom: 20 }}>
        Visualizza Portfolio
      </button>
      {message && <div style={{ color: 'red', marginBottom: 10 }}>{message}</div>}
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Importo</th>
            <th>Lock (mesi)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.amount}</td>
              <td>{inv.lock}</td>
              <td>{new Date(inv.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
