# 📦 GESTIONE PACCHETTI - GLG Capital Group DApp

## 🎯 **PANORAMICA**

Questo documento spiega come gestire i pacchetti nel progetto GLG Capital Group DApp.

---

## 📁 **FILE PRINCIPALI**

### 📄 **package.json**
- **Posizione:** Root del progetto
- **Funzione:** Configurazione pacchetti e script
- **Contenuto:** Dependencies, devDependencies, scripts

### 📄 **package-lock.json**
- **Posizione:** Root del progetto  
- **Funzione:** Lock delle versioni esatte
- **Nota:** Non modificare manualmente

---

## 🔧 **COMANDI PRINCIPALI**

### 📥 **Installazione**
```bash
# Installare tutti i pacchetti
npm install

# Installare pacchetto specifico
npm install nome-pacchetto

# Installare pacchetto di sviluppo
npm install --save-dev nome-pacchetto

# Installare versione specifica
npm install nome-pacchetto@versione
```

### 📤 **Rimozione**
```bash
# Rimuovere pacchetto
npm uninstall nome-pacchetto

# Rimuovere pacchetto di sviluppo
npm uninstall --save-dev nome-pacchetto
```

### 🔄 **Aggiornamento**
```bash
# Aggiornare tutti i pacchetti
npm update

# Aggiornare pacchetto specifico
npm update nome-pacchetto

# Aggiornare a versione specifica
npm install nome-pacchetto@versione
```

### 🔍 **Informazioni**
```bash
# Lista pacchetti installati
npm list

# Informazioni pacchetto
npm info nome-pacchetto

# Vulnerabilità
npm audit

# Fix vulnerabilità
npm audit fix
```

---

## 📋 **PACCHETTI ATTUALI**

### 🚀 **Dependencies (Produzione)**

| Pacchetto | Versione | Descrizione |
|-----------|----------|-------------|
| **next** | 13.4.19 | Framework React per SSR |
| **react** | 18.2.0 | Libreria UI React |
| **react-dom** | 18.2.0 | DOM rendering React |
| **sqlite3** | ^5.1.7 | Database SQLite |
| **multer** | ^2.0.1 | Upload file middleware |
| **chart.js** | ^4.4.0 | Libreria grafici |
| **react-chartjs-2** | ^5.2.0 | Wrapper React per Chart.js |
| **uuid** | ^11.1.0 | Generazione ID univoci |
| **moment** | ^2.29.4 | Gestione date avanzata |
| **react-toastify** | ^9.1.3 | Notifiche toast |
| **react-icons** | ^4.12.0 | Icone React |
| **framer-motion** | ^10.16.4 | Animazioni avanzate |
| **xlsx** | ^0.18.5 | Gestione file Excel |
| **jspdf** | ^2.5.1 | Generazione PDF |

### 🛠️ **DevDependencies (Sviluppo)**

| Pacchetto | Versione | Descrizione |
|-----------|----------|-------------|
| **eslint** | 8.45.0 | Linter JavaScript |
| **eslint-config-next** | 13.4.19 | Config ESLint Next.js |
| **prettier** | ^3.0.3 | Formattazione codice |
| **jest** | ^29.7.0 | Framework testing |
| **@testing-library/react** | ^13.4.0 | Testing React components |

---

## 🎯 **SCRIPTS DISPONIBILI**

### 📜 **Script nel package.json:**

```json
{
  "scripts": {
    "dev": "next dev",           // Avvia server sviluppo
    "build": "next build",       // Build produzione
    "start": "next start",       // Avvia server produzione
    "lint": "next lint",         // Controllo codice
    "test": "jest",              // Esegue test
    "format": "prettier --write ." // Formatta codice
  }
}
```

### 🚀 **Come Usare gli Script:**

```bash
# Sviluppo
npm run dev

# Build produzione
npm run build

# Avvia produzione
npm run start

# Linting
npm run lint

# Testing
npm run test

# Formattazione
npm run format
```

---

## 📦 **PACCHETTI CONSIGLIATI PER AGGIUNTE**

### 🎨 **UI/UX**
```bash
# Componenti UI avanzati
npm install @headlessui/react

# Gestione temi
npm install @emotion/react @emotion/styled

# Loading states
npm install react-loading-skeleton

# Modali avanzati
npm install react-modal
```

### 📊 **Analytics e Grafici**
```bash
# Grafici avanzati
npm install recharts

# Dashboard components
npm install @nivo/core @nivo/line @nivo/bar

# Data visualization
npm install d3
```

### 🔐 **Sicurezza**
```bash
# Validazione input
npm install joi

# Sanitizzazione HTML
npm install dompurify

# Criptografia
npm install crypto-js
```

### 📱 **Mobile e PWA**
```bash
# PWA support
npm install next-pwa

# Service workers
npm install workbox-webpack-plugin

# Mobile detection
npm install react-device-detect
```

### 🌐 **Internazionalizzazione**
```bash
# Multi-lingua
npm install next-i18next

# Date formatting
npm install date-fns
```

---

## ⚠️ **BEST PRACTICES**

### ✅ **Cosa Fare:**
- ✅ Usare `npm install` per aggiungere pacchetti
- ✅ Specificare versioni esatte per pacchetti critici
- ✅ Mantenere aggiornati i pacchetti di sicurezza
- ✅ Usare `--save-dev` per pacchetti di sviluppo
- ✅ Documentare pacchetti aggiunti

### ❌ **Cosa NON Fare:**
- ❌ Modificare manualmente `package-lock.json`
- ❌ Usare versioni troppo recenti senza testare
- ❌ Installare pacchetti non necessari
- ❌ Ignorare vulnerabilità di sicurezza

---

## 🔍 **TROUBLESHOOTING**

### 🚨 **Problemi Comuni:**

#### **Errore di Versione**
```bash
# Rimuovere node_modules e reinstallare
rm -rf node_modules package-lock.json
npm install
```

#### **Conflitti di Dipendenze**
```bash
# Forzare risoluzione
npm install --force

# Oppure
npm install --legacy-peer-deps
```

#### **Pacchetti Corrotti**
```bash
# Pulire cache npm
npm cache clean --force

# Reinstallare
npm install
```

---

## 📈 **MONITORAGGIO**

### 🔍 **Comandi Utili:**
```bash
# Controllare vulnerabilità
npm audit

# Vedere dipendenze obsolete
npm outdated

# Analizzare bundle size
npm install --save-dev webpack-bundle-analyzer
```

---

## 🎯 **CONCLUSIONI**

La gestione dei pacchetti è fondamentale per mantenere il progetto:
- 🔒 **Sicuro** (aggiornamenti sicurezza)
- ⚡ **Performante** (pacchetti ottimizzati)
- 🛠️ **Manutenibile** (versioni controllate)
- 📈 **Scalabile** (dipendenze organizzate)

**Ricorda:** Sempre testare dopo aggiunta/aggiornamento pacchetti!

---

*Documento aggiornato il: ${new Date().toLocaleDateString('it-IT')}*
*Versione: 1.0.0* 