# 🏀 Sistema Automatico Statistiche Basket San Vincenzo

## 📋 Panoramica

Questo sistema aggiorna automaticamente le statistiche delle squadre SVB estraendole da PlayBasket.it e altri siti ufficiali ogni 6 ore.

## 🚀 Come Funziona

### 1. **GitHub Actions Workflow**
- **Esecuzione automatica**: Ogni 6 ore (00:00, 06:00, 12:00, 18:00 UTC)
- **Esecuzione manuale**: Dal tab Actions di GitHub
- **Trigger automatico**: Quando vengono modificati script o dati

### 2. **Scraping con Puppeteer**
- **Browser headless**: Esegue senza interfaccia grafica
- **Estrazione dati**: Classifica, statistiche squadre, risultati
- **Gestione errori**: Fallback automatico se lo scraping fallisce

### 3. **Salvataggio Dati**
- **File JSON**: Statistiche complete e separate per categoria
- **Backup automatici**: Con timestamp per sicurezza
- **Directory strutturate**: Organizzazione logica dei dati

## 📁 Struttura File

```
scripts/
├── scrape-stats.js          # Script principale di scraping
├── README.md                # Questa documentazione
└── utils/                   # Utility e helper (futuro)

src/data/stats/
├── stats-config.json        # Configurazione competizioni
├── stats-database.json      # Database completo statistiche
├── serie-c-stats.json       # Statistiche Serie C
├── under17-stats.json       # Statistiche Under 17
├── under13-stats.json       # Statistiche Under 13
└── backup/                  # Backup con timestamp
    ├── stats-backup-2025-01-27T10-00-00Z.json
    └── ...
```

## ⚙️ Configurazione

### **Secrets GitHub (Obbligatori)**
```bash
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@email.com
GOOGLE_PRIVATE_KEY=your_private_key
```

### **Configurazione Competizioni**
Modifica `src/data/stats/stats-config.json` per:
- Abilitare/disabilitare competizioni
- Aggiornare URL delle pagine
- Modificare frequenza di aggiornamento

## 🔧 Utilizzo

### **Esecuzione Locale**
```bash
# Installa dipendenze
npm install puppeteer google-spreadsheet dotenv

# Esegui scraping
node scripts/scrape-stats.js
```

### **Esecuzione GitHub Actions**
1. Vai su GitHub → Repository → Actions
2. Seleziona "📊 Aggiorna Statistiche Basket"
3. Clicca "Run workflow"
4. Scegli branch e opzioni

## 📊 Dati Estratti

### **Serie C Maschile Toscana**
- **Classifica**: Posizione, punti, partite giocate
- **Statistiche squadre**: Vittorie, sconfitte, percentuale
- **Punti**: Fatti, subiti, media per partita
- **Streak**: Serie di vittorie/sconfitte
- **Qualità**: Indicatori performance

### **Under 17 e Under 13**
- Simili a Serie C (quando abilitati)
- Statistiche specifiche per categoria giovanile

## 🛡️ Sicurezza e Robustezza

### **Gestione Errori**
- **Timeout**: 30 secondi per caricamento pagina
- **Fallback**: Carica dati esistenti se scraping fallisce
- **Retry**: Tentativi multipli per operazioni critiche

### **Backup e Versioning**
- **Backup automatici**: Ogni esecuzione con timestamp
- **Versioning Git**: Commit automatici per ogni aggiornamento
- **Rollback**: Possibilità di tornare a versioni precedenti

## 📈 Monitoraggio

### **Log GitHub Actions**
- **Successo**: Statistiche aggiornate correttamente
- **Errori**: Dettagli problemi e fallback
- **Performance**: Tempo di esecuzione e risorse

### **Notifiche (Futuro)**
- **Telegram Bot**: Notifiche immediate
- **Email**: Report periodici
- **Discord**: Integrazione con server community

## 🔮 Sviluppi Futuri

### **Fase 2: Estensione Funzionalità**
- [ ] Scraping risultati partite
- [ ] Statistiche giocatori individuali
- [ ] Integrazione con altri siti sportivi
- [ ] API REST per accesso esterno

### **Fase 3: Dashboard e Analytics**
- [ ] Dashboard amministrativa
- [ ] Grafici trend performance
- [ ] Confronti storici
- [ ] Predizioni e analisi

### **Fase 4: Integrazione Avanzata**
- [ ] Webhook per aggiornamenti real-time
- [ ] Integrazione con sistemi esterni
- [ ] Machine learning per previsioni
- [ ] App mobile per notifiche

## 🆘 Troubleshooting

### **Problemi Comuni**

#### **1. Scraping Fallisce**
```bash
# Verifica URL
curl -I "https://www.playbasket.it/toscana/league.php?lt=2&lf=M&lr=TO&lp=FI&lc=C%2FM&season=2026&lg=1&mod=st"

# Controlla log GitHub Actions
# Verifica se il sito ha cambiato struttura
```

#### **2. Dati Non Aggiornati**
```bash
# Forza aggiornamento manuale
# Verifica secrets GitHub
# Controlla permessi repository
```

#### **3. Errori Browser**
```bash
# Aggiorna Puppeteer
npm update puppeteer

# Verifica compatibilità Node.js
node --version  # Richiede Node.js 18+
```

## 📞 Supporto

- **Issues**: Crea issue su GitHub per bug
- **Discussions**: Usa Discussions per domande
- **Wiki**: Documentazione estesa (futuro)

## 📄 Licenza

Questo progetto è parte di Basket San Vincenzo e segue le stesse licenze del repository principale.

---

**Ultimo aggiornamento**: 27 Gennaio 2025  
**Versione**: 1.0.0  
**Mantenuto da**: Team SVB Development
