# ✅ Checklist Deploy - Token Investment dApp

## 📋 Prima di iniziare
- [ ] Hai un account GitHub
- [ ] Hai un account Vercel (gratuito)
- [ ] Hai un account Render (gratuito)
- [ ] Node.js installato (versione 16+)

## 🚀 Deploy Step-by-Step

### Step 1: GitHub Repository
- [ ] Crea nuova repo su GitHub: `token-invest-dapp`
- [ ] Esegui questi comandi dalla root del progetto:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/TUO-USERNAME/token-invest-dapp.git
  git push -u origin main
  ```

### Step 2: Backend su Render
- [ ] Vai su [render.com](https://render.com)
- [ ] Registrati con GitHub
- [ ] Clicca "New" → "Web Service"
- [ ] Seleziona la repo `token-invest-dapp`
- [ ] Seleziona la repo `token-invest-dapp`
- [ ] Configura:
  - **Name**: `token-invest-backend`
  - **Root Directory**: `backend`
  - **Runtime**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `node server.js`
- [ ] Clicca "Create Web Service"
- [ ] Copia l'URL del backend (es: `https://token-invest-backend.onrender.com`)

### Step 3: Frontend su Vercel
- [ ] Vai su [vercel.com](https://vercel.com)
- [ ] Registrati con GitHub
- [ ] Clicca "New Project"
- [ ] Seleziona la repo `token-invest-dapp`
- [ ] Configura:
  - **Framework Preset**: Create React App
  - **Root Directory**: `frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `build`
- [ ] Aggiungi variabile d'ambiente:
  - **Name**: `REACT_APP_BACKEND_URL`
  - **Value**: `https://token-invest-backend.onrender.com` (URL del backend)
- [ ] Clicca "Deploy"
- [ ] Copia l'URL del frontend (es: `https://token-invest-dapp.vercel.app`)

### Step 4: Aggiorna CORS
- [ ] Modifica `backend/server.js`:
  ```javascript
  app.use(cors({
    origin: 'https://token-invest-dapp.vercel.app' // URL del frontend
  }));
  ```
- [ ] Pusha le modifiche:
  ```bash
  git add .
  git commit -m "Update CORS"
  git push
  ```

## 🧪 Test dell'applicazione
- [ ] Apri l'URL del frontend
- [ ] Inserisci un wallet (es: `0x1234...`)
- [ ] Fai un investimento (importo: 100, lock: 12 mesi)
- [ ] Clicca "Visualizza Portfolio"
- [ ] Verifica che l'investimento appaia nella tabella

## 🔧 Se qualcosa non funziona

### Backend non risponde
- [ ] Controlla i log su Render
- [ ] Verifica che il comando di start sia `node server.js`
- [ ] Controlla che la porta sia configurata per Render

### CORS errors
- [ ] Verifica che l'URL del frontend in CORS sia corretto
- [ ] Controlla che il backend sia deployato e funzionante

### Frontend non si connette
- [ ] Verifica la variabile d'ambiente `REACT_APP_BACKEND_URL`
- [ ] Controlla che il backend sia raggiungibile

## 📞 Supporto
Se hai problemi:
1. Controlla i log su Render e Vercel
2. Verifica che tutti gli URL siano corretti
3. Assicurati che le variabili d'ambiente siano configurate
4. Controlla che il codice sia pushato su GitHub

## 🎉 Successo!
Se tutto funziona:
- [ ] La tua dApp è online!
- [ ] Condividi l'URL del frontend
- [ ] Il backend è sempre attivo su Render
- [ ] Puoi continuare a sviluppare e fare push automatico 