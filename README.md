# GLG Capital Group - Token Investment DApp

Una piattaforma di investimento moderna e professionale per GLG Capital Group LLC.

## 🚀 Deployment

### Opzione 1: Vercel (Raccomandato)

1. **Installa Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Oppure deploy da GitHub:**
   - Vai su [vercel.com](https://vercel.com)
   - Connetti il tuo account GitHub
   - Seleziona questo repository
   - Clicca "Deploy"

### Opzione 2: Netlify

1. **Build del progetto:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Vai su [netlify.com](https://netlify.com)
   - Drag & drop la cartella `.next`
   - Configura il dominio

### Opzione 3: Railway

1. **Installa Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

## 🛠️ Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Avvia server di produzione
npm start
```

## 🔧 Configurazione

### Variabili d'Ambiente

Crea un file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GLG_EMAIL=admin@glg.com
NEXT_PUBLIC_GLG_PASSWORD=GLGadmin2024!
```

### Credenziali Superadmin

- **Email:** admin@glg.com
- **Password:** GLGadmin2024!

## 📁 Struttura del Progetto

```
token-invest-dapp/
├── pages/                 # Pagine Next.js
│   ├── index.js          # Homepage
│   ├── login.js          # Pagina login
│   ├── register.js       # Pagina registrazione
│   └── dashboard.js      # Dashboard principale
├── styles/               # CSS Modules
├── public/               # Asset statici
└── package.json          # Dipendenze
```

## 🎯 Funzionalità

### Per Utenti
- ✅ Registrazione e login
- ✅ Dashboard personale
- ✅ Sistema KYC completo
- ✅ Gestione investimenti
- ✅ Pagamenti con GLG Token
- ✅ Supporto AI 24/7

### Per Superadmin
- ✅ Gestione pacchetti investimento
- ✅ Gestione clienti
- ✅ Approvazione KYC
- ✅ Statistiche sistema
- ✅ Gestione sito web
- ✅ Log e monitoraggio

## 🔒 Sicurezza

- Autenticazione sicura
- Validazione input
- Headers di sicurezza
- Protezione CSRF
- Crittografia dati sensibili

## 📱 Responsive Design

Il sito è completamente responsive e ottimizzato per:
- Desktop
- Tablet
- Mobile

## 🌐 Browser Supportati

- Chrome (raccomandato)
- Firefox
- Safari
- Edge

## 📞 Supporto

Per supporto tecnico:
- Email: support@glgcapitalgroupllc.com
- Telefono: +1 (555) 123-4567

## 📄 Licenza

© 2024 GLG Capital Group LLC. Tutti i diritti riservati. 