import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'Utente GLG',
    firstName: 'Utente',
    lastName: 'GLG',
    email: 'corefound@glgcapitalgroupllc.com',
    phone: '+1 (555) 123-4567',
    role: 'Partecipante',
    status: 'Verificato'
  });

  const [kycDocuments, setKycDocuments] = useState({
    identity: null,
    residence: null,
    selfie: null
  });

  const [kycStatus, setKycStatus] = useState('completed');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const [equityPledges, setEquityPledges] = useState([
    {
      id: 1,
      type: 'GLG EQUITY PLEDGE',
      amount: 50000,
      date: '2024-01-15',
      status: 'Attivo',
      returns: 12,
      nextPayout: '2024-01-30'
    }
  ]);

  const [availablePledges, setAvailablePledges] = useState([
    {
      id: 1,
      type: 'GLG EQUITY PLEDGE - BRONZE',
      amount: 10000,
      returns: 10,
      duration: '12 mesi',
      minInvestment: 1000,
      maxInvestment: 10000,
      description: 'Pacchetto ideale per iniziare il tuo percorso di crescita patrimoniale',
      features: ['Rendimento garantito 10% annuo', 'Payout mensile', 'Liquidità immediata']
    },
    {
      id: 2,
      type: 'GLG EQUITY PLEDGE - SILVER',
      amount: 25000,
      returns: 11,
      duration: '18 mesi',
      minInvestment: 5000,
      maxInvestment: 25000,
      description: 'Soluzione perfetta per chi vuole espandere il proprio portfolio',
      features: ['Rendimento garantito 11% annuo', 'Payout bimestrale', 'Priorità supporto']
    },
    {
      id: 3,
      type: 'GLG EQUITY PLEDGE - GOLD',
      amount: 50000,
      returns: 12,
      duration: '24 mesi',
      minInvestment: 10000,
      maxInvestment: 50000,
      description: 'Pacchetto premium per investitori esperti',
      features: ['Rendimento garantito 12% annuo', 'Payout trimestrale', 'Consulenza dedicata']
    },
    {
      id: 4,
      type: 'GLG EQUITY PLEDGE - PLATINUM',
      amount: 100000,
      returns: 13,
      duration: '36 mesi',
      minInvestment: 25000,
      maxInvestment: 100000,
      description: 'Eccellenza per chi cerca massimi rendimenti',
      features: ['Rendimento garantito 13% annuo', 'Payout semestrale', 'Gestione personalizzata']
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'paypal',
      name: 'PayPal',
      email: 'corefound@glgcapitalgroupllc.com',
      status: 'active',
      icon: '💳'
    },
    {
      id: 2,
      type: 'stripe',
      name: 'Carta di Credito',
      last4: '4242',
      brand: 'Visa',
      status: 'active',
      icon: '💳'
    },
    {
      id: 3,
      type: 'iban',
      name: 'Bonifico Bancario',
      iban: 'IT60 X054 2811 1010 0000 0123 456',
      bank: 'Banca GLG',
      status: 'active',
      icon: '🏦'
    },
    {
      id: 4,
      type: 'crypto',
      name: 'Crypto Wallet',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      network: 'Ethereum',
      status: 'active',
      icon: '₿'
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'purchase',
      amount: 50000,
      currency: 'EUR',
      method: 'stripe',
      status: 'completed',
      date: '2024-01-15',
      description: 'GLG EQUITY PLEDGE - GOLD'
    },
    {
      id: 2,
      type: 'payout',
      amount: 500,
      currency: 'EUR',
      method: 'paypal',
      status: 'pending',
      date: '2024-01-30',
      description: 'Dividendo Mensile'
    },
    {
      id: 3,
      type: 'purchase',
      amount: 10000,
      currency: 'EUR',
      method: 'crypto',
      status: 'completed',
      date: '2024-02-01',
      description: 'GLG EQUITY PLEDGE - BRONZE'
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { id: 'overview', label: 'Panoramica', icon: '📊' },
    { id: 'investments', label: 'GLG EQUITY PLEDGE', icon: '💰' },
    { id: 'payments', label: 'Pagamenti', icon: '💳' },
    { id: 'reports', label: 'Reports & Management', icon: '📋' },
    { id: 'support', label: 'Supporto', icon: '🆘' }
  ];

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });

  // Check if user is admin on component mount
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      const adminEmail = localStorage.getItem('adminEmail');
      
      if (adminToken && adminEmail === 'corefound@glgcapitalgroupllc.com') {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkAdminAuth();
  }, []);

  // Admin login function
  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    console.log('Tentativo di login con:', {
      email: adminCredentials.email,
      password: adminCredentials.password
    });
    
    // Simple admin authentication
    if (adminCredentials.email === 'corefound@glgcapitalgroupllc.com' && 
        adminCredentials.password === 'admin123') {
      console.log('✅ Login amministratore riuscito');
      localStorage.setItem('adminToken', 'admin-token-' + Date.now());
      localStorage.setItem('adminEmail', adminCredentials.email);
      setIsAuthenticated(true);
    } else {
      console.log('❌ Login amministratore fallito');
      alert(`Credenziali amministratore non valide!\n\nEmail inserita: ${adminCredentials.email}\n\nCredenziali corrette:\nEmail: corefound@glgcapitalgroupllc.com\nPassword: admin123`);
    }
  };

  // Admin logout function
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setAdminCredentials({ email: '', password: '' });
  };

  // Load KYC documents on component mount - only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadKycDocuments();
    }
  }, [isAuthenticated]);

  const loadKycDocuments = async () => {
    try {
      const response = await fetch(`/api/kyc/documents?userEmail=${user.email}`);
      const data = await response.json();
      
      if (data.success) {
        setKycDocuments(data.documents);
        // Update user data from database
        setUser(prev => ({
          ...prev,
          ...data.user
        }));
      }
    } catch (error) {
      console.error('Error loading KYC documents:', error);
    }
  };

  const handleFileUpload = async (file, documentType) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(prev => ({ ...prev, [documentType]: 0 }));

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', documentType);
      formData.append('userEmail', user.email);

      const response = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        // Reload documents to show the new upload
        await loadKycDocuments();
        alert(`✅ ${documentType} document uploaded successfully!`);
      } else {
        alert(`❌ Error uploading ${documentType} document: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Error uploading ${documentType} document`);
    } finally {
      setUploading(false);
      setUploadProgress(prev => ({ ...prev, [documentType]: 0 }));
    }
  };

  const handleKycSubmit = async () => {
    try {
      const response = await fetch('/api/kyc/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.email
        })
      });

      const data = await response.json();

      if (data.success) {
        setKycStatus('pending');
        alert('🔐 KYC submission sent successfully! Verification will take 24-48 hours.');
      } else {
        alert(`❌ Error submitting KYC: ${data.error}`);
      }
    } catch (error) {
      console.error('KYC submit error:', error);
      alert('❌ Error submitting KYC');
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleProfileAction = (action) => {
    switch(action) {
      case 'password':
        alert('🔐 Funzionalità cambio password in sviluppo');
        break;
      case 'email':
        alert('📧 Funzionalità modifica email in sviluppo');
        break;
      case 'phone':
        alert('📱 Funzionalità aggiornamento telefono in sviluppo');
        break;
      case 'notifications':
        alert('🔔 Impostazioni notifiche in sviluppo');
        break;
      case 'language':
        alert('🌐 Impostazioni lingua in sviluppo');
        break;
      case 'security':
        alert('🔒 Impostazioni sicurezza in sviluppo');
        break;
      default:
        alert('⚙️ Funzionalità in sviluppo');
    }
  };

  const handleEquityPledgeAction = (action, pledgeId) => {
    switch(action) {
      case 'details':
        alert(`📋 Dettagli Equity Pledge ${pledgeId}`);
        break;
      case 'withdraw':
        alert(`💸 Prelievo Equity Pledge ${pledgeId}`);
        break;
      case 'extend':
        alert(`⏰ Estensione Equity Pledge ${pledgeId}`);
        break;
      default:
        alert(`⚙️ Azione ${action} su Equity Pledge ${pledgeId}`);
    }
  };

  const handlePurchasePledge = (pledgeId) => {
    const pledge = availablePledges.find(p => p.id === pledgeId);
    if (pledge) {
      // Verifica se l'utente ha completato il KYC
      if (kycStatus === 'completed') {
        const confirmed = confirm(`💳 Confermi l'acquisto di ${pledge.type}?\n\n💰 Importo: €${pledge.amount.toLocaleString()}\n📈 Rendimento: ${pledge.returns}% annuo\n⏱️ Durata: ${pledge.duration}\n\n✅ KYC verificato - Procedi con l'acquisto?`);
        
        if (confirmed) {
          alert(`🎉 Acquisto confermato!\n\n${pledge.type}\n💰 Importo: €${pledge.amount.toLocaleString()}\n📈 Rendimento: ${pledge.returns}% annuo\n⏱️ Durata: ${pledge.duration}\n\n📧 Riceverai una email di conferma con i dettagli del contratto.\n📞 Il nostro team ti contatterà entro 24 ore per completare la procedura.`);
          
          // Qui si potrebbe aggiungere la logica per salvare l'acquisto nel database
          console.log(`Acquisto registrato: ${pledge.type} per ${user.email}`);
        }
      } else {
        alert(`🔐 Verifica KYC Richiesta\n\nPer procedere con l'acquisto di ${pledge.type}, devi prima completare la verifica della tua identità.\n\n📋 Vai alla sezione "Profilo" e completa il processo KYC.\n⏱️ La verifica richiede 24-48 ore lavorative.`);
      }
    }
  };

  const handlePaymentAction = (action, methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (method) {
      switch(action) {
        case 'edit':
          alert(`✏️ Modifica ${method.name}\n\nFunzionalità in sviluppo per la modifica del metodo di pagamento.`);
          break;
        case 'remove':
          const confirmed = confirm(`🗑️ Rimuovi ${method.name}?\n\nSei sicuro di voler rimuovere questo metodo di pagamento?`);
          if (confirmed) {
            alert(`✅ ${method.name} rimosso con successo!`);
          }
          break;
        case 'default':
          alert(`⭐ Imposta ${method.name} come metodo predefinito\n\nFunzionalità in sviluppo.`);
          break;
        default:
          alert(`⚙️ Azione ${action} su ${method.name}`);
      }
    }
  };

  const handleAddPaymentMethod = (type) => {
    switch(type) {
      case 'paypal':
        alert('💳 Aggiungi PayPal\n\nInserisci il tuo indirizzo email PayPal per collegare il tuo account.');
        break;
      case 'stripe':
        alert('💳 Aggiungi Carta di Credito\n\nInserisci i dati della tua carta di credito per i pagamenti sicuri.');
        break;
      case 'iban':
        alert('🏦 Aggiungi Bonifico Bancario\n\nInserisci i dati del tuo conto bancario per i bonifici.');
        break;
      case 'crypto':
        alert('₿ Aggiungi Crypto Wallet\n\nInserisci l\'indirizzo del tuo wallet crypto per i pagamenti in criptovalute.');
        break;
      default:
        alert('➕ Aggiungi metodo di pagamento');
    }
  };

  const handleSupportAction = (action) => {
    switch(action) {
      case 'ticket':
        alert('🎫 Sistema di ticket supporto in sviluppo...');
        break;
      case 'chat':
        alert('💬 Chat live supporto in sviluppo...');
        break;
      case 'contact':
        alert('📞 Contatto diretto: corefound@glgcapitalgroupllc.com');
        break;
      default:
        alert('Azione supporto non riconosciuta');
    }
  };

  // Report action handler
  const handleReportAction = (action) => {
    switch(action) {
      case 'users':
        alert('📊 Report utenti generato e scaricato');
        break;
      case 'kyc':
        alert('🔐 Gestione KYC - Apertura pannello di controllo');
        break;
      case 'financial':
        alert('📈 Report finanziario dettagliato generato');
        break;
      case 'payouts':
        alert('💸 Gestione payout - Apertura pannello di controllo');
        break;
      case 'system':
        alert('🔧 Monitoraggio sistema - Apertura dashboard tecnico');
        break;
      case 'backup':
        alert('💾 Backup sistema completato con successo');
        break;
      case 'security':
        alert('🛡️ Report sicurezza generato');
        break;
      case 'logs':
        alert('📋 Log accessi visualizzati');
        break;
      default:
        alert('Azione report non riconosciuta');
    }
  };

  // Management action handler
  const handleManagementAction = (action) => {
    switch(action) {
      case 'approve_kyc':
        alert('✅ Approvazione KYC - Apertura pannello di controllo');
        break;
      case 'block_user':
        alert('🚫 Blocco utente - Apertura pannello di controllo');
        break;
      case 'reset_password':
        alert('🔑 Reset password - Apertura pannello di controllo');
        break;
      case 'export_users':
        alert('📤 Esportazione utenti completata');
        break;
      case 'process_payouts':
        alert('💸 Processamento payout - Apertura pannello di controllo');
        break;
      case 'adjust_rates':
        alert('📊 Modifica rendimenti - Apertura pannello di controllo');
        break;
      case 'freeze_investments':
        alert('❄️ Blocco investimenti - Apertura pannello di controllo');
        break;
      case 'financial_report':
        alert('📈 Report finanziario completo generato');
        break;
      case 'system_backup':
        alert('💾 Backup sistema completato');
        break;
      case 'clear_cache':
        alert('🧹 Cache pulita con successo');
        break;
      case 'update_news':
        alert('📰 Aggiornamento news - Apertura pannello di controllo');
        break;
      case 'system_restart':
        alert('🔄 Riavvio sistema - Conferma richiesta');
        break;
      case 'security_scan':
        alert('🔍 Scan sicurezza completato');
        break;
      case 'block_ip':
        alert('🚫 Blocco IP - Apertura pannello di controllo');
        break;
      case 'audit_logs':
        alert('📋 Audit logs visualizzati');
        break;
      case 'update_security':
        alert('🔒 Aggiornamento sicurezza completato');
        break;
      case 'install_package':
        alert('📥 Installa Nuovo Pacchetto - Apertura pannello di controllo');
        break;
      case 'remove_package':
        alert('🗑️ Rimuovi Pacchetto - Apertura pannello di controllo');
        break;
      case 'update_packages':
        alert('🔄 Aggiorna Pacchetti - Apertura pannello di controllo');
        break;
      case 'package_audit':
        alert('🔍 Audit Pacchetti - Apertura pannello di controllo');
        break;
      default:
        alert('Azione management non riconosciuta');
    }
  };

  // Package action handler
  const handlePackageAction = (action, packageName = '') => {
    switch(action) {
      case 'install':
        const packageNameInput = document.getElementById('package-name')?.value;
        const packageType = document.getElementById('package-type')?.value;
        if (packageNameInput) {
          alert(`📥 Installazione pacchetto: ${packageNameInput} (${packageType})`);
        } else {
          alert('⚠️ Inserisci il nome del pacchetto');
        }
        break;
      case 'search':
        const searchName = document.getElementById('package-name')?.value;
        if (searchName) {
          alert(`🔍 Ricerca pacchetto: ${searchName}`);
        } else {
          alert('⚠️ Inserisci il nome del pacchetto da cercare');
        }
        break;
      case 'remove':
        if (packageName) {
          alert(`🗑️ Rimozione pacchetto: ${packageName}`);
        } else {
          alert('⚠️ Nome pacchetto non specificato');
        }
        break;
      case 'update_all':
        alert('🔄 Aggiornamento di tutti i pacchetti in corso...');
        break;
      case 'audit':
        alert('🔍 Audit sicurezza pacchetti in corso...');
        break;
      case 'outdated':
        alert('📊 Controllo pacchetti obsoleti...');
        break;
      case 'clean':
        alert('🧹 Pulizia cache NPM completata');
        break;
      case 'reinstall':
        alert('🔄 Reinstallazione di tutti i pacchetti...');
        break;
      case 'export':
        alert('📤 Esportazione package.json completata');
        break;
      default:
        alert('Azione pacchetto non riconosciuta');
    }
  };

  // Admin Action Functions
  const handleAdminAction = (action, itemId, itemType) => {
    switch(action) {
      case 'approve_kyc':
        alert('✅ KYC approvato con successo!');
        break;
      case 'block_user':
        alert('🚫 Utente bloccato!');
        break;
      case 'process_payouts':
        alert('💸 Payout processati!');
        break;
      case 'adjust_rates':
        alert('📊 Rendimenti modificati!');
        break;
      case 'freeze_investments':
        alert('❄️ Investimenti bloccati!');
        break;
      case 'system_backup':
        alert('💾 Backup sistema completato!');
        break;
      case 'clear_cache':
        alert('🧹 Cache pulita!');
        break;
      case 'update_news':
        alert('📰 News aggiornate!');
        break;
      case 'system_restart':
        alert('🔄 Sistema riavviato!');
        break;
      case 'security_scan':
        alert('🔍 Scan sicurezza completato!');
        break;
      case 'block_ip':
        alert('🚫 IP bloccato!');
        break;
      case 'audit_logs':
        alert('📋 Audit logs completato!');
        break;
      case 'update_security':
        alert('🔒 Sicurezza aggiornata!');
        break;
      default:
        alert(`Azione ${action} eseguita!`);
    }
  };

  // GLG Equity Pledge Management Functions
  const handlePledgeManagement = (action, pledgeId = null) => {
    switch(action) {
      case 'add_pledge':
        alert('💰 Nuovo pacchetto GLG EQUITY PLEDGE aggiunto!');
        break;
      case 'edit_pledge':
        alert('✏️ Pacchetto GLG EQUITY PLEDGE modificato!');
        break;
      case 'remove_pledge':
        alert('🗑️ Pacchetto GLG EQUITY PLEDGE rimosso!');
        break;
      case 'activate_pledge':
        alert('✅ Pacchetto GLG EQUITY PLEDGE attivato!');
        break;
      case 'deactivate_pledge':
        alert('❌ Pacchetto GLG EQUITY PLEDGE disattivato!');
        break;
      case 'adjust_returns':
        alert('📊 Rendimenti del pacchetto GLG EQUITY PLEDGE modificati!');
        break;
      case 'export_pledges':
        alert('📤 Lista pacchetti GLG EQUITY PLEDGE esportata!');
        break;
      case 'pledge_analytics':
        alert('📈 Analisi pacchetti GLG EQUITY PLEDGE generata!');
        break;
      default:
        alert(`Azione ${action} sui pacchetti GLG EQUITY PLEDGE eseguita!`);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Caricamento...</p>
      </div>
    );
  }

  // Show admin login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.adminLoginContainer}>
        <Head>
          <title>GLG Capital Group - Accesso Amministratore</title>
        </Head>
        
        <div className={styles.adminLoginCard}>
          <div className={styles.adminLoginHeader}>
            <h1>🔐 Accesso Amministratore</h1>
            <p>GLG Capital Group - Dashboard Amministrativa</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className={styles.adminLoginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="adminEmail">Email Amministratore:</label>
              <input
                type="email"
                id="adminEmail"
                value={adminCredentials.email}
                onChange={(e) => setAdminCredentials({...adminCredentials, email: e.target.value})}
                placeholder="corefound@glgcapitalgroupllc.com"
                required
                className={styles.adminInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="adminPassword">Password:</label>
              <input
                type="password"
                id="adminPassword"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                placeholder="Inserisci la password"
                required
                className={styles.adminInput}
              />
            </div>
            
            <button type="submit" className={styles.adminLoginButton}>
              🔐 Accedi come Amministratore
            </button>
          </form>
          
          <div className={styles.adminLoginNote}>
            <p>⚠️ Accesso riservato solo agli amministratori autorizzati</p>
            <p>📧 Email: corefound@glgcapitalgroupllc.com</p>
            <p>🔑 Password: admin123</p>
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }} 
              className={styles.resetButton}
            >
              🔄 Reset Autenticazione
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <Head>
        <title>GLG Capital Group - Dashboard</title>
        <meta name="description" content="Dashboard area riservata GLG Capital Group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <span className={styles.dashboardTitle}>GLG Capital Group - Dashboard Amministrativa</span>
          </div>
          <div className={styles.userSection}>
            <span className={styles.welcomeText}>Amministratore: {user.name}</span>
            <button onClick={handleAdminLogout} className={styles.logoutButton}>
              🔐 Logout Amministratore
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <nav>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>👤 Profilo Utente</h2>
                <p className={styles.cardSubtitle}>Gestisci le tue informazioni personali e impostazioni account</p>

                {/* Personal Information and Settings - TOP */}
                <div className={styles.profileGrid}>
                  <div className={styles.profileCard}>
                    <h3 className={styles.sectionTitle}>Informazioni Personali</h3>
                    <div className={styles.profileInfo}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Nome Completo:</span>
                        <span className={styles.infoValue}>{user.firstName} {user.lastName}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue}>{user.email}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Telefono:</span>
                        <span className={styles.infoValue}>{user.phone}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Ruolo:</span>
                        <span className={styles.infoValue}>{user.role}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Status Account:</span>
                        <span className={styles.infoValue}>
                          <span className={styles.statusBadge}>✅ {user.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.profileCard}>
                    <h3 className={styles.sectionTitle}>Impostazioni Account</h3>
                    <div className={styles.settingsList}>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('password')}>
                        <span className={styles.settingIcon}>🔐</span>
                        <span className={styles.settingText}>Cambia Password</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('email')}>
                        <span className={styles.settingIcon}>📧</span>
                        <span className={styles.settingText}>Modifica Email</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('phone')}>
                        <span className={styles.settingIcon}>📱</span>
                        <span className={styles.settingText}>Aggiorna Telefono</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('notifications')}>
                        <span className={styles.settingIcon}>🔔</span>
                        <span className={styles.settingText}>Notifiche</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('language')}>
                        <span className={styles.settingIcon}>🌐</span>
                        <span className={styles.settingText}>Lingua</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                      <button className={styles.settingButton} onClick={() => handleProfileAction('security')}>
                        <span className={styles.settingIcon}>🔒</span>
                        <span className={styles.settingText}>Sicurezza</span>
                        <span className={styles.settingArrow}>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* KYC Section - BOTTOM */}
                <div className={styles.kycSection}>
                  <h3 className={styles.sectionTitle}>🔐 Verifica Identità (KYC)</h3>
                  
                  {/* KYC Status */}
                  <div className={styles.kycStatus}>
                    <div className={styles.kycStatusCard}>
                      <div className={styles.kycStatusHeader}>
                        <span className={styles.kycStatusIcon}>
                          {kycStatus === 'completed' ? '✅' : kycStatus === 'pending' ? '⏳' : '❌'}
                        </span>
                        <span className={styles.kycStatusText}>
                          {kycStatus === 'completed' ? 'KYC Completato' : 
                           kycStatus === 'pending' ? 'KYC In Verifica' : 'KYC Non Completato'}
                        </span>
                      </div>
                      <p className={styles.kycStatusDescription}>
                        {kycStatus === 'completed' 
                          ? 'La tua identità è stata verificata con successo. Puoi accedere a tutte le funzionalità della piattaforma.'
                          : kycStatus === 'pending'
                          ? 'La tua verifica KYC è in corso. Riceverai una notifica una volta completata.'
                          : 'Completa la verifica della tua identità per accedere a tutte le funzionalità.'
                        }
                      </p>
                      <div className={styles.kycDetails}>
                        <div className={styles.kycDetail}>
                          <span className={styles.kycDetailLabel}>Documenti Caricati:</span>
                          <span className={styles.kycDetailValue}>
                            {Object.values(kycDocuments).filter(doc => doc).length}/3
                          </span>
                        </div>
                        <div className={styles.kycDetail}>
                          <span className={styles.kycDetailLabel}>Status:</span>
                          <span className={styles.kycDetailValue}>
                            {kycStatus === 'completed' ? 'Verificato' : 
                             kycStatus === 'pending' ? 'In Verifica' : 'Non Completato'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Documents */}
                  <div className={styles.kycDocuments}>
                    <h4 className={styles.kycSubtitle}>Documenti Caricati</h4>
                    <div className={styles.documentList}>
                      <div className={styles.documentItem}>
                        <span className={styles.documentIcon}>🆔</span>
                        <div className={styles.documentInfo}>
                          <span className={styles.documentName}>Documento d'Identità</span>
                          <span className={styles.documentStatus}>
                            {kycDocuments.identity ? '✅ Caricato' : '❌ Non caricato'}
                          </span>
                          {kycDocuments.identity && (
                            <span className={styles.documentDetails}>
                              {kycDocuments.identity.original_filename} ({Math.round(kycDocuments.identity.file_size / 1024)}KB)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={styles.documentItem}>
                        <span className={styles.documentIcon}>🏠</span>
                        <div className={styles.documentInfo}>
                          <span className={styles.documentName}>Prova di Residenza</span>
                          <span className={styles.documentStatus}>
                            {kycDocuments.residence ? '✅ Caricato' : '❌ Non caricato'}
                          </span>
                          {kycDocuments.residence && (
                            <span className={styles.documentDetails}>
                              {kycDocuments.residence.original_filename} ({Math.round(kycDocuments.residence.file_size / 1024)}KB)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={styles.documentItem}>
                        <span className={styles.documentIcon}>💳</span>
                        <div className={styles.documentInfo}>
                          <span className={styles.documentName}>Selfie con Documento</span>
                          <span className={styles.documentStatus}>
                            {kycDocuments.selfie ? '✅ Caricato' : '❌ Non caricato'}
                          </span>
                          {kycDocuments.selfie && (
                            <span className={styles.documentDetails}>
                              {kycDocuments.selfie.original_filename} ({Math.round(kycDocuments.selfie.file_size / 1024)}KB)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* KYC Completion Form */}
                  <div className={styles.kycForm}>
                    <h4 className={styles.kycSubtitle}>Completa la Verifica KYC</h4>
                    <p className={styles.kycFormDescription}>
                      Carica i documenti richiesti per completare la verifica della tua identità e accedere a tutte le funzionalità.
                    </p>
                    
                    <div className={styles.kycFormGrid}>
                      <div className={styles.kycFormSection}>
                        <h5 className={styles.kycFormTitle}>🆔 Documento d'Identità</h5>
                        <p className={styles.kycFormText}>
                          Carica una copia del tuo documento d'identità (carta d'identità, passaporto o patente)
                        </p>
                        <div className={styles.uploadArea}>
                          <input 
                            type="file" 
                            id="identity-doc" 
                            className={styles.fileInput}
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e.target.files[0], 'identity')}
                            disabled={uploading}
                          />
                          <label htmlFor="identity-doc" className={styles.uploadButton}>
                            {uploading && uploadProgress.identity ? '⏳ Caricamento...' : '📁 Scegli File'}
                          </label>
                        </div>
                      </div>
                      
                      <div className={styles.kycFormSection}>
                        <h5 className={styles.kycFormTitle}>🏠 Prova di Residenza</h5>
                        <p className={styles.kycFormText}>
                          Carica una bolletta o estratto conto degli ultimi 3 mesi con il tuo indirizzo
                        </p>
                        <div className={styles.uploadArea}>
                          <input 
                            type="file" 
                            id="residence-doc" 
                            className={styles.fileInput}
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e.target.files[0], 'residence')}
                            disabled={uploading}
                          />
                          <label htmlFor="residence-doc" className={styles.uploadButton}>
                            {uploading && uploadProgress.residence ? '⏳ Caricamento...' : '📁 Scegli File'}
                          </label>
                        </div>
                      </div>
                      
                      <div className={styles.kycFormSection}>
                        <h5 className={styles.kycFormTitle}>💳 Selfie con Documento</h5>
                        <p className={styles.kycFormText}>
                          Scatta una foto di te stesso mentre tieni il documento d'identità
                        </p>
                        <div className={styles.uploadArea}>
                          <input 
                            type="file" 
                            id="selfie-doc" 
                            className={styles.fileInput}
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files[0], 'selfie')}
                            disabled={uploading}
                          />
                          <label htmlFor="selfie-doc" className={styles.uploadButton}>
                            {uploading && uploadProgress.selfie ? '⏳ Caricamento...' : '📁 Scegli File'}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.kycFormActions}>
                      <button 
                        className={styles.kycSubmitButton} 
                        onClick={handleKycSubmit}
                        disabled={uploading || Object.values(kycDocuments).filter(doc => doc).length < 3}
                      >
                        🔐 Invia Verifica KYC
                      </button>
                      <p className={styles.kycFormNote}>
                        ⏱️ La verifica richiede 24-48 ore lavorative per essere completata
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>📊 Panoramica Portfolio</h2>
                <p className={styles.cardSubtitle}>Vista generale dei tuoi Equity Pledges e performance</p>

                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                      <h3>Equity Pledge Totale</h3>
                      <p className={styles.statValue}>€50,000</p>
                      <span className={styles.statChange}>+€5,000 questo mese</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statContent}>
                      <h3>Guadagni Totali</h3>
                      <p className={styles.statValue}>€6,000</p>
                      <span className={styles.statChange}>+12% dal inizio</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>🎯</div>
                    <div className={styles.statContent}>
                      <h3>Rendimento Annuo</h3>
                      <p className={styles.statValue}>12%</p>
                      <span className={styles.statChange}>Garantito</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>📅</div>
                    <div className={styles.statContent}>
                      <h3>Prossimo Payout</h3>
                      <p className={styles.statValue}>30 Gennaio</p>
                      <span className={styles.statChange}>€500 previsti</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                  <h3 className={styles.sectionTitle}>⚡ Azioni Rapide</h3>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionButton} onClick={() => handleEquityPledgeAction('details', 1)}>
                      📋 Dettagli Equity Pledge
                    </button>
                    <button className={styles.actionButton} onClick={() => handleSupportAction('ticket')}>
                      🎫 Nuovo Ticket
                    </button>
                    <button className={styles.actionButton} onClick={() => handleSupportAction('contact')}>
                      📞 Contatta Supporto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GLG EQUITY PLEDGE Tab */}
          {activeTab === 'investments' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>💰 GLG EQUITY PLEDGE</h2>
                <p className={styles.cardSubtitle}>Scegli il pacchetto che meglio si adatta alle tue esigenze di crescita patrimoniale</p>

                {/* Pacchetti Disponibili per Acquisto */}
                <div className={styles.availablePledgesGrid}>
                  {availablePledges.map((pledge) => (
                    <div key={pledge.id} className={styles.availablePledgeCard}>
                      <div className={styles.pledgeHeader}>
                        <h3 className={styles.pledgeTitle}>{pledge.type}</h3>
                        <div className={styles.pledgeBadge}>
                          <span className={styles.returnsBadge}>{pledge.returns}% annuo</span>
                        </div>
                      </div>
                      
                      <div className={styles.pledgeInfo}>
                        <div className={styles.pledgeDetail}>
                          <span className={styles.detailLabel}>💰 Importo:</span>
                          <span className={styles.detailValue}>€{pledge.amount.toLocaleString()}</span>
                        </div>
                        <div className={styles.pledgeDetail}>
                          <span className={styles.detailLabel}>⏱️ Durata:</span>
                          <span className={styles.detailValue}>{pledge.duration}</span>
                        </div>
                        <div className={styles.pledgeDetail}>
                          <span className={styles.detailLabel}>📊 Min/Max:</span>
                          <span className={styles.detailValue}>€{pledge.minInvestment.toLocaleString()} - €{pledge.maxInvestment.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className={styles.pledgeDescription}>
                        <p>{pledge.description}</p>
                      </div>

                      <div className={styles.pledgeFeatures}>
                        <h4>✨ Caratteristiche:</h4>
                        <ul>
                          {pledge.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.pledgeActions}>
                        <button 
                          className={styles.purchaseButton}
                          onClick={() => handlePurchasePledge(pledge.id)}
                        >
                          💳 Acquista Ora
                        </button>
                        <button 
                          className={styles.detailsButton}
                          onClick={() => handleEquityPledgeAction('details', pledge.id)}
                        >
                          📋 Dettagli
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>💳 Metodi di Pagamento</h2>
                <p className={styles.cardSubtitle}>Gestisci i tuoi metodi di pagamento e visualizza le transazioni</p>

                {/* Metodi di Pagamento */}
                <div className={styles.sectionDivider}>
                  <h3 className={styles.sectionTitle}>💳 I Tuoi Metodi di Pagamento</h3>
                  <p className={styles.sectionSubtitle}>Metodi configurati per acquisti e prelievi</p>
                </div>

                <div className={styles.paymentMethodsGrid}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className={styles.paymentMethodCard}>
                      <div className={styles.methodHeader}>
                        <div className={styles.methodIcon}>{method.icon}</div>
                        <div className={styles.methodInfo}>
                          <h4 className={styles.methodName}>{method.name}</h4>
                          <div className={styles.methodDetails}>
                            {method.type === 'paypal' && (
                              <span className={styles.methodDetail}>{method.email}</span>
                            )}
                            {method.type === 'stripe' && (
                              <span className={styles.methodDetail}>{method.brand} •••• {method.last4}</span>
                            )}
                            {method.type === 'iban' && (
                              <span className={styles.methodDetail}>{method.bank}</span>
                            )}
                            {method.type === 'crypto' && (
                              <span className={styles.methodDetail}>{method.network}</span>
                            )}
                          </div>
                        </div>
                        <span className={`${styles.statusBadge} ${styles.active}`}>
                          {method.status === 'active' ? '✅ Attivo' : '❌ Inattivo'}
                        </span>
                      </div>
                      
                      <div className={styles.methodActions}>
                        <button 
                          className={styles.methodButton}
                          onClick={() => handlePaymentAction('edit', method.id)}
                        >
                          ✏️ Modifica
                        </button>
                        <button 
                          className={styles.methodButton}
                          onClick={() => handlePaymentAction('default', method.id)}
                        >
                          ⭐ Predefinito
                        </button>
                        <button 
                          className={styles.methodButton}
                          onClick={() => handlePaymentAction('remove', method.id)}
                        >
                          🗑️ Rimuovi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Aggiungi Nuovo Metodo */}
                <div className={styles.sectionDivider}>
                  <h3 className={styles.sectionTitle}>➕ Aggiungi Nuovo Metodo</h3>
                  <p className={styles.sectionSubtitle}>Scegli il metodo di pagamento che preferisci</p>
                </div>

                <div className={styles.addPaymentMethodsGrid}>
                  <button 
                    className={styles.addPaymentMethodCard}
                    onClick={() => handleAddPaymentMethod('paypal')}
                  >
                    <div className={styles.addMethodIcon}>💳</div>
                    <h4 className={styles.addMethodName}>PayPal</h4>
                    <p className={styles.addMethodDescription}>Paga con il tuo account PayPal</p>
                  </button>

                  <button 
                    className={styles.addPaymentMethodCard}
                    onClick={() => handleAddPaymentMethod('stripe')}
                  >
                    <div className={styles.addMethodIcon}>💳</div>
                    <h4 className={styles.addMethodName}>Carta di Credito</h4>
                    <p className={styles.addMethodDescription}>Paga con carta Visa, Mastercard, American Express</p>
                  </button>

                  <button 
                    className={styles.addPaymentMethodCard}
                    onClick={() => handleAddPaymentMethod('iban')}
                  >
                    <div className={styles.addMethodIcon}>🏦</div>
                    <h4 className={styles.addMethodName}>Bonifico Bancario</h4>
                    <p className={styles.addMethodDescription}>Trasferimento diretto dal tuo conto bancario</p>
                  </button>

                  <button 
                    className={styles.addPaymentMethodCard}
                    onClick={() => handleAddPaymentMethod('crypto')}
                  >
                    <div className={styles.addMethodIcon}>₿</div>
                    <h4 className={styles.addMethodName}>Criptovalute</h4>
                    <p className={styles.addMethodDescription}>Paga con Bitcoin, Ethereum e altre crypto</p>
                  </button>
                </div>

                {/* Storico Transazioni */}
                <div className={styles.sectionDivider}>
                  <h3 className={styles.sectionTitle}>📊 Storico Transazioni</h3>
                  <p className={styles.sectionSubtitle}>Tutte le tue transazioni di acquisto e prelievo</p>
                </div>

                <div className={styles.transactionsList}>
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className={styles.transactionCard}>
                      <div className={styles.transactionHeader}>
                        <div className={styles.transactionInfo}>
                          <h4 className={styles.transactionDescription}>{transaction.description}</h4>
                          <span className={styles.transactionDate}>{transaction.date}</span>
                        </div>
                        <div className={styles.transactionAmount}>
                          <span className={styles.amountValue}>
                            {transaction.type === 'purchase' ? '-' : '+'}€{transaction.amount.toLocaleString()}
                          </span>
                          <span className={styles.amountCurrency}>{transaction.currency}</span>
                        </div>
                      </div>
                      
                      <div className={styles.transactionDetails}>
                        <div className={styles.transactionMethod}>
                          <span className={styles.methodLabel}>Metodo:</span>
                          <span className={styles.methodValue}>
                            {transaction.method === 'paypal' && '💳 PayPal'}
                            {transaction.method === 'stripe' && '💳 Carta di Credito'}
                            {transaction.method === 'iban' && '🏦 Bonifico Bancario'}
                            {transaction.method === 'crypto' && '₿ Criptovalute'}
                          </span>
                        </div>
                        <div className={styles.transactionStatus}>
                          <span className={styles.statusLabel}>Status:</span>
                          <span className={`${styles.statusBadge} ${transaction.status === 'completed' ? styles.completed : styles.pending}`}>
                            {transaction.status === 'completed' ? '✅ Completato' : '⏳ In elaborazione'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports & Management Tab */}
          {activeTab === 'reports' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>📋 Reports & Management</h2>
                <p className={styles.cardSubtitle}>Gestione completa del sistema e report dettagliati</p>

                {/* Quick Stats */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statContent}>
                      <h3>Utenti Totali</h3>
                      <p className={styles.statValue}>1,247</p>
                      <span className={styles.statChange}>+23 questo mese</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>🔐</div>
                    <div className={styles.statContent}>
                      <h3>KYC Completati</h3>
                      <p className={styles.statValue}>892</p>
                      <span className={styles.statChange}>71.5% success rate</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                      <h3>Investimenti Totali</h3>
                      <p className={styles.statValue}>€12.4M</p>
                      <span className={styles.statChange}>+€2.1M questo mese</span>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statContent}>
                      <h3>Rendimento Medio</h3>
                      <p className={styles.statValue}>11.2%</p>
                      <span className={styles.statChange}>+0.8% vs mese scorso</span>
                    </div>
                  </div>
                </div>

                {/* Reports Sections */}
                <div className={styles.reportsGrid}>
                  {/* User Management */}
                  <div className={styles.reportCard}>
                    <h3 className={styles.sectionTitle}>👥 Gestione Utenti</h3>
                    <div className={styles.reportContent}>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Utenti Attivi:</span>
                        <span className={styles.reportValue}>1,156</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Nuovi Registrati:</span>
                        <span className={styles.reportValue}>23 (oggi)</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Utenti in Attesa KYC:</span>
                        <span className={styles.reportValue}>355</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Utenti Bloccati:</span>
                        <span className={styles.reportValue}>12</span>
                      </div>
                    </div>
                    <div className={styles.reportActions}>
                      <button className={styles.reportButton} onClick={() => handleReportAction('users')}>
                        📊 Report Utenti
                      </button>
                      <button className={styles.reportButton} onClick={() => handleReportAction('kyc')}>
                        🔐 Gestione KYC
                      </button>
                    </div>
                  </div>

                  {/* Financial Reports */}
                  <div className={styles.reportCard}>
                    <h3 className={styles.sectionTitle}>💰 Report Finanziari</h3>
                    <div className={styles.reportContent}>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Volume Investimenti:</span>
                        <span className={styles.reportValue}>€12.4M</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Commissioni Generate:</span>
                        <span className={styles.reportValue}>€248K</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Payout Totali:</span>
                        <span className={styles.reportValue}>€1.2M</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Rendimento Netto:</span>
                        <span className={styles.reportValue}>€1.1M</span>
                      </div>
                    </div>
                    <div className={styles.reportActions}>
                      <button className={styles.reportButton} onClick={() => handleReportAction('financial')}>
                        📈 Report Finanziario
                      </button>
                      <button className={styles.reportButton} onClick={() => handleReportAction('payouts')}>
                        💸 Gestione Payout
                      </button>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className={styles.reportCard}>
                    <h3 className={styles.sectionTitle}>⚙️ Stato Sistema</h3>
                    <div className={styles.reportContent}>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Database:</span>
                        <span className={styles.reportValue}>✅ Operativo</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>API Status:</span>
                        <span className={styles.reportValue}>✅ Tutte attive</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Storage:</span>
                        <span className={styles.reportValue}>✅ 2.1GB / 10GB</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Uptime:</span>
                        <span className={styles.reportValue}>99.8%</span>
                      </div>
                    </div>
                    <div className={styles.reportActions}>
                      <button className={styles.reportButton} onClick={() => handleReportAction('system')}>
                        🔧 Monitoraggio
                      </button>
                      <button className={styles.reportButton} onClick={() => handleReportAction('backup')}>
                        💾 Backup
                      </button>
                    </div>
                  </div>

                  {/* Security Reports */}
                  <div className={styles.reportCard}>
                    <h3 className={styles.sectionTitle}>🔒 Sicurezza</h3>
                    <div className={styles.reportContent}>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Login Tentativi:</span>
                        <span className={styles.reportValue}>1,234 (oggi)</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Tentativi Falliti:</span>
                        <span className={styles.reportValue}>23</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>IP Bloccati:</span>
                        <span className={styles.reportValue}>5</span>
                      </div>
                      <div className={styles.reportItem}>
                        <span className={styles.reportLabel}>Ultimo Scan:</span>
                        <span className={styles.reportValue}>2 ore fa</span>
                      </div>
                    </div>
                    <div className={styles.reportActions}>
                      <button className={styles.reportButton} onClick={() => handleReportAction('security')}>
                        🛡️ Report Sicurezza
                      </button>
                      <button className={styles.reportButton} onClick={() => handleReportAction('logs')}>
                        📋 Log Accessi
                      </button>
                    </div>
                  </div>
                </div>

                {/* Management Actions */}
                <div className={styles.managementSection}>
                  <h3 className={styles.sectionTitle}>⚙️ Azioni di Gestione</h3>
                  <div className={styles.managementGrid}>
                    <div className={styles.managementCard}>
                      <h4>👥 Gestione Utenti</h4>
                      <div className={styles.managementActions}>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('approve_kyc')}>
                          ✅ Approva KYC
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('block_user')}>
                          🚫 Blocca Utente
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('reset_password')}>
                          🔑 Reset Password
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('export_users')}>
                          📤 Esporta Utenti
                        </button>
                      </div>
                    </div>

                    <div className={styles.managementCard}>
                      <h4>💰 Gestione Finanziaria</h4>
                      <div className={styles.managementActions}>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('process_payouts')}>
                          💸 Processa Payout
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('adjust_rates')}>
                          📊 Modifica Rendimenti
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('freeze_investments')}>
                          ❄️ Blocca Investimenti
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('financial_report')}>
                          📈 Report Completo
                        </button>
                      </div>
                    </div>

                    <div className={styles.managementCard}>
                      <h4>💎 Gestione GLG EQUITY PLEDGE</h4>
                      <div className={styles.managementActions}>
                        <button className={styles.managementButton} onClick={() => handlePledgeManagement('add_pledge')}>
                          ➕ Aggiungi Pacchetto
                        </button>
                        <button className={styles.managementButton} onClick={() => handlePledgeManagement('edit_pledge')}>
                          ✏️ Modifica Pacchetto
                        </button>
                        <button className={styles.managementButton} onClick={() => handlePledgeManagement('remove_pledge')}>
                          🗑️ Rimuovi Pacchetto
                        </button>
                        <button className={styles.managementButton} onClick={() => handlePledgeManagement('adjust_returns')}>
                          📊 Modifica Rendimenti
                        </button>
                      </div>
                    </div>

                    <div className={styles.managementCard}>
                      <h4>🔧 Gestione Sistema</h4>
                      <div className={styles.managementActions}>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('system_backup')}>
                          💾 Backup Sistema
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('clear_cache')}>
                          🧹 Pulisci Cache
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('update_news')}>
                          📰 Aggiorna News
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('system_restart')}>
                          🔄 Riavvia Sistema
                        </button>
                      </div>
                    </div>

                    <div className={styles.managementCard}>
                      <h4>🛡️ Sicurezza</h4>
                      <div className={styles.managementActions}>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('security_scan')}>
                          🔍 Scan Sicurezza
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('block_ip')}>
                          🚫 Blocca IP
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('audit_logs')}>
                          📋 Audit Logs
                        </button>
                        <button className={styles.managementButton} onClick={() => handleManagementAction('update_security')}>
                          🔒 Aggiorna Sicurezza
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GLG Equity Pledge Management Section */}
                <div className={styles.pledgeManagementSection}>
                  <h3 className={styles.sectionTitle}>💎 Gestione Pacchetti GLG EQUITY PLEDGE</h3>
                  <div className={styles.pledgeManagementGrid}>
                    <div className={styles.pledgeManagementCard}>
                      <h4>➕ Aggiungi Nuovo Pacchetto</h4>
                      <div className={styles.pledgeForm}>
                        <div className={styles.pledgeInputGroup}>
                          <input 
                            type="text" 
                            placeholder="Nome pacchetto (es: GLG EQUITY PLEDGE - DIAMOND)"
                            className={styles.pledgeInput}
                            id="pledge-name"
                          />
                          <input 
                            type="number" 
                            placeholder="Rendimento % (es: 15)"
                            className={styles.pledgeInput}
                            id="pledge-returns"
                          />
                        </div>
                        <div className={styles.pledgeInputGroup}>
                          <input 
                            type="number" 
                            placeholder="Importo minimo € (es: 50000)"
                            className={styles.pledgeInput}
                            id="pledge-min"
                          />
                          <input 
                            type="number" 
                            placeholder="Importo massimo € (es: 200000)"
                            className={styles.pledgeInput}
                            id="pledge-max"
                          />
                        </div>
                        <div className={styles.pledgeInputGroup}>
                          <input 
                            type="text" 
                            placeholder="Durata (es: 48 mesi)"
                            className={styles.pledgeInput}
                            id="pledge-duration"
                          />
                          <select className={styles.pledgeSelect} id="pledge-status">
                            <option value="active">Attivo</option>
                            <option value="inactive">Inattivo</option>
                            <option value="coming_soon">Prossimamente</option>
                          </select>
                        </div>
                        <textarea 
                          placeholder="Descrizione del pacchetto..."
                          className={styles.pledgeTextarea}
                          id="pledge-description"
                        />
                        <div className={styles.pledgeActions}>
                          <button className={styles.pledgeButton} onClick={() => handlePledgeManagement('add_pledge')}>
                            ➕ Aggiungi Pacchetto
                          </button>
                          <button className={styles.pledgeButton} onClick={() => handlePledgeManagement('preview')}>
                            👁️ Anteprima
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.pledgeManagementCard}>
                      <h4>📋 Pacchetti GLG EQUITY PLEDGE Attuali</h4>
                      <div className={styles.pledgeList}>
                        {availablePledges.map((pledge) => (
                          <div key={pledge.id} className={styles.pledgeItem}>
                            <div className={styles.pledgeItemHeader}>
                              <span className={styles.pledgeItemName}>{pledge.type}</span>
                              <span className={styles.pledgeItemReturns}>{pledge.returns}% annuo</span>
                            </div>
                            <div className={styles.pledgeItemDetails}>
                              <span className={styles.pledgeItemAmount}>€{pledge.minInvestment.toLocaleString()} - €{pledge.maxInvestment.toLocaleString()}</span>
                              <span className={styles.pledgeItemDuration}>{pledge.duration}</span>
                            </div>
                            <div className={styles.pledgeItemActions}>
                              <button 
                                className={styles.pledgeItemButton}
                                onClick={() => handlePledgeManagement('edit_pledge', pledge.id)}
                              >
                                ✏️ Modifica
                              </button>
                              <button 
                                className={styles.pledgeItemButton}
                                onClick={() => handlePledgeManagement('remove_pledge', pledge.id)}
                              >
                                🗑️ Rimuovi
                              </button>
                              <button 
                                className={styles.pledgeItemButton}
                                onClick={() => handlePledgeManagement('activate_pledge', pledge.id)}
                              >
                                ✅ Attiva
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.pledgeManagementCard}>
                      <h4>🔧 Azioni Pacchetti</h4>
                      <div className={styles.pledgeActions}>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('export_pledges')}>
                          📤 Esporta Lista Pacchetti
                        </button>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('pledge_analytics')}>
                          📈 Analisi Pacchetti
                        </button>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('backup_pledges')}>
                          💾 Backup Configurazione
                        </button>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('restore_pledges')}>
                          🔄 Ripristina Configurazione
                        </button>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('mass_update')}>
                          🔄 Aggiornamento Massivo
                        </button>
                        <button className={styles.pledgeActionButton} onClick={() => handlePledgeManagement('pledge_report')}>
                          📊 Report Completo
                        </button>
                      </div>
                    </div>

                    <div className={styles.pledgeManagementCard}>
                      <h4>📊 Statistiche Pacchetti GLG EQUITY PLEDGE</h4>
                      <div className={styles.pledgeStats}>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Pacchetti Totali:</span>
                          <span className={styles.pledgeStatValue}>{availablePledges.length}</span>
                        </div>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Pacchetti Attivi:</span>
                          <span className={styles.pledgeStatValue}>{availablePledges.filter(p => p.status === 'active').length}</span>
                        </div>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Rendimento Medio:</span>
                          <span className={styles.pledgeStatValue}>
                            {(availablePledges.reduce((sum, p) => sum + p.returns, 0) / availablePledges.length).toFixed(1)}%
                          </span>
                        </div>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Investimenti Totali:</span>
                          <span className={styles.pledgeStatValue}>
                            €{availablePledges.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                          </span>
                        </div>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Ultimo Aggiornamento:</span>
                          <span className={styles.pledgeStatValue}>Oggi</span>
                        </div>
                        <div className={styles.pledgeStat}>
                          <span className={styles.pledgeStatLabel}>Pacchetti Popolari:</span>
                          <span className={styles.pledgeStatValue}>GOLD (45%), PLATINUM (30%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>🆘 Supporto Clienti</h2>
                <p className={styles.cardSubtitle}>Contatta il nostro team di supporto per assistenza</p>

                <div className={styles.supportGrid}>
                  <div className={styles.supportCard}>
                    <h3 className={styles.sectionTitle}>📞 Contatti Diretti</h3>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactItem}>
                        <span className={styles.contactIcon}>📧</span>
                        <div className={styles.contactDetails}>
                          <span className={styles.contactLabel}>Email Supporto:</span>
                          <span className={styles.contactValue}>corefound@glgcapitalgroupllc.com</span>
                        </div>
                      </div>
                      <div className={styles.contactItem}>
                        <span className={styles.contactIcon}>🌐</span>
                        <div className={styles.contactDetails}>
                          <span className={styles.contactLabel}>Sito Web:</span>
                          <span className={styles.contactValue}>www.glgcapitalgroupllc.com</span>
                        </div>
                      </div>
                      <div className={styles.contactItem}>
                        <span className={styles.contactIcon}>📍</span>
                        <div className={styles.contactDetails}>
                          <span className={styles.contactLabel}>Indirizzo:</span>
                          <span className={styles.contactValue}>1309 Coffeen Avenue, STE 1200, Sheridan, Wyoming 82801</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.supportCard}>
                    <h3 className={styles.sectionTitle}>🎫 Azioni Supporto</h3>
                    <div className={styles.supportActions}>
                      <button className={styles.supportButton} onClick={() => handleSupportAction('ticket')}>
                        <span className={styles.supportIcon}>🎫</span>
                        <span className={styles.supportText}>Apri Nuovo Ticket</span>
                      </button>
                      <button className={styles.supportButton} onClick={() => handleSupportAction('chat')}>
                        <span className={styles.supportIcon}>💬</span>
                        <span className={styles.supportText}>Chat Live</span>
                      </button>
                      <button className={styles.supportButton} onClick={() => handleSupportAction('contact')}>
                        <span className={styles.supportIcon}>📞</span>
                        <span className={styles.supportText}>Contatta Direttamente</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 