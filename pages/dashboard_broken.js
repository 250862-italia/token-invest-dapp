import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'Mario Rossi',
    email: 'admin@glg.com',
    company: 'Tech Solutions Ltd',
    position: 'CEO',
    memberSince: '2024-01-15'
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: 'GLG Equity Pledge',
      amount: 50000,
      date: '2024-01-20',
      status: 'Active',
      return: 12,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2027-01-20') // 36 mesi
    }
  ]);

  const [dailyEarnings, setDailyEarnings] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    totalEarned: 0,
    daysElapsed: 0,
    daysRemaining: 0,
    nextPayout: 0
  });

  const [packages, setPackages] = useState([
    { id: 1, nome: 'GLG Equity Pledge', rendimento: 12, durata: 36, minimo: 25000, descrizione: 'Pacchetto premium 12% annuo garantito.', tokenRichiesti: 2500, stato: 'attivo' },
    { id: 2, nome: 'GLG Fast Track', rendimento: 15, durata: 24, minimo: 50000, descrizione: 'Pacchetto breve durata, rendimento più alto.', tokenRichiesti: 5000, stato: 'attivo' }
  ]);
  const [newPackage, setNewPackage] = useState({ 
    nome: '', 
    rendimento: '', 
    durata: '', 
    minimo: '', 
    descrizione: '', 
    tokenRichiesti: '',
    stato: 'attivo'
  });

  // KYC State
  const [kycData, setKycData] = useState({
    personalInfo: {
      firstName: 'Mario',
      lastName: 'Rossi',
      dateOfBirth: '1985-03-15',
      nationality: 'Italiana',
      taxCode: 'RSSMRA85C15H501A',
      address: 'Via Roma 123, Milano, 20100',
      phone: '+39 333 1234567'
    },
    documents: {
      identityCard: { uploaded: true, verified: true, fileName: 'carta_identita.pdf' },
      passport: { uploaded: false, verified: false, fileName: '' },
      proofOfAddress: { uploaded: true, verified: true, fileName: 'bolletta_luce.pdf' },
      taxDeclaration: { uploaded: false, verified: false, fileName: '' },
      sourceOfFunds: { uploaded: false, verified: false, fileName: '' }
    },
    verificationStatus: 'pending', // pending, approved, rejected
    riskLevel: 'medium', // low, medium, high
    lastUpdated: '2024-01-20'
  });

  const [kycFormData, setKycFormData] = useState({
    firstName: kycData.personalInfo.firstName,
    lastName: kycData.personalInfo.lastName,
    dateOfBirth: kycData.personalInfo.dateOfBirth,
    nationality: kycData.personalInfo.nationality,
    taxCode: kycData.personalInfo.taxCode,
    address: kycData.personalInfo.address,
    phone: kycData.personalInfo.phone
  });

  // AI Support State
  const [supportChat, setSupportChat] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // AI Knowledge Base
  const aiResponses = {
    'payout': {
      keywords: ['payout', 'pagamento', 'incasso', 'quando ricevo', 'quando arriva'],
      response: 'I payout vengono erogati mensilmente il giorno 30 di ogni mese. Il primo payout viene effettuato dopo 30 giorni d\'investimento. Puoi verificare il prossimo payout nella sezione "Guadagni Giornalieri".'
    },
    'investimento': {
      keywords: ['investimento', 'ritiro', 'disinvestire', 'vendere', 'uscire'],
      response: 'Gli investimenti GLG Equity Pledge sono vincolati per la durata del contratto (36 mesi). Non è possibile ritirare anticipatamente il capitale. Questo garantisce la stabilità del fondo e i rendimenti promessi.'
    },
    'kyc': {
      keywords: ['kyc', 'verifica', 'documenti', 'identità', 'compliance'],
      response: 'Il processo KYC è obbligatorio per legge. Devi caricare: carta d\'identità, prova di residenza, dichiarazione dei redditi e documentazione sulla provenienza dei fondi. I tempi di verifica sono 3-5 giorni lavorativi.'
    },
    'rendimento': {
      keywords: ['rendimento', 'guadagno', 'profitto', 'percentuale', 'interesse'],
      response: 'Il rendimento garantito è del 12% annuo lordo. I guadagni vengono calcolati giornalmente e puoi visualizzarli in tempo reale nella sezione "Guadagni Giornalieri". Il payout mensile è automatico.'
    },
    'pegno': {
      keywords: ['pegno', 'garanzia', 'sicurezza', 'md europe', 'quote'],
      response: 'Il pegno volontario sulle quote MD Europe garantisce il rimborso del capitale in caso di insolvenza. È una garanzia reale che protegge il tuo investimento.'
    },
    'contatto': {
      keywords: ['contatto', 'telefono', 'email', 'supporto', 'assistenza'],
      response: 'Puoi contattarci via email a support@glgcapitalgroupllc.com o telefonicamente al +1 (555) 123-4567. Orari: Lun-Ven 9:00-18:00 (EST).'
    },
    'default': {
      response: 'Grazie per la tua domanda. Per assistenza specifica, puoi contattare il nostro team di supporto via email a support@glgcapitalgroupllc.com o chiamare il +1 (555) 123-4567.'
    }
  };

  // AI Chat Functions
  const findBestResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, data] of Object.entries(aiResponses)) {
      if (category === 'default') continue;
      
      for (const keyword of data.keywords) {
        if (lowerMessage.includes(keyword)) {
          return data.response;
        }
      }
    }
    
    return aiResponses.default.response;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };

    setSupportChat(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = findBestResponse(userMessage);
      const aiMsg = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      };

      setSupportChat(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    'Quando ricevo il primo payout?',
    'Posso ritirare l\'investimento?',
    'Come funziona il KYC?',
    'Qual è il rendimento garantito?',
    'Come contattare il supporto?'
  ];

  const handleQuickQuestion = (question) => {
    setUserMessage(question);
  };

  useEffect(() => {
    calculateDailyEarnings();
    const interval = setInterval(calculateDailyEarnings, 60000); // Aggiorna ogni minuto
    return () => clearInterval(interval);
  }, []);

  const calculateDailyEarnings = () => {
    const investment = investments[0];
    const now = new Date();
    const startDate = new Date(investment.startDate);
    const endDate = new Date(investment.endDate);
    
    // Calcoli temporali
    const daysElapsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.floor((endDate - now) / (1000 * 60 * 60 * 24));
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Calcoli guadagni
    const annualReturn = investment.amount * (investment.return / 100);
    const dailyReturn = annualReturn / 365;
    const totalEarned = dailyReturn * daysElapsed;
    const nextPayout = dailyReturn * 30; // Payout mensile
    
    setDailyEarnings({
      daily: dailyReturn,
      weekly: dailyReturn * 7,
      monthly: dailyReturn * 30,
      totalEarned: totalEarned,
      daysElapsed: daysElapsed,
      daysRemaining: daysRemaining,
      nextPayout: nextPayout,
      totalDays: totalDays
    });
  };

  const handleLogout = () => {
    // Simulate logout
    window.location.href = '/login';
  };

  const isSuperadmin = user.email === 'admin@glg.com';

  const handlePackageInput = (e) => {
    const { name, value } = e.target;
    setNewPackage(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!newPackage.nome || !newPackage.rendimento || !newPackage.durata || !newPackage.minimo) return;
    setPackages(prev => [
      ...prev,
      { ...newPackage, id: Date.now(), rendimento: Number(newPackage.rendimento), durata: Number(newPackage.durata), minimo: Number(newPackage.minimo) }
    ]);
    setNewPackage({ nome: '', rendimento: '', durata: '', minimo: '', descrizione: '' });
  };

  const handleDeletePackage = (id) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // KYC Functions
  const handleKycInputChange = (e) => {
    const { name, value } = e.target;
    setKycFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    // Simulate KYC update
    setKycData(prev => ({
      ...prev,
      personalInfo: kycFormData,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    alert('Informazioni KYC aggiornate con successo!');
  };

  const handleDocumentUpload = (documentType) => {
    // Simulate file upload
    const fileName = `${documentType}_${Date.now()}.pdf`;
    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: {
          uploaded: true,
          verified: false,
          fileName: fileName
        }
      }
    }));
    alert(`Documento ${documentType} caricato con successo!`);
  };

  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getVerificationStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approvato';
      case 'pending': return 'In Verifica';
      case 'rejected': return 'Rifiutato';
      default: return 'Sconosciuto';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskLevelText = (level) => {
    switch (level) {
      case 'low': return 'Basso';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return 'Sconosciuto';
    }
  };

  const tabs = [
    { id: 'profile', label: '👤 Profilo', icon: '👤' },
    { id: 'overview', label: '📊 Panoramica', icon: '📊' },
    { id: 'kyc', label: '📋 KYC', icon: '📋' },
    { id: 'opportunities', label: '💼 Opportunità', icon: '💼' },
    { id: 'investments', label: '💰 I Miei Investimenti', icon: '💰' },
    { id: 'payments', label: '💳 Pagamenti', icon: '💳' },
    { id: 'earnings', label: '📈 Guadagni Giornalieri', icon: '📈' },
    { id: 'support', label: '🆘 Supporto', icon: '🆘' },
    ...(user.email === 'admin@glg.com' ? [{ id: 'admin', label: '⚙️ Amministrazione', icon: '⚙️' }] : [])
  ];

  // Chart Data for Performance
  const chartData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [50000, 52000, 54000, 56000, 58000, 60000, 62000, 64000, 66000, 68000, 70000, 72000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Investments',
        data: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
        borderColor: '#e2e8f0',
        backgroundColor: 'rgba(226, 232, 240, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0',
          drawBorder: false
        },
        ticks: {
          callback: function(value) {
            return '€' + value.toLocaleString();
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  // Payment State
  const [paymentAmount, setPaymentAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [glgTokens, setGlgTokens] = useState(1000); // 1:1 ratio for now
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Calculate GLG Tokens based on amount
  useEffect(() => {
    setGlgTokens(paymentAmount);
  }, [paymentAmount]);

  // Admin Section State
  const [adminSection, setAdminSection] = useState('packages');

  // Admin Data
  const [adminStats, setAdminStats] = useState({
    totalClients: 1247,
    activeClients: 892,
    newClients: 45,
    kycCompleted: 1156,
    kycPending: 23,
    kycRejected: 68,
    totalRevenue: 2450000,
    tokensInCirculation: 245000,
    activeInvestments: 1850000,
    distributedReturns: 185000,
    todayPayments: 125000,
    pendingPayments: 45000,
    tokensSold: 12500,
    successRate: 98.5
  });

  // Site Management State
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'GLG Capital Group',
    heroSubtitle: 'Investimenti di Lusso e Opportunità Esclusive',
    aboutTitle: 'Chi Siamo',
    aboutContent: 'GLG Capital Group è leader negli investimenti di lusso...',
    seoTitle: 'GLG Capital Group - Investimenti di Lusso',
    seoDescription: 'Scopri le opportunità esclusive di investimento con GLG Capital Group',
    maintenanceMode: false
  });

  // Payment Functions
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentAmount || paymentAmount < 100) {
      alert('Importo minimo: €100');
      return;
    }
    
    // Simulate payment processing
    const payment = {
      id: Date.now(),
      amount: paymentAmount,
      method: paymentMethod,
      tokens: glgTokens,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    setPaymentHistory(prev => [payment, ...prev]);
    setShowPaymentForm(false);
    setPaymentAmount(1000);
    alert(`Pagamento di €${paymentAmount} processato! ${glgTokens} GLG Token aggiunti al tuo account.`);
  };

  // Admin Functions
  const handleAdminSave = (section) => {
    switch(section) {
      case 'packages':
        alert('Pacchetti di investimento salvati con successo!');
        break;
      case 'clients':
        alert('Dati clienti aggiornati con successo!');
        break;
      case 'kyc':
        alert('Stato KYC aggiornato con successo!');
        break;
      case 'payments':
        alert('Stato pagamenti aggiornato con successo!');
        break;
      case 'statistics':
        alert('Statistiche aggiornate con successo!');
        break;
      case 'settings':
        alert('Impostazioni di sistema salvate con successo!');
        break;
      case 'website':
        alert('Contenuto del sito salvato con successo!');
        break;
      default:
        alert('Operazione completata con successo!');
    }
  };

  const handleSiteContentChange = (field, value) => {
    setSiteContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSiteAction = (action) => {
    switch(action) {
      case 'save':
        alert('Contenuto del sito salvato con successo!');
        break;
      case 'preview':
        alert('Anteprima disponibile in una nuova finestra');
        break;
      case 'publish':
        alert('Sito pubblicato con successo!');
        break;
      case 'backup':
        alert('Backup del sito creato con successo!');
        break;
      case 'restore':
        alert('Sito ripristinato dal backup!');
        break;
      case 'maintenance':
        setSiteContent(prev => ({
          ...prev,
          maintenanceMode: !prev.maintenanceMode
        }));
        alert(siteContent.maintenanceMode ? 'Modalità manutenzione disattivata' : 'Modalità manutenzione attivata');
        break;
      default:
        alert('Azione completata!');
    }
  };

  // Profile Functions
  const handleProfileAction = (action) => {
    console.log('Profile action:', action);
    switch(action) {
      case 'password':
        alert('🔐 Link per cambio password inviato via email');
        break;
      case 'email':
        alert('📧 Funzione di modifica email attivata');
        break;
      case 'phone':
        alert('📱 Funzione di aggiornamento telefono attivata');
        break;
      case 'notifications':
        alert('🔔 Impostazioni notifiche aperte');
        break;
      case 'language':
        alert('🌐 Selezione lingua attivata');
        break;
      case 'security':
        alert('🔒 Impostazioni sicurezza aperte');
        break;
      default:
        alert('✅ Azione completata!');
    }
  };

  // Investment Functions
  const handleInvestmentAction = (action, investmentId) => {
    console.log('Investment action:', action, investmentId);
    switch(action) {
      case 'details':
        alert(`💰 Dettagli investimento ${investmentId} aperti`);
        break;
      case 'withdraw':
        alert('💸 Richiesta di prelievo inviata');
        break;
      case 'reinvest':
        alert('🔄 Reinvestimento effettuato con successo');
        break;
      default:
        alert('✅ Azione completata!');
    }
  };

  // KYC Functions
  const handleKycAction = (action) => {
    console.log('KYC action:', action);
    switch(action) {
      case 'submit':
        alert('📋 Documenti KYC inviati per la verifica');
        break;
      case 'update':
        alert('📝 Informazioni KYC aggiornate');
        break;
      case 'verify':
        alert('✅ Verifica KYC completata');
        break;
      default:
        alert('✅ Azione KYC completata!');
    }
  };

  // Support Functions
  const handleSupportAction = (action) => {
    console.log('Support action:', action);
    switch(action) {
      case 'ticket':
        alert('🎫 Ticket di supporto creato');
        break;
      case 'contact':
        alert('📞 Contatto supporto aperto');
        break;
      default:
        alert('✅ Azione supporto completata!');
    }
  };

  // Admin Action Functions
  const handleAdminAction = (action, itemId, itemType) => {
    console.log('Admin action:', action, itemId, itemType);
    switch(action) {
      case "approve":
        alert(`✅ Approvato ${itemType} ${itemId}`);
        break;
      case "reject":
        alert(`❌ Rifiutato ${itemType} ${itemId}`);
        break;
      case "delete":
        alert(`🗑️ Eliminato ${itemType} ${itemId}`);
        break;
      case "edit":
        alert(`✏️ Modifica ${itemType} ${itemId}`);
        break;
      default:
        alert(`⚙️ Azione ${action} su ${itemType} ${itemId}`);
    }
  };

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
            <img src="/logo-glg.png" alt="GLG Capital Group Logo" className={styles.logo} />
            <span className={styles.dashboardTitle}>Dashboard</span>
          </div>
          <div className={styles.userSection}>
            <span className={styles.welcomeText}>Benvenuto, {user.name}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
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
                        <span className={styles.infoValue}>{user.phone || 'Non specificato'}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Data Registrazione:</span>
                        <span className={styles.infoValue}>15 Gennaio 2024</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Status Account:</span>
                        <span className={styles.infoValue}>
                          <span className={styles.statusBadge}>✅ Verificato</span>
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
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>📊 Panoramica Portfolio</h2>
                <p className={styles.cardSubtitle}>Vista generale dei tuoi investimenti e performance</p>

                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                      <h3>Investimento Totale</h3>
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

                {/* Account Statistics */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📊 Statistiche Account</h3>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>💰</div>
                      <div className={styles.statContent}>
                        <h4 className={styles.statTitle}>GLG Token Posseduti</h4>
                        <p className={styles.statValue}>50,000 GLG</p>
                        <span className={styles.statChange}>+5,000 questo mese</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>📈</div>
                      <div className={styles.statContent}>
                        <h4 className={styles.statTitle}>Investimenti Attivi</h4>
                        <p className={styles.statValue}>3</p>
                        <span className={styles.statChange}>€150,000 totale</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>🎯</div>
                      <div className={styles.statContent}>
                        <h4 className={styles.statTitle}>Rendimento Medio</h4>
                        <p className={styles.statValue}>12.5%</p>
                        <span className={styles.statChange}>Annuale</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>📅</div>
                      <div className={styles.statContent}>
                        <h4 className={styles.statTitle}>Giorni Membro</h4>
                        <p className={styles.statValue}>365</p>
                        <span className={styles.statChange}>1 anno</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📈 Andamento Portfolio</h3>
                  <div className={styles.chartContainer}>
                    <canvas id="performanceChart" width="400" height="200"></canvas>
                  </div>
                  <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{backgroundColor: '#3b82f6'}}></span>
                      <span className={styles.legendText}>Valore Portfolio</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{backgroundColor: '#e2e8f0'}}></span>
                      <span className={styles.legendText}>Investimenti Base</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === 'kyc' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>📋 KYC & Compliance</h2>
                <p className={styles.cardSubtitle}>Verifica della tua identità e conformità normativa</p>
                
                {/* KYC Status Overview */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Status Verifica</h3>
                    <p className={styles.statValue} style={{color: '#10b981'}}>✅ Verificato</p>
                    <p className={styles.statSubtitle}>Account verificato con successo</p>
                  </div>

                  <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Risk Level</h3>
                    <p className={styles.statValue} style={{color: '#10b981'}}>Basso</p>
                    <p className={styles.statSubtitle}>Profilo conforme agli standard</p>
                  </div>

                  <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Documenti</h3>
                    <p className={styles.statValue}>5/5</p>
                    <p className={styles.statSubtitle}>Documenti completati</p>
                  </div>
                </div>

                {/* Personal Information Form */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>Informazioni Personali</h3>
                  <form onSubmit={handleKycSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={kycFormData.firstName}
                          onChange={(e) => setKycFormData({...kycFormData, firstName: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Cognome *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={kycFormData.lastName}
                          onChange={(e) => setKycFormData({...kycFormData, lastName: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Data di Nascita *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={kycFormData.dateOfBirth}
                          onChange={(e) => setKycFormData({...kycFormData, dateOfBirth: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nazionalità *</label>
                        <input
                          type="text"
                          name="nationality"
                          value={kycFormData.nationality}
                          onChange={(e) => setKycFormData({...kycFormData, nationality: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Codice Fiscale *</label>
                        <input
                          type="text"
                          name="taxCode"
                          value={kycFormData.taxCode}
                          onChange={(e) => setKycFormData({...kycFormData, taxCode: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Indirizzo *</label>
                        <input
                          type="text"
                          name="address"
                          value={kycFormData.address}
                          onChange={(e) => setKycFormData({...kycFormData, address: e.target.value})}
                          className={styles.formInput}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitButton} onClick={() => handleKycAction('submit')}>
                      Aggiorna Informazioni
                    </button>
                  </form>
                </div>

                {/* Document Upload */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>Caricamento Documenti</h3>
                  <p className={styles.sectionSubtitle}>
                    Carica i documenti richiesti per completare la verifica KYC. Tutti i documenti devono essere in formato PDF e non superare i 5MB.
                  </p>
                  
                  <div className={styles.documentsGrid}>
                    <div className={styles.documentCard}>
                      <div className={styles.documentHeader}>
                        <h4 className={styles.documentTitle}>🆔 Carta d'Identità</h4>
                        <span className={styles.documentStatus}>✅ Caricato</span>
                      </div>
                      <p className={styles.documentDesc}>Carica documento fronte/retro</p>
                      <button className={styles.uploadButton} onClick={() => handleDocumentUpload('identity')}>📁 Carica</button>
                    </div>

                    <div className={styles.documentCard}>
                      <div className={styles.documentHeader}>
                        <h4 className={styles.documentTitle}>📄 Passaporto</h4>
                        <span className={styles.documentStatus}>✅ Caricato</span>
                      </div>
                      <p className={styles.documentDesc}>Carica pagina principale</p>
                      <button className={styles.uploadButton} onClick={() => handleDocumentUpload('passport')}>📁 Carica</button>
                    </div>

                    <div className={styles.documentCard}>
                      <div className={styles.documentHeader}>
                        <h4 className={styles.documentTitle}>🏠 Prova di Residenza</h4>
                        <span className={styles.documentStatus}>✅ Caricato</span>
                      </div>
                      <p className={styles.documentDesc}>Bolletta o estratto conto</p>
                      <button className={styles.uploadButton} onClick={() => handleDocumentUpload('address')}>📁 Carica</button>
                    </div>

                    <div className={styles.documentCard}>
                      <div className={styles.documentHeader}>
                        <h4 className={styles.documentTitle}>📊 Dichiarazione dei Redditi</h4>
                        <span className={styles.documentStatus}>✅ Caricato</span>
                      </div>
                      <p className={styles.documentDesc}>Ultima dichiarazione</p>
                      <button className={styles.uploadButton} onClick={() => handleDocumentUpload('tax')}>📁 Carica</button>
                    </div>

                    <div className={styles.documentCard}>
                      <div className={styles.documentHeader}>
                        <h4 className={styles.documentTitle}>💰 Provenienza Fondi</h4>
                        <span className={styles.documentStatus}>✅ Caricato</span>
                      </div>
                      <p className={styles.documentDesc}>Documentazione fonte capitale</p>
                      <button className={styles.uploadButton} onClick={() => handleDocumentUpload('funds')}>📁 Carica</button>
                    </div>
                  </div>
                </div>

                {/* Compliance Information */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>ℹ️ Informazioni Compliance</h3>
                  <div className={styles.complianceInfo}>
                    <div className={styles.infoSection}>
                      <h4 className={styles.infoTitle}>Perché il KYC è importante?</h4>
                      <p className={styles.infoText}>
                        Il processo KYC (Know Your Customer) è obbligatorio per legge e garantisce la sicurezza delle transazioni finanziarie, 
                        prevenendo il riciclaggio di denaro e il finanziamento del terrorismo.
                      </p>
                    </div>
                    
                    <div className={styles.infoSection}>
                      <h4 className={styles.infoTitle}>Tempi di verifica</h4>
                      <p className={styles.infoText}>
                        I documenti vengono verificati entro 3-5 giorni lavorativi dal ricevimento.
                      </p>
                    </div>
                    
                    <div className={styles.infoSection}>
                      <h4 className={styles.infoTitle}>Privacy e Sicurezza</h4>
                      <p className={styles.infoText}>
                        Tutti i documenti sono crittografati e trattati secondo le normative GDPR. 
                        Le informazioni sono utilizzate esclusivamente per finalità di compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === 'opportunities' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>💼 Opportunità di Investimento</h2>
                <p className={styles.cardSubtitle}>Scopri nuove opportunità e prodotti finanziari disponibili</p>
                
                <div className={styles.opportunitiesGrid}>
                  <div className={styles.opportunityCard}>
                    <div className={styles.opportunityHeader}>
                      <h3 className={styles.opportunityTitle}>🚀 GLG Equity Pledge</h3>
                      <span className={styles.opportunityBadge}>Popolare</span>
                    </div>
                    <div className={styles.opportunityDetails}>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Rendimento:</span>
                        <span className={styles.statValue}>12% annuo</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Durata:</span>
                        <span className={styles.statValue}>36 mesi</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Minimo:</span>
                        <span className={styles.statValue}>€10,000</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Garanzia:</span>
                        <span className={styles.statValue}>Pegno MD Europe</span>
                      </div>
                    </div>
                    <button className={styles.investButton} onClick={() => handleInvestmentAction('details', 'equity-pledge')}>💰 Investi Ora</button>
                  </div>

                  <div className={styles.opportunityCard}>
                    <div className={styles.opportunityHeader}>
                      <h3 className={styles.opportunityTitle}>📈 GLG Growth Fund</h3>
                      <span className={styles.opportunityBadge}>Nuovo</span>
                    </div>
                    <div className={styles.opportunityDetails}>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Rendimento:</span>
                        <span className={styles.statValue}>15% annuo</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Durata:</span>
                        <span className={styles.statValue}>48 mesi</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Minimo:</span>
                        <span className={styles.statValue}>€25,000</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Garanzia:</span>
                        <span className={styles.statValue}>Asset Backed</span>
                      </div>
                    </div>
                    <button className={styles.investButton} onClick={() => handleInvestmentAction('details', 'growth-fund')}>💰 Investi Ora</button>
                  </div>

                  <div className={styles.opportunityCard}>
                    <div className={styles.opportunityHeader}>
                      <h3 className={styles.opportunityTitle}>🏢 GLG Real Estate</h3>
                      <span className={styles.opportunityBadge}>Premium</span>
                    </div>
                    <div className={styles.opportunityDetails}>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Rendimento:</span>
                        <span className={styles.statValue}>18% annuo</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Durata:</span>
                        <span className={styles.statValue}>60 mesi</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Minimo:</span>
                        <span className={styles.statValue}>€50,000</span>
                      </div>
                      <div className={styles.opportunityStat}>
                        <span className={styles.statLabel}>Garanzia:</span>
                        <span className={styles.statValue}>Immobiliare</span>
                      </div>
                    </div>
                    <button className={styles.investButton} onClick={() => handleInvestmentAction('details', 'real-estate')}>💰 Investi Ora</button>
                  </div>
                </div>

                {/* Market Insights */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📊 Insights di Mercato</h3>
                  <div className={styles.insightsGrid}>
                    <div className={styles.insightCard}>
                      <h4 className={styles.insightTitle}>📈 Trend Attuali</h4>
                      <p className={styles.insightText}>
                        Il mercato immobiliare europeo mostra segnali di ripresa, con opportunità interessanti nel settore commerciale.
                      </p>
                    </div>
                    <div className={styles.insightCard}>
                      <h4 className={styles.insightTitle}>🎯 Raccomandazioni</h4>
                      <p className={styles.insightText}>
                        Diversificazione consigliata: 60% Equity Pledge, 30% Growth Fund, 10% Real Estate.
                      </p>
                    </div>
                    <div className={styles.insightCard}>
                      <h4 className={styles.insightTitle}>⚠️ Rischi</h4>
                      <p className={styles.insightText}>
                        Monitorare l'andamento dei tassi di interesse e l'inflazione per ottimizzare i rendimenti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Investments Tab */}
          {activeTab === 'investments' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>💰 I Miei Investimenti</h2>
                <p className={styles.cardSubtitle}>Gestisci e monitora i tuoi investimenti attivi</p>
                
                <div className={styles.investmentsGrid}>
                  <div className={styles.investmentCard}>
                    <div className={styles.investmentHeader}>
                      <h3 className={styles.investmentTitle}>GLG Equity Pledge #001</h3>
                      <span className={styles.investmentStatus}>Attivo</span>
                    </div>
                    <div className={styles.investmentDetails}>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Capitale Investito:</span>
                        <span className={styles.statValue}>€50,000</span>
                      </div>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Rendimento:</span>
                        <span className={styles.statValue}>12% annuo</span>
                      </div>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Guadagni Accumulati:</span>
                        <span className={styles.statValue}>€6,000</span>
                      </div>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Data Inizio:</span>
                        <span className={styles.statValue}>15 Gen 2024</span>
                      </div>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Scadenza:</span>
                        <span className={styles.statValue}>15 Gen 2027</span>
                      </div>
                      <div className={styles.investmentStat}>
                        <span className={styles.statLabel}>Prossimo Payout:</span>
                        <span className={styles.statValue}>30 Gen 2024</span>
                      </div>
                    </div>
                    <div className={styles.investmentProgress}>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{width: '8%'}}></div>
                      </div>
                      <span className={styles.progressText}>8% completato (3/36 mesi)</span>
                    </div>
                  </div>
                </div>

                {/* Investment History */}
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📋 Cronologia Investimenti</h3>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Tipo</th>
                          <th>Importo</th>
                          <th>Stato</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>15 Gen 2024</td>
                          <td>Investimento</td>
                          <td>€50,000</td>
                          <td><span className={styles.statusCompleted}>Completato</span></td>
                        </tr>
                        <tr>
                          <td>30 Gen 2024</td>
                          <td>Payout</td>
                          <td>€500</td>
                          <td><span className={styles.statusPending}>In Elaborazione</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>💳 Pagamenti</h2>
                <p className={styles.cardSubtitle}>Gestisci i tuoi pagamenti e acquisti di GLG Tokens</p>
                
                {/* Payment Form */}
                <div className={styles.paymentForm}>
                  <h3>Acquista GLG Tokens</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Importo (€)</label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Metodo di Pagamento</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className={styles.formInput}
                    >
                      <option value="bank">Banca</option>
                      <option value="creditCard">Carta di Credito</option>
                      <option value="crypto">Crypto</option>
                    </select>
                  </div>
                  <button className={styles.submitButton} onClick={handlePaymentSubmit}>Acquista</button>
                </div>

                {/* Payment History */}
                <div className={styles.paymentHistory}>
                  <h3>Cronologia Pagamenti</h3>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Importo</th>
                          <th>Metodo</th>
                          <th>Stato</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>15 Gen 2024</td>
                          <td>€1000</td>
                          <td>Banca</td>
                          <td><span className={styles.statusCompleted}>Completato</span></td>
                        </tr>
                        <tr>
                          <td>30 Gen 2024</td>
                          <td>€500</td>
                          <td>Carta di Credito</td>
                          <td><span className={styles.statusCompleted}>Completato</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div>
              <h1 className={styles.pageTitle}>💰 Guadagni Giornalieri</h1>
              
              {/* Daily Earnings Overview */}
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>
                  📊 Rendimento in Tempo Reale
                </h2>
                
                <div className={styles.statsGrid}>
                  <div className={`${styles.statCard} ${styles.earningsCard}`}>
                    <h3 className={styles.statTitle}>Guadagno Giornaliero</h3>
                    <p className={styles.statValue}>€{dailyEarnings.daily.toFixed(2)}</p>
                    <p className={styles.statSubtitle}>Ogni 24 ore</p>
                  </div>
                  
                  <div className={`${styles.statCard} ${styles.earningsCard}`}>
                    <h3 className={styles.statTitle}>Guadagno Settimanale</h3>
                    <p className={styles.statValue}>€{dailyEarnings.weekly.toFixed(2)}</p>
                    <p className={styles.statSubtitle}>Ogni 7 giorni</p>
                  </div>
                  
                  <div className={`${styles.statCard} ${styles.earningsCard}`}>
                    <h3 className={styles.statTitle}>Guadagno Mensile</h3>
                    <p className={styles.statValue}>€{dailyEarnings.monthly.toFixed(2)}</p>
                    <p className={styles.statSubtitle}>Ogni 30 giorni</p>
                  </div>
                  
                  <div className={`${styles.statCard} ${styles.earningsCard}`}>
                    <h3 className={styles.statTitle}>Totale Guadagnato</h3>
                    <p className={styles.statValue}>€{dailyEarnings.totalEarned.toFixed(2)}</p>
                    <p className={styles.statSubtitle}>Dall'inizio investimento</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{marginTop: '2rem'}}>
                  <h3 style={{color: '#1e293b', marginBottom: '1rem'}}>Progresso Investimento</h3>
                  <div className={styles.progressContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{width: `${(dailyEarnings.daysElapsed / dailyEarnings.totalDays) * 100}%`}}
                    ></div>
                  </div>
                  <p style={{color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem'}}>
                    {dailyEarnings.daysElapsed} giorni trascorsi su {dailyEarnings.totalDays} totali ({dailyEarnings.daysRemaining} giorni rimanenti)
                  </p>
                </div>

                {/* Payout Info */}
                <div className={styles.payoutInfo}>
                  <h3 className={styles.payoutTitle}>💰 Prossimo Payout</h3>
                  <p className={styles.payoutText}>
                    Il tuo prossimo payout di €{dailyEarnings.nextPayout.toFixed(2)} sarà disponibile tra 30 giorni.
                    I payout vengono erogati mensilmente il giorno {new Date().getDate()} di ogni mese.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className={styles.tabContent}>
              <div className={styles.supportContainer}>
                <div className={styles.supportHeader}>
                  <h2>Supporto Clienti</h2>
                  <p>Assistenza AI disponibile 24/7</p>
                </div>

                {/* Quick Questions */}
                <div className={styles.quickQuestions}>
                  <h3>Domande Frequenti</h3>
                  <div className={styles.quickButtons}>
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        className={styles.quickButton}
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Interface */}
                <div className={styles.chatContainer}>
                  <div className={styles.chatHeader}>
                    <h3>Chat con AI Assistant</h3>
                    <span className={styles.onlineStatus}>● Online</span>
                  </div>

                  <div className={styles.chatMessages}>
                    {supportChat.length === 0 && (
                      <div className={styles.welcomeMessage}>
                        <p>Ciao! Sono l'assistente AI di GLG Capital Group. Come posso aiutarti oggi?</p>
                        <p>Puoi chiedermi informazioni su:</p>
                        <ul>
                          <li>Payout e pagamenti</li>
                          <li>Investimenti e rendimenti</li>
                          <li>Processo KYC</li>
                          <li>Garanzie e sicurezza</li>
                          <li>Contatti e supporto</li>
                        </ul>
                      </div>
                    )}

                    {supportChat.map((message) => (
                      <div
                        key={message.id}
                        className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
                      >
                        <div className={styles.messageContent}>
                          <p>{message.text}</p>
                          <span className={styles.messageTime}>{message.timestamp}</span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className={`${styles.message} ${styles.aiMessage}`}>
                        <div className={styles.typingIndicator}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className={styles.chatInput}>
                    <input
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Scrivi la tua domanda..."
                      className={styles.messageInput}
                    />
                    <button type="submit" className={styles.sendButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22,2 15,22 11,13 2,9"></polygon>
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className={styles.contactInfo}>
                  <h3>Contatti Diretti</h3>
                  <div className={styles.contactGrid}>
                    <div className={styles.contactCard}>
                      <h4>Email Support</h4>
                      <p>support@glgcapitalgroupllc.com</p>
                      <span>Risposta entro 24h</span>
                      <button className={styles.contactButton} onClick={() => handleSupportAction('contact')}>
                        📧 Contatta via Email
                      </button>
                    </div>
                    <div className={styles.contactCard}>
                      <h4>Telefono</h4>
                      <p>+1 (555) 123-4567</p>
                      <span>Lun-Ven 9:00-18:00 EST</span>
                      <button className={styles.contactButton} onClick={() => handleSupportAction('contact')}>
                        📞 Chiama Ora
                      </button>
                    </div>
                    <div className={styles.contactCard}>
                      <h4>WhatsApp</h4>
                      <p>+1 (555) 123-4567</p>
                      <span>Supporto immediato</span>
                      <button className={styles.contactButton} onClick={() => handleSupportAction('contact')}>
                        💬 Chat WhatsApp
                      </button>
                    </div>
                    <div className={styles.contactCard}>
                      <h4>Ticket Support</h4>
                      <p>Crea un ticket di supporto</p>
                      <span>Tracciamento completo</span>
                      <button className={styles.contactButton} onClick={() => handleSupportAction('ticket')}>
                        🎫 Crea Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && isSuperadmin && (
            <div className={styles.tabContent}>
              <div className={styles.adminHeader}>
                <h2 className={styles.cardTitle}>🔧 Pannello Amministrazione</h2>
                <p className={styles.cardSubtitle}>Gestione completa del sistema GLG Capital Group</p>
              </div>

              {/* Admin Navigation */}
              <div className={styles.adminNav}>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'packages' ? styles.active : ''}`}
                  onClick={() => setAdminSection('packages')}
                >
                  📦 Pacchetti
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'clients' ? styles.active : ''}`}
                  onClick={() => setAdminSection('clients')}
                >
                  👥 Clienti
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'kyc' ? styles.active : ''}`}
                  onClick={() => setAdminSection('kyc')}
                >
                  📋 KYC
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'payments' ? styles.active : ''}`}
                  onClick={() => setAdminSection('payments')}
                >
                  💳 Pagamenti
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'website' ? styles.active : ''}`}
                  onClick={() => setAdminSection('website')}
                >
                  🌐 Sito Web
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'statistics' ? styles.active : ''}`}
                  onClick={() => setAdminSection('statistics')}
                >
                  📊 Statistiche
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'logs' ? styles.active : ''}`}
                  onClick={() => setAdminSection('logs')}
                >
                  📝 Log
                </button>
                <button 
                  className={`${styles.adminNavButton} ${adminSection === 'settings' ? styles.active : ''}`}
                  onClick={() => setAdminSection('settings')}
                >
                  ⚙️ Impostazioni
                </button>
              </div>

              {/* Packages Management */}
              {adminSection === 'packages' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📦 Gestione Pacchetti Investimento</h3>
                  
                  {/* Add New Package Form */}
                  <form onSubmit={handleAddPackage} className={styles.adminForm}>
                    <h4 className={styles.formTitle}>Aggiungi Nuovo Pacchetto</h4>
                    
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome Pacchetto *</label>
                        <input
                          type="text"
                          name="nome"
                          value={newPackage.nome}
                          onChange={handlePackageInput}
                          className={styles.formInput}
                          placeholder="Es. GLG Premium"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Rendimento (%) *</label>
                        <input
                          type="number"
                          name="rendimento"
                          value={newPackage.rendimento}
                          onChange={handlePackageInput}
                          className={styles.formInput}
                          placeholder="12"
                          step="0.1"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Durata (mesi) *</label>
                        <input
                          type="number"
                          name="durata"
                          value={newPackage.durata}
                          onChange={handlePackageInput}
                          className={styles.formInput}
                          placeholder="36"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Importo Minimo (€) *</label>
                        <input
                          type="number"
                          name="minimo"
                          value={newPackage.minimo}
                          onChange={handlePackageInput}
                          className={styles.formInput}
                          placeholder="25000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Descrizione</label>
                      <input
                        type="text"
                        name="descrizione"
                        value={newPackage.descrizione}
                        onChange={handlePackageInput}
                        className={styles.formInput}
                        placeholder="Descrizione dettagliata del pacchetto"
                      />
                    </div>
                    
                    <button type="submit" className={styles.submitButton} onClick={handleAddPackage}>
                      ➕ Aggiungi Pacchetto
                    </button>
                  </form>

                  {/* Packages Table */}
                  <div className={styles.tableSection}>
                    <h4 className={styles.formTitle}>Pacchetti Esistenti</h4>
                    
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Rendimento</th>
                            <th>Durata</th>
                            <th>Minimo</th>
                            <th>Token</th>
                            <th>Stato</th>
                            <th>Azioni</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packages.map(pkg => (
                            <tr key={pkg.id}>
                              <td>
                                <div>
                                  <strong>{pkg.nome}</strong>
                                  <div className={styles.packageDesc}>{pkg.descrizione}</div>
                                </div>
                              </td>
                              <td><span className={styles.badge}>{pkg.rendimento}%</span></td>
                              <td>{pkg.durata} mesi</td>
                              <td>€{pkg.minimo.toLocaleString()}</td>
                              <td>{pkg.tokenRichiesti} GLG</td>
                              <td>
                                <span className={`${styles.statusBadge} ${styles[pkg.stato]}`}>
                                  {pkg.stato === 'attivo' ? '✅ Attivo' : 
                                   pkg.stato === 'pausa' ? '⏸️ Pausa' : '❌ Chiuso'}
                                </span>
                              </td>
                              <td>
                                <div className={styles.actionButtons}>
                                  <button className={styles.editButton}>✏️</button>
                                  <button 
                                    onClick={() => handleDeletePackage(pkg.id)}
                                    className={styles.deleteButton}
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Clients Management */}
              {adminSection === 'clients' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>👥 Gestione Clienti</h3>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <h4>Totale Clienti</h4>
                      <div className={styles.statNumber}>1,247</div>
                      <div className={styles.statChange}>+12% questo mese</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Clienti Attivi</h4>
                      <div className={styles.statNumber}>892</div>
                      <div className={styles.statChange}>+8% questo mese</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Nuovi Clienti</h4>
                      <div className={styles.statNumber}>45</div>
                      <div className={styles.statChange}>+15% questa settimana</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>KYC Completati</h4>
                      <div className={styles.statNumber}>1,156</div>
                      <div className={styles.statChange}>92.7% del totale</div>
                    </div>
                  </div>

                  <div className={styles.tableSection}>
                    <h4 className={styles.formTitle}>Lista Clienti</h4>
                    
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Stato KYC</th>
                            <th>Investimenti</th>
                            <th>Token Posseduti</th>
                            <th>Ultimo Accesso</th>
                            <th>Azioni</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <strong>Mario Rossi</strong>
                                <div className={styles.clientInfo}>ID: CL001</div>
                              </div>
                            </td>
                            <td>mario.rossi@email.com</td>
                            <td><span className={`${styles.statusBadge} ${styles.approvato}`}>✅ Approvato</span></td>
                            <td>€50,000</td>
                            <td>2,500 GLG</td>
                            <td>Oggi 14:30</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.viewButton}>👁️</button>
                                <button className={styles.editButton}>✏️</button>
                                <button className={styles.deleteButton}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <strong>Giulia Bianchi</strong>
                                <div className={styles.clientInfo}>ID: CL002</div>
                              </div>
                            </td>
                            <td>giulia.bianchi@email.com</td>
                            <td><span className={`${styles.statusBadge} ${styles.inAttesa}`}>⏳ In Attesa</span></td>
                            <td>€0</td>
                            <td>0 GLG</td>
                            <td>Ieri 16:45</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.viewButton}>👁️</button>
                                <button className={styles.editButton}>✏️</button>
                                <button className={styles.deleteButton}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <strong>Luca Verdi</strong>
                                <div className={styles.clientInfo}>ID: CL003</div>
                              </div>
                            </td>
                            <td>luca.verdi@email.com</td>
                            <td><span className={`${styles.statusBadge} ${styles.rifiutato}`}>❌ Rifiutato</span></td>
                            <td>€0</td>
                            <td>0 GLG</td>
                            <td>2 giorni fa</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.viewButton}>👁️</button>
                                <button className={styles.editButton}>✏️</button>
                                <button className={styles.deleteButton}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* KYC Management */}
              {adminSection === 'kyc' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📋 Gestione KYC</h3>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <h4>KYC In Attesa</h4>
                      <div className={styles.statNumber}>23</div>
                      <div className={styles.statChange}>Richiedono attenzione</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>KYC Approvati</h4>
                      <div className={styles.statNumber}>1,156</div>
                      <div className={styles.statChange}>92.7% del totale</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>KYC Rifiutati</h4>
                      <div className={styles.statNumber}>68</div>
                      <div className={styles.statChange}>5.5% del totale</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Tempo Medio</h4>
                      <div className={styles.statNumber}>2.3 giorni</div>
                      <div className={styles.statChange}>Tempo di verifica</div>
                    </div>
                  </div>

                  <div className={styles.tableSection}>
                    <h4 className={styles.formTitle}>Richieste KYC in Attesa</h4>
                    
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Cliente</th>
                            <th>Data Richiesta</th>
                            <th>Documenti</th>
                            <th>Rischio</th>
                            <th>Azioni</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <strong>Anna Neri</strong>
                                <div className={styles.clientInfo}>ID: CL004</div>
                              </div>
                            </td>
                            <td>Oggi 09:15</td>
                            <td>
                              <div className={styles.documentsList}>
                                <span className={styles.docBadge}>🆔 Carta d'identità</span>
                                <span className={styles.docBadge}>🏠 Indirizzo</span>
                                <span className={styles.docBadge}>💰 Fonte fondi</span>
                              </div>
                            </td>
                            <td><span className={`${styles.riskBadge} ${styles.basso}`}>🟢 Basso</span></td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.approveButton}>✅ Approva</button>
                                <button className={styles.rejectButton}>❌ Rifiuta</button>
                                <button className={styles.viewButton}>👁️ Visualizza</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <strong>Marco Gialli</strong>
                                <div className={styles.clientInfo}>ID: CL005</div>
                              </div>
                            </td>
                            <td>Ieri 16:30</td>
                            <td>
                              <div className={styles.documentsList}>
                                <span className={styles.docBadge}>🆔 Carta d'identità</span>
                                <span className={styles.docBadge}>🏠 Indirizzo</span>
                                <span className={styles.docBadge}>💰 Fonte fondi</span>
                                <span className={styles.docBadge}>📄 Dichiarazione fiscale</span>
                              </div>
                            </td>
                            <td><span className={`${styles.riskBadge} ${styles.medio}`}>🟡 Medio</span></td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.approveButton}>✅ Approva</button>
                                <button className={styles.rejectButton}>❌ Rifiuta</button>
                                <button className={styles.viewButton}>👁️ Visualizza</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Management */}
              {adminSection === 'payments' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>💳 Gestione Pagamenti</h3>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <h4>Pagamenti Oggi</h4>
                      <div className={styles.statNumber}>€125,000</div>
                      <div className={styles.statChange}>+18% vs ieri</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Pagamenti in Attesa</h4>
                      <div className={styles.statNumber}>€45,000</div>
                      <div className={styles.statChange}>8 transazioni</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Token Venduti</h4>
                      <div className={styles.statNumber}>12,500 GLG</div>
                      <div className={styles.statChange}>+25% questa settimana</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Tasso di Successo</h4>
                      <div className={styles.statNumber}>98.5%</div>
                      <div className={styles.statChange}>+0.3% vs mese scorso</div>
                    </div>
                  </div>

                  <div className={styles.tableSection}>
                    <h4 className={styles.formTitle}>Transazioni Recenti</h4>
                    
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID Transazione</th>
                            <th>Cliente</th>
                            <th>Importo</th>
                            <th>Token Acquistati</th>
                            <th>Metodo</th>
                            <th>Stato</th>
                            <th>Data</th>
                            <th>Azioni</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>TX001</td>
                            <td>Mario Rossi</td>
                            <td>€5,000</td>
                            <td>500 GLG</td>
                            <td>💳 Carta di Credito</td>
                            <td><span className={`${styles.statusBadge} ${styles.completato}`}>✅ Completato</span></td>
                            <td>Oggi 14:30</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.viewButton}>👁️</button>
                                <button className={styles.downloadButton}>📥</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>TX002</td>
                            <td>Giulia Bianchi</td>
                            <td>€10,000</td>
                            <td>1,000 GLG</td>
                            <td>🏦 Bonifico</td>
                            <td><span className={`${styles.statusBadge} ${styles.inAttesa}`}>⏳ In Attesa</span></td>
                            <td>Oggi 11:15</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.approveButton}>✅ Approva</button>
                                <button className={styles.rejectButton}>❌ Rifiuta</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>TX003</td>
                            <td>Luca Verdi</td>
                            <td>€2,500</td>
                            <td>250 GLG</td>
                            <td>₿ Bitcoin</td>
                            <td><span className={`${styles.statusBadge} ${styles.fallito}`}>❌ Fallito</span></td>
                            <td>Ieri 18:45</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button className={styles.viewButton}>👁️</button>
                                <button className={styles.retryButton}>🔄 Riprova</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Statistics */}
              {adminSection === 'statistics' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📊 Statistiche e Report</h3>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <h4>Fatturato Totale</h4>
                      <div className={styles.statNumber}>€2,450,000</div>
                      <div className={styles.statChange}>+15% vs mese scorso</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Token in Circolazione</h4>
                      <div className={styles.statNumber}>245,000 GLG</div>
                      <div className={styles.statChange}>+8% questo mese</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Investimenti Attivi</h4>
                      <div className={styles.statNumber}>€1,850,000</div>
                      <div className={styles.statChange}>+12% vs mese scorso</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Rendimenti Distribuiti</h4>
                      <div className={styles.statNumber}>€185,000</div>
                      <div className={styles.statChange}>+22% questo mese</div>
                    </div>
                  </div>

                  <div className={styles.chartsGrid}>
                    <div className={styles.chartCard}>
                      <h4>Andamento Investimenti</h4>
                      <div className={styles.chartPlaceholder}>
                        📈 Grafico andamento investimenti negli ultimi 12 mesi
                      </div>
                    </div>
                    <div className={styles.chartCard}>
                      <h4>Distribuzione Pacchetti</h4>
                      <div className={styles.chartPlaceholder}>
                        🥧 Grafico distribuzione investimenti per pacchetto
                      </div>
                    </div>
                    <div className={styles.chartCard}>
                      <h4>Nuovi Clienti</h4>
                      <div className={styles.chartPlaceholder}>
                        📊 Grafico crescita nuovi clienti mensile
                      </div>
                    </div>
                    <div className={styles.chartCard}>
                      <h4>Performance Token</h4>
                      <div className={styles.chartPlaceholder}>
                        💰 Grafico valore token nel tempo
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Logs */}
              {adminSection === 'logs' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>📝 Log di Sistema</h3>
                  
                  <div className={styles.logFilters}>
                    <select className={styles.logFilter}>
                      <option>Tutti i livelli</option>
                      <option>Errori</option>
                      <option>Avvisi</option>
                      <option>Info</option>
                    </select>
                    <select className={styles.logFilter}>
                      <option>Tutte le azioni</option>
                      <option>Login</option>
                      <option>Pagamenti</option>
                      <option>KYC</option>
                      <option>Investimenti</option>
                    </select>
                    <input 
                      type="date" 
                      className={styles.logFilter}
                      placeholder="Data inizio"
                    />
                    <input 
                      type="date" 
                      className={styles.logFilter}
                      placeholder="Data fine"
                    />
                    <button className={styles.filterButton}>🔍 Filtra</button>
                  </div>

                  <div className={styles.tableSection}>
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Timestamp</th>
                            <th>Livello</th>
                            <th>Utente</th>
                            <th>Azione</th>
                            <th>Dettagli</th>
                            <th>IP</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2024-01-15 14:30:25</td>
                            <td><span className={`${styles.logLevel} ${styles.info}`}>ℹ️ INFO</span></td>
                            <td>mario.rossi@email.com</td>
                            <td>Login riuscito</td>
                            <td>Accesso al dashboard</td>
                            <td>192.168.1.100</td>
                          </tr>
                          <tr>
                            <td>2024-01-15 14:25:10</td>
                            <td><span className={`${styles.logLevel} ${styles.success}`}>✅ SUCCESS</span></td>
                            <td>giulia.bianchi@email.com</td>
                            <td>Pagamento completato</td>
                            <td>Acquisto 1000 GLG Token</td>
                            <td>192.168.1.101</td>
                          </tr>
                          <tr>
                            <td>2024-01-15 14:20:45</td>
                            <td><span className={`${styles.logLevel} ${styles.warning}`}>⚠️ WARNING</span></td>
                            <td>luca.verdi@email.com</td>
                            <td>Tentativo login fallito</td>
                            <td>Password errata</td>
                            <td>192.168.1.102</td>
                          </tr>
                          <tr>
                            <td>2024-01-15 14:15:30</td>
                            <td><span className={`${styles.logLevel} ${styles.error}`}>❌ ERROR</span></td>
                            <td>Sistema</td>
                            <td>Errore database</td>
                            <td>Timeout connessione</td>
                            <td>127.0.0.1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {adminSection === 'settings' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>⚙️ Impostazioni di Sistema</h3>
                  
                  <div className={styles.settingsGrid}>
                    <div className={styles.settingCard}>
                      <h4>🔐 Sicurezza</h4>
                      <div className={styles.settingItem}>
                        <label>Autenticazione a due fattori</label>
                        <select className={styles.settingSelect}>
                          <option>Obbligatoria</option>
                          <option>Opzionale</option>
                          <option>Disabilitata</option>
                        </select>
                      </div>
                      <div className={styles.settingItem}>
                        <label>Durata sessione (ore)</label>
                        <input type="number" className={styles.settingInput} defaultValue="24" />
                      </div>
                      <div className={styles.settingItem}>
                        <label>Limite tentativi login</label>
                        <input type="number" className={styles.settingInput} defaultValue="5" />
                      </div>
                    </div>

                    <div className={styles.settingCard}>
                      <h4>💰 Token</h4>
                      <div className={styles.settingItem}>
                        <label>Prezzo token (€)</label>
                        <input type="number" className={styles.settingInput} defaultValue="10" step="0.01" />
                      </div>
                      <div className={styles.settingItem}>
                        <label>Commissione transazione (%)</label>
                        <input type="number" className={styles.settingInput} defaultValue="2.5" step="0.1" />
                      </div>
                      <div className={styles.settingItem}>
                        <label>Minimo acquisto token</label>
                        <input type="number" className={styles.settingInput} defaultValue="100" />
                      </div>
                    </div>

                    <div className={styles.settingCard}>
                      <h4>📧 Notifiche</h4>
                      <div className={styles.settingItem}>
                        <label>Email amministratore</label>
                        <input type="email" className={styles.settingInput} defaultValue="admin@glg.com" />
                      </div>
                      <div className={styles.settingItem}>
                        <label>Notifiche KYC</label>
                        <select className={styles.settingSelect}>
                          <option>Immediate</option>
                          <option>Giornaliere</option>
                          <option>Disabilitate</option>
                        </select>
                      </div>
                      <div className={styles.settingItem}>
                        <label>Notifiche pagamenti</label>
                        <select className={styles.settingSelect}>
                          <option>Immediate</option>
                          <option>Giornaliere</option>
                          <option>Disabilitate</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.settingCard}>
                      <h4>🌐 Sistema</h4>
                      <div className={styles.settingItem}>
                        <label>Modalità manutenzione</label>
                        <select className={styles.settingSelect}>
                          <option>Disabilitata</option>
                          <option>Abilitata</option>
                        </select>
                      </div>
                      <div className={styles.settingItem}>
                        <label>Backup automatico</label>
                        <select className={styles.settingSelect}>
                          <option>Giornaliero</option>
                          <option>Settimanale</option>
                          <option>Disabilitato</option>
                        </select>
                      </div>
                      <div className={styles.settingItem}>
                        <label>Log retention (giorni)</label>
                        <input type="number" className={styles.settingInput} defaultValue="90" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.settingsActions}>
                    <button className={styles.saveButton} onClick={() => handleAdminSave('settings')}>💾 Salva Impostazioni</button>
                    <button className={styles.resetButton} onClick={() => handleSiteAction('reset')}>🔄 Ripristina Default</button>
                    <button className={styles.backupButton} onClick={() => handleSiteAction('backup')}>📦 Backup Sistema</button>
                  </div>
                </div>
              )}

              {/* Website Management */}
              {adminSection === 'website' && (
                <div className={styles.contentCard}>
                  <h3 className={styles.sectionTitle}>🌐 Gestione Sito Web</h3>
                  
                  <div className={styles.websiteStats}>
                    <div className={styles.statCard}>
                      <h4>Visite Oggi</h4>
                      <div className={styles.statNumber}>1,247</div>
                      <div className={styles.statChange}>+15% vs ieri</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Visite Totali</h4>
                      <div className={styles.statNumber}>45,892</div>
                      <div className={styles.statChange}>+8% questo mese</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Conversioni</h4>
                      <div className={styles.statNumber}>3.2%</div>
                      <div className={styles.statChange}>+0.5% vs mese scorso</div>
                    </div>
                    <div className={styles.statCard}>
                      <h4>Tempo Medio</h4>
                      <div className={styles.statNumber}>4m 32s</div>
                      <div className={styles.statChange}>+12s vs ieri</div>
                    </div>
                  </div>

                  <div className={styles.websiteSections}>
                    {/* Homepage Content */}
                    <div className={styles.websiteSection}>
                      <h4 className={styles.formTitle}>🏠 Homepage</h4>
                      <div className={styles.contentEditor}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Titolo Principale</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            defaultValue="Benvenuto in GLG Capital Group"
                            placeholder="Titolo principale della homepage"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Sottotitolo</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            defaultValue="Il vero potere non si compra. Si sottoscrive."
                            placeholder="Sottotitolo della homepage"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Testo Spiegazione</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="6"
                            defaultValue="Nel mondo ci sono due tipi di persone: 🟥 Chi aspetta… 🟩 E chi si muove nel momento giusto. 🎯 GLG Token non è solo una moneta digitale: è il passaporto esclusivo per accedere ai pacchetti riservati del programma GLG Equity Pledge."
                            placeholder="Testo di spiegazione principale"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Data Countdown</label>
                          <input 
                            type="datetime-local" 
                            className={styles.formInput} 
                            defaultValue="2025-07-31T21:15"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SEO Settings */}
                    <div className={styles.websiteSection}>
                      <h4 className={styles.formTitle}>🔍 SEO e Meta Tags</h4>
                      <div className={styles.contentEditor}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Meta Title</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            defaultValue="GLG Capital Group - Soluzioni Finanziarie Innovative"
                            placeholder="Titolo per i motori di ricerca"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Meta Description</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="3"
                            defaultValue="GLG Capital Group LLC offre soluzioni finanziarie innovative e opportunità di investimento esclusive. Scopri i nostri pacchetti di investimento garantiti."
                            placeholder="Descrizione per i motori di ricerca"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Keywords</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            defaultValue="investimenti, GLG, capital group, equity pledge, token, finanziario"
                            placeholder="Parole chiave separate da virgole"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Google Analytics ID</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            defaultValue="GA-XXXXXXXXX-X"
                            placeholder="ID Google Analytics"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Design Settings */}
                    <div className={styles.websiteSection}>
                      <h4 className={styles.formTitle}>🎨 Design e Stile</h4>
                      <div className={styles.contentEditor}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Colore Primario</label>
                          <div className={styles.colorPicker}>
                            <input 
                              type="color" 
                              className={styles.colorInput} 
                              defaultValue="#3b82f6"
                            />
                            <input 
                              type="text" 
                              className={styles.formInput} 
                              defaultValue="#3b82f6"
                              placeholder="Codice colore esadecimale"
                            />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Colore Secondario</label>
                          <div className={styles.colorPicker}>
                            <input 
                              type="color" 
                              className={styles.colorInput} 
                              defaultValue="#1e293b"
                            />
                            <input 
                              type="text" 
                              className={styles.formInput} 
                              defaultValue="#1e293b"
                              placeholder="Codice colore esadecimale"
                            />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Font Principale</label>
                          <select className={styles.formInput}>
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Poppins">Poppins</option>
                            <option value="Montserrat">Montserrat</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Logo</label>
                          <div className={styles.fileUpload}>
                            <input 
                              type="file" 
                              accept="image/*"
                              className={styles.fileInput}
                            />
                            <button className={styles.uploadButton}>📁 Carica Nuovo Logo</button>
                          </div>
                          <div className={styles.currentLogo}>
                            <img src="/logo-glg.png" alt="Logo attuale" className={styles.logoPreview} />
                            <span>Logo attuale</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Management */}
                    <div className={styles.websiteSection}>
                      <h4 className={styles.formTitle}>📝 Gestione Contenuti</h4>
                      <div className={styles.contentEditor}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Sezione "Chi Siamo"</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="4"
                            defaultValue="GLG Capital Group LLC è una società di investimento innovativa e orientata ai risultati, impegnata a fornire soluzioni finanziarie su misura e strategie di crescita sostenibile per clienti privati, istituzioni e aziende."
                            placeholder="Testo della sezione Chi Siamo"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Link Sito Ufficiale</label>
                          <input 
                            type="url" 
                            className={styles.formInput} 
                            defaultValue="https://www.glgcapitalgroupllc.com/"
                            placeholder="URL del sito ufficiale"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Testo Form Invito</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="3"
                            defaultValue="I posti sono limitati. Le opportunità no."
                            placeholder="Testo del form di richiesta invito"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Messaggio di Successo</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="2"
                            defaultValue="Grazie! Ti contatteremo presto con il tuo invito riservato."
                            placeholder="Messaggio dopo invio form"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Maintenance */}
                    <div className={styles.websiteSection}>
                      <h4 className={styles.formTitle}>🔧 Manutenzione</h4>
                      <div className={styles.contentEditor}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Modalità Manutenzione</label>
                          <select className={styles.formInput}>
                            <option value="off">Disabilitata</option>
                            <option value="on">Abilitata</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Messaggio Manutenzione</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="3"
                            defaultValue="Il sito è temporaneamente in manutenzione. Torneremo presto online."
                            placeholder="Messaggio da mostrare durante la manutenzione"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>IP Esclusi dalla Manutenzione</label>
                          <textarea 
                            className={styles.formTextarea} 
                            rows="2"
                            placeholder="Un IP per riga (es. 192.168.1.1)"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Backup Automatico</label>
                          <select className={styles.formInput}>
                            <option value="daily">Giornaliero</option>
                            <option value="weekly">Settimanale</option>
                            <option value="monthly">Mensile</option>
                            <option value="off">Disabilitato</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.websiteActions}>
                    <button className={styles.saveButton} onClick={() => handleSiteAction('save')}>💾 Salva Modifiche</button>
                    <button className={styles.previewButton} onClick={() => handleSiteAction('preview')}>👁️ Anteprima</button>
                    <button className={styles.publishButton} onClick={() => handleSiteAction('publish')}>🚀 Pubblica</button>
                    <button className={styles.backupButton} onClick={() => handleSiteAction('backup')}>📦 Backup Sito</button>
                    <button className={styles.restoreButton} onClick={() => handleSiteAction('restore')}>🔄 Ripristina</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 