# 🏀 Workflow N8N - PRODUCTION READY

## 📁 **File da Importare:**
```
n8n-workflows/working/n8n-basket-production-ready.json
```

## 🎯 **Caratteristiche Principali:**

### ⏰ **Trigger Automatico:**
- **Schedulazione**: Lunedì e Giovedì alle 8:00 AM
- **Cron Expression**: `0 8 * * 1,4`
- **Timezone**: Locale del server n8n

### 🔄 **Flusso Completo:**
1. **⏰ Cron Schedule** → Trigger automatico
2. **🌐 Fetch PlayBasket Data** → Scarica HTML
3. **⚙️ Process Data** → Parsing con regex robuste
4. **✅ Check Quality** → Verifica validità dati
5. **📥 Get Current Stats** → Recupera SHA da GitHub
6. **🔧 Prepare GitHub Data** → Converte in Base64
7. **📤 Update GitHub Stats** → Aggiorna repository
8. **🚀 Trigger Netlify Deploy** → Triggera build
9. **🔍 Verify Netlify Deploy** → Verifica successo deploy
10. **🎉 Final Success** → Risultato finale

## 🔧 **Configurazione Richiesta:**

### 1. **Credenziali GitHub:**
- **Nome**: `GitHub API`
- **Token**: Il tuo Personal Access Token
- **Permessi**: `Contents: Write`, `Metadata: Read`

### 2. **URL Netlify (già configurato):**
```
https://api.netlify.com/build_hooks/68d8f925792a5800aecc4fa4
```

## 📊 **Funzionalità Avanzate:**

### ✅ **Debug Completo:**
- Log dettagliati in ogni nodo
- Verifica struttura dati input
- Controllo qualità output
- Monitoraggio deploy Netlify

### 🔍 **Verifica Deploy:**
- Controllo response Netlify
- Validazione Deploy ID
- URL diretto al deploy dashboard
- Status success/failure

### 🎯 **Gestione Errori:**
- Fallback per dati non validi
- Troubleshooting automatico
- Suggerimenti di risoluzione
- Log dettagliati errori

## 🚀 **Esecuzione Automatica:**

### **Prossime Esecuzioni:**
- **Lunedì** alle 8:00 AM
- **Giovedì** alle 8:00 AM

### **Cosa Succede:**
1. ✅ Scraping automatico delle classifiche
2. ✅ Aggiornamento file GitHub
3. ✅ Trigger deploy Netlify
4. ✅ Sito web aggiornato automaticamente

## 📈 **Monitoraggio:**

### **Log da Controllare:**
- **⚙️ Process Data**: Numero squadre trovate
- **🔧 Prepare GitHub Data**: Dimensione dati
- **🔍 Verify Netlify Deploy**: Status deploy
- **🎉 Final Success**: Riepilogo completo

### **Metriche Importanti:**
- Numero squadre processate (target: 17+)
- Posizione Basket San Vincenzo
- GitHub commit SHA
- Netlify deploy ID
- Timestamp aggiornamento

## 🔧 **Troubleshooting:**

### **Se il Workflow Fallisce:**
1. Controlla i log del nodo che ha fallito
2. Verifica connessione a PlayBasket.it
3. Controlla credenziali GitHub
4. Verifica Build Hook Netlify

### **Deploy Non Parte:**
1. Vai su Netlify → Site → Deploys
2. Controlla se appare nuovo deploy
3. Verifica Build Hook attivo
4. Controlla log "🔍 Verify Netlify Deploy"

## 🎉 **Risultato Atteso:**

Dopo ogni esecuzione automatica:
- ✅ **Classifiche aggiornate** sul sito web
- ✅ **Posizione Basket San Vincenzo** corretta
- ✅ **Statistiche complete** di tutte le squadre
- ✅ **Timestamp ultimo aggiornamento** aggiornato

---

## 📞 **Supporto:**

Il workflow è completamente autonomo e non richiede intervento manuale. In caso di problemi, controlla:

1. **Execution History** in n8n
2. **Console logs** dei nodi
3. **GitHub commits** nel repository
4. **Netlify deploys** nel dashboard

Il sistema è ora **PRODUCTION READY** e funzionerà automaticamente! 🚀

