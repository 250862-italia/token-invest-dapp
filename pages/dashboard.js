import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';

// Componente per la gestione pacchetti investimento
function PackageManager({ packages, setPackages }) {
  const [form, setForm] = useState({
    id: null,
    type: '',
    amount: '',
    returns: '',
    duration: '',
    minInvestment: '',
    maxInvestment: '',
    description: '',
    status: 'active',
    features: '',
  });
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState('');

  const handleAdd = () => {
    if (!form.type || !form.amount || !form.returns) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    const newPackage = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
      returns: Number(form.returns),
      minInvestment: Number(form.minInvestment),
      maxInvestment: Number(form.maxInvestment),
      features: form.features.split(',').map(f => f.trim()).filter(f => f),
    };
    setPackages(prev => [...prev, newPackage]);
    setForm({ id: null, type: '', amount: '', returns: '', duration: '', minInvestment: '', maxInvestment: '', description: '', status: 'active', features: '' });
    setEditing(false);
    alert('✅ Pacchetto aggiunto con successo!');
  };

  const handleEdit = (pkg) => {
    setForm({ ...pkg, features: pkg.features.join(', ') });
    setEditing(true);
  };

  const handleUpdate = () => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === form.id 
        ? { ...form, features: form.features.split(',').map(f => f.trim()).filter(f => f) }
        : pkg
    ));
    setForm({ id: null, type: '', amount: '', returns: '', duration: '', minInvestment: '', maxInvestment: '', description: '', status: 'active', features: '' });
    setEditing(false);
    alert('✅ Pacchetto aggiornato con successo!');
  };

  const handleDelete = (id) => {
    if (confirm('Sei sicuro di voler eliminare questo pacchetto?')) {
      setPackages(prev => prev.filter(pkg => pkg.id !== id));
      alert('✅ Pacchetto eliminato con successo!');
    }
  };

  const handleToggle = (id) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id 
        ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active' }
        : pkg
    ));
    alert('✅ Status pacchetto aggiornato!');
  };

  const filtered = packages.filter(pkg => 
    pkg.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.adminSection}>
      <h2>💰 Gestione Pacchetti Investimento</h2>
      
      <div className={styles.adminActions}>
        <input 
          placeholder="🔍 Cerca pacchetto..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button 
          onClick={() => {
            setForm({ id: null, type: '', amount: '', returns: '', duration: '', minInvestment: '', maxInvestment: '', description: '', status: 'active', features: '' });
            setEditing(false);
          }}
          className={styles.addButton}
        >
          ➕ Nuovo Pacchetto
        </button>
      </div>

      <div className={styles.adminForm}>
        <div className={styles.formRow}>
          <input 
            placeholder="Nome pacchetto (es: GLG EQUITY PLEDGE - DIAMOND)" 
            value={form.type} 
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className={styles.formInput}
          />
          <input 
            placeholder="Importo €" 
            type="number" 
            value={form.amount} 
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            className={styles.formInput}
          />
        </div>
        
        <div className={styles.formRow}>
          <input 
            placeholder="Rendimento %" 
            type="number" 
            value={form.returns} 
            onChange={e => setForm(f => ({ ...f, returns: e.target.value }))}
            className={styles.formInput}
          />
          <input 
            placeholder="Durata (es: 24 mesi)" 
            value={form.duration} 
            onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
            className={styles.formInput}
          />
        </div>
        
        <div className={styles.formRow}>
          <input 
            placeholder="Min investimento €" 
            type="number" 
            value={form.minInvestment} 
            onChange={e => setForm(f => ({ ...f, minInvestment: e.target.value }))}
            className={styles.formInput}
          />
          <input 
            placeholder="Max investimento €" 
            type="number" 
            value={form.maxInvestment} 
            onChange={e => setForm(f => ({ ...f, maxInvestment: e.target.value }))}
            className={styles.formInput}
          />
        </div>
        
        <input 
          placeholder="Caratteristiche (separate da virgola)" 
          value={form.features} 
          onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
          className={styles.formInput}
        />
        
        <textarea 
          placeholder="Descrizione del pacchetto..." 
          value={form.description} 
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className={styles.formTextarea}
        />
        
        <div className={styles.formRow}>
          <select 
            value={form.status} 
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className={styles.formSelect}
          >
            <option value="active">✅ Attivo</option>
            <option value="inactive">❌ Inattivo</option>
          </select>
          
          {editing ? (
            <button onClick={handleUpdate} className={styles.saveButton}>
              💾 Salva Modifiche
            </button>
          ) : (
            <button onClick={handleAdd} className={styles.addButton}>
              ➕ Aggiungi Pacchetto
            </button>
          )}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Importo</th>
              <th>Rendimento</th>
              <th>Durata</th>
              <th>Status</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(pkg => (
              <tr key={pkg.id}>
                <td>{pkg.type}</td>
                <td>€{pkg.amount.toLocaleString()}</td>
                <td>{pkg.returns}%</td>
                <td>{pkg.duration}</td>
                <td>
                  <span className={pkg.status === 'active' ? styles.statusActive : styles.statusInactive}>
                    {pkg.status === 'active' ? '✅ Attivo' : '❌ Inattivo'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button onClick={() => handleEdit(pkg)} className={styles.editButton}>
                      ✏️ Modifica
                    </button>
                    <button onClick={() => handleToggle(pkg.id)} className={styles.toggleButton}>
                      {pkg.status === 'active' ? '❌ Disattiva' : '✅ Attiva'}
                    </button>
                    <button onClick={() => handleDelete(pkg.id)} className={styles.deleteButton}>
                      🗑️ Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente per la gestione clienti
function ClientManager({ clients, setClients }) {
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    kycStatus: 'pending',
    joinDate: '',
  });
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    if (!form.name || !form.email) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    const newClient = {
      ...form,
      id: Date.now(),
      joinDate: form.joinDate || new Date().toISOString().split('T')[0],
    };
    setClients(prev => [...prev, newClient]);
    setForm({ id: null, name: '', email: '', phone: '', role: 'user', status: 'active', kycStatus: 'pending', joinDate: '' });
    setEditing(false);
    alert('✅ Cliente aggiunto con successo!');
  };

  const handleEdit = (client) => {
    setForm(client);
    setEditing(true);
  };

  const handleUpdate = () => {
    setClients(prev => prev.map(client => 
      client.id === form.id ? form : client
    ));
    setForm({ id: null, name: '', email: '', phone: '', role: 'user', status: 'active', kycStatus: 'pending', joinDate: '' });
    setEditing(false);
    alert('✅ Cliente aggiornato con successo!');
  };

  const handleDelete = (id) => {
    if (confirm('Sei sicuro di voler eliminare questo cliente?')) {
      setClients(prev => prev.filter(client => client.id !== id));
      alert('✅ Cliente eliminato con successo!');
    }
  };

  const handleRoleChange = (id, newRole) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, role: newRole } : client
    ));
    alert('✅ Ruolo cliente aggiornato!');
  };

  const filtered = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
                         client.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || client.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.adminSection}>
      <h2>👥 Gestione Clienti</h2>
      
      <div className={styles.adminActions}>
        <input 
          placeholder="🔍 Cerca cliente..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">Tutti</option>
          <option value="active">Attivi</option>
          <option value="inactive">Inattivi</option>
        </select>
        <button 
          onClick={() => {
            setForm({ id: null, name: '', email: '', phone: '', role: 'user', status: 'active', kycStatus: 'pending', joinDate: '' });
            setEditing(false);
          }}
          className={styles.addButton}
        >
          ➕ Nuovo Cliente
        </button>
      </div>

      <div className={styles.adminForm}>
        <div className={styles.formRow}>
          <input 
            placeholder="Nome completo" 
            value={form.name} 
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={styles.formInput}
          />
          <input 
            placeholder="Email" 
            type="email" 
            value={form.email} 
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={styles.formInput}
          />
        </div>
        
        <div className={styles.formRow}>
          <input 
            placeholder="Telefono" 
            value={form.phone} 
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={styles.formInput}
          />
          <input 
            placeholder="Data registrazione" 
            type="date" 
            value={form.joinDate} 
            onChange={e => setForm(f => ({ ...f, joinDate: e.target.value }))}
            className={styles.formInput}
          />
        </div>
        
        <div className={styles.formRow}>
          <select 
            value={form.role} 
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            className={styles.formSelect}
          >
            <option value="user">👤 Utente</option>
            <option value="premium">⭐ Premium</option>
            <option value="vip">👑 VIP</option>
            <option value="admin">🔧 Admin</option>
          </select>
          
          <select 
            value={form.status} 
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className={styles.formSelect}
          >
            <option value="active">✅ Attivo</option>
            <option value="inactive">❌ Inattivo</option>
            <option value="suspended">⚠️ Sospeso</option>
          </select>
        </div>
        
        <div className={styles.formRow}>
          <select 
            value={form.kycStatus} 
            onChange={e => setForm(f => ({ ...f, kycStatus: e.target.value }))}
            className={styles.formSelect}
          >
            <option value="pending">⏳ In attesa</option>
            <option value="approved">✅ Approvato</option>
            <option value="rejected">❌ Rifiutato</option>
          </select>
          
          {editing ? (
            <button onClick={handleUpdate} className={styles.saveButton}>
              💾 Salva Modifiche
            </button>
          ) : (
            <button onClick={handleAdd} className={styles.addButton}>
              ➕ Aggiungi Cliente
            </button>
          )}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Status</th>
              <th>KYC</th>
              <th>Data Registrazione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <select 
                    value={client.role} 
                    onChange={e => handleRoleChange(client.id, e.target.value)}
                    className={styles.roleSelect}
                  >
                    <option value="user">👤 Utente</option>
                    <option value="premium">⭐ Premium</option>
                    <option value="vip">👑 VIP</option>
                    <option value="admin">🔧 Admin</option>
                  </select>
                </td>
                <td>
                  <span className={client.status === 'active' ? styles.statusActive : styles.statusInactive}>
                    {client.status === 'active' ? '✅ Attivo' : client.status === 'inactive' ? '❌ Inattivo' : '⚠️ Sospeso'}
                  </span>
                </td>
                <td>
                  <span className={
                    client.kycStatus === 'approved' ? styles.statusActive :
                    client.kycStatus === 'rejected' ? styles.statusInactive :
                    styles.statusPending
                  }>
                    {client.kycStatus === 'approved' ? '✅ Approvato' : 
                     client.kycStatus === 'rejected' ? '❌ Rifiutato' : '⏳ In attesa'}
                  </span>
                </td>
                <td>{client.joinDate}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button onClick={() => handleEdit(client)} className={styles.editButton}>
                      ✏️ Modifica
                    </button>
                    <button onClick={() => handleDelete(client.id)} className={styles.deleteButton}>
                      🗑️ Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente per la gestione KYC
function KYCManager({ kycRequests, setKycRequests }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const handleApprove = (id) => {
    setKycRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved', reviewedAt: new Date().toISOString() } : req
    ));
    alert('✅ KYC approvato con successo!');
  };

  const handleReject = (id) => {
    setKycRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected', reviewedAt: new Date().toISOString() } : req
    ));
    alert('❌ KYC rifiutato!');
  };

  const handleDelete = (id) => {
    if (confirm('Sei sicuro di voler eliminare questa richiesta KYC?')) {
      setKycRequests(prev => prev.filter(req => req.id !== id));
      alert('✅ Richiesta KYC eliminata!');
    }
  };

  const filtered = kycRequests.filter(req => {
    const matchesSearch = req.userName.toLowerCase().includes(search.toLowerCase()) ||
                         req.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || req.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.adminSection}>
      <h2>🔐 Gestione Richieste KYC</h2>
      
      <div className={styles.adminActions}>
        <input 
          placeholder="🔍 Cerca per nome o email..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">Tutte</option>
          <option value="pending">In attesa</option>
          <option value="approved">Approvate</option>
          <option value="rejected">Rifiutate</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Utente</th>
              <th>Email</th>
              <th>Documenti</th>
              <th>Data Richiesta</th>
              <th>Status</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>
                  <div className={styles.documentsList}>
                    {req.documents.map((doc, index) => (
                      <span key={index} className={styles.documentBadge}>
                        {doc.type === 'identity' ? '🆔' : doc.type === 'residence' ? '🏠' : '📸'} {doc.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{req.submittedAt}</td>
                <td>
                  <span className={
                    req.status === 'approved' ? styles.statusActive :
                    req.status === 'rejected' ? styles.statusInactive :
                    styles.statusPending
                  }>
                    {req.status === 'approved' ? '✅ Approvato' : 
                     req.status === 'rejected' ? '❌ Rifiutato' : '⏳ In attesa'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    {req.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(req.id)} className={styles.approveButton}>
                          ✅ Approva
                        </button>
                        <button onClick={() => handleReject(req.id)} className={styles.rejectButton}>
                          ❌ Rifiuta
                        </button>
                      </>
                    )}
                    <button onClick={() => alert(`📋 Dettagli KYC per ${req.userName}`)} className={styles.viewButton}>
                      👁️ Visualizza
                    </button>
                    <button onClick={() => handleDelete(req.id)} className={styles.deleteButton}>
                      🗑️ Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente per la gestione transazioni
function TransactionManager({ transactions, setTransactions }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const handleDelete = (id) => {
    if (confirm('Sei sicuro di voler eliminare questa transazione?')) {
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      alert('✅ Transazione eliminata!');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Tipo', 'Importo', 'Valuta', 'Metodo', 'Status', 'Data', 'Descrizione'],
      ...transactions.map(tx => [
        tx.id, tx.type, tx.amount, tx.currency, tx.method, tx.status, tx.date, tx.description
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transazioni.csv';
    a.click();
    alert('📤 Transazioni esportate in CSV!');
  };

  const filtered = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
                         tx.method.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || tx.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.adminSection}>
      <h2>💳 Gestione Transazioni</h2>
      
      <div className={styles.adminActions}>
        <input 
          placeholder="🔍 Cerca transazione..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">Tutte</option>
          <option value="completed">Completate</option>
          <option value="pending">In elaborazione</option>
          <option value="failed">Fallite</option>
        </select>
        <button onClick={handleExport} className={styles.exportButton}>
          📤 Esporta CSV
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Importo</th>
              <th>Metodo</th>
              <th>Status</th>
              <th>Data</th>
              <th>Descrizione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id}>
                <td>#{tx.id}</td>
                <td>
                  <span className={tx.type === 'purchase' ? styles.typePurchase : styles.typePayout}>
                    {tx.type === 'purchase' ? '💸 Acquisto' : '💰 Payout'}
                  </span>
                </td>
                <td>
                  <span className={tx.type === 'purchase' ? styles.amountNegative : styles.amountPositive}>
                    {tx.type === 'purchase' ? '-' : '+'}€{tx.amount.toLocaleString()}
                  </span>
                </td>
                <td>
                  {tx.method === 'paypal' && '💳 PayPal'}
                  {tx.method === 'stripe' && '💳 Carta'}
                  {tx.method === 'iban' && '🏦 Bonifico'}
                  {tx.method === 'crypto' && '₿ Crypto'}
                </td>
                <td>
                  <span className={
                    tx.status === 'completed' ? styles.statusActive :
                    tx.status === 'pending' ? styles.statusPending :
                    styles.statusInactive
                  }>
                    {tx.status === 'completed' ? '✅ Completato' : 
                     tx.status === 'pending' ? '⏳ In elaborazione' : '❌ Fallito'}
                  </span>
                </td>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button onClick={() => alert(`📋 Dettagli transazione #${tx.id}`)} className={styles.viewButton}>
                      👁️ Visualizza
                    </button>
                    <button onClick={() => handleDelete(tx.id)} className={styles.deleteButton}>
                      🗑️ Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente per la navigazione
function Navigation() {
  const router = useRouter();

  const handleNavigation = (action) => {
    switch(action) {
      case 'website':
        window.open('https://www.glgcapitalgroupllc.com', '_blank');
        break;
      case 'account':
        alert('⚙️ Impostazioni Account - Funzionalità in sviluppo');
        break;
      case 'profile':
        alert('👤 Profilo Utente - Funzionalità in sviluppo');
        break;
      case 'settings':
        alert('🔧 Impostazioni Sistema - Funzionalità in sviluppo');
        break;
      case 'logout':
        if (confirm('Sei sicuro di voler uscire?')) {
          router.push('/');
        }
        break;
      default:
        alert('🔗 Navigazione - Funzionalità in sviluppo');
    }
  };

  return (
    <div className={styles.navigationSection}>
      <h2>🧭 Navigazione</h2>
      <div className={styles.navButtons}>
        <button onClick={() => handleNavigation('website')} className={styles.navButton}>
          🌐 Sito Web
        </button>
        <button onClick={() => handleNavigation('account')} className={styles.navButton}>
          ⚙️ Impostazioni Account
        </button>
        <button onClick={() => handleNavigation('profile')} className={styles.navButton}>
          👤 Profilo Utente
        </button>
        <button onClick={() => handleNavigation('settings')} className={styles.navButton}>
          🔧 Impostazioni Sistema
        </button>
        <button onClick={() => handleNavigation('logout')} className={styles.navButton}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('packages');
  
  // State per i dati
  const [packages, setPackages] = useState([
    { id: 1, type: 'GLG EQUITY PLEDGE - BRONZE', amount: 10000, returns: 10, duration: '12 mesi', minInvestment: 1000, maxInvestment: 10000, description: 'Pacchetto ideale per iniziare', status: 'active', features: ['Rendimento garantito 10% annuo', 'Payout mensile', 'Liquidità immediata'] },
    { id: 2, type: 'GLG EQUITY PLEDGE - SILVER', amount: 25000, returns: 11, duration: '18 mesi', minInvestment: 5000, maxInvestment: 25000, description: 'Soluzione perfetta per espandere il portfolio', status: 'active', features: ['Rendimento garantito 11% annuo', 'Payout bimestrale', 'Priorità supporto'] },
    { id: 3, type: 'GLG EQUITY PLEDGE - GOLD', amount: 50000, returns: 12, duration: '24 mesi', minInvestment: 10000, maxInvestment: 50000, description: 'Pacchetto premium per investitori esperti', status: 'active', features: ['Rendimento garantito 12% annuo', 'Payout trimestrale', 'Consulenza dedicata'] },
  ]);

  const [clients, setClients] = useState([
    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@email.com', phone: '+39 123 456 789', role: 'user', status: 'active', kycStatus: 'approved', joinDate: '2024-01-15' },
    { id: 2, name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', phone: '+39 987 654 321', role: 'premium', status: 'active', kycStatus: 'pending', joinDate: '2024-01-20' },
    { id: 3, name: 'Luca Verdi', email: 'luca.verdi@email.com', phone: '+39 555 123 456', role: 'vip', status: 'active', kycStatus: 'approved', joinDate: '2024-01-10' },
  ]);

  const [kycRequests, setKycRequests] = useState([
    { id: 1, userName: 'Mario Rossi', userEmail: 'mario.rossi@email.com', documents: [{ type: 'identity', name: 'Carta d\'identità' }, { type: 'residence', name: 'Bolletta' }, { type: 'selfie', name: 'Selfie' }], status: 'approved', submittedAt: '2024-01-15', reviewedAt: '2024-01-16' },
    { id: 2, userName: 'Giulia Bianchi', userEmail: 'giulia.bianchi@email.com', documents: [{ type: 'identity', name: 'Passaporto' }, { type: 'residence', name: 'Estratto conto' }], status: 'pending', submittedAt: '2024-01-20' },
    { id: 3, userName: 'Luca Verdi', userEmail: 'luca.verdi@email.com', documents: [{ type: 'identity', name: 'Patente' }, { type: 'residence', name: 'Bolletta' }, { type: 'selfie', name: 'Selfie' }], status: 'rejected', submittedAt: '2024-01-10', reviewedAt: '2024-01-12' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'purchase', amount: 50000, currency: 'EUR', method: 'stripe', status: 'completed', date: '2024-01-15', description: 'GLG EQUITY PLEDGE - GOLD' },
    { id: 2, type: 'payout', amount: 500, currency: 'EUR', method: 'paypal', status: 'pending', date: '2024-01-30', description: 'Dividendo Mensile' },
    { id: 3, type: 'purchase', amount: 10000, currency: 'EUR', method: 'crypto', status: 'completed', date: '2024-02-01', description: 'GLG EQUITY PLEDGE - BRONZE' },
  ]);

  const tabs = [
    { id: 'packages', label: '💰 Pacchetti', icon: '💰' },
    { id: 'clients', label: '👥 Clienti', icon: '👥' },
    { id: 'kyc', label: '🔐 KYC', icon: '🔐' },
    { id: 'transactions', label: '💳 Transazioni', icon: '💳' },
    { id: 'navigation', label: '🧭 Navigazione', icon: '🧭' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <Head>
        <title>GLG Capital Group - Admin Dashboard</title>
        <meta name="description" content="Dashboard amministrativa GLG Capital Group" />
      </Head>

      <div className={styles.header}>
        <h1>🔧 GLG Capital Group - Admin Dashboard</h1>
        <p>Gestione completa del sistema e degli utenti</p>
      </div>

      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'packages' && (
          <PackageManager packages={packages} setPackages={setPackages} />
        )}
        
        {activeTab === 'clients' && (
          <ClientManager clients={clients} setClients={setClients} />
        )}
        
        {activeTab === 'kyc' && (
          <KYCManager kycRequests={kycRequests} setKycRequests={setKycRequests} />
        )}
        
        {activeTab === 'transactions' && (
          <TransactionManager transactions={transactions} setTransactions={setTransactions} />
        )}
        
        {activeTab === 'navigation' && (
          <Navigation />
        )}
      </div>
    </div>
  );
} 