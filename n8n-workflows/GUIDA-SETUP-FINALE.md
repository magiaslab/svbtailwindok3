# 🏀 Guida Setup Finale - Workflow N8N Basket Stats

## 📁 **File da Importare:**
```
n8n-workflows/working/n8n-basket-final-complete.json
```

## 🔧 **Configurazione Credenziali:**

### 1. **Credenziale GitHub API:**
- **Nome**: `GitHub API`
- **Tipo**: `GitHub API`
- **Personal Access Token**: `IL_TUO_TOKEN_GITHUB`
- **Permessi richiesti**:
  - ✅ `Contents: Write`
  - ✅ `Metadata: Read`

### 2. **URL Netlify Build Hook:**
Nel nodo "🚀 Trigger Netlify Deploy", sostituisci:
```
https://api.netlify.com/build_hooks/YOUR_NETLIFY_BUILD_HOOK_ID
```

Con il tuo build hook URL da Netlify.

## 🔍 **Verifica Pre-Esecuzione:**

### ✅ **Checklist:**
- [ ] Token GitHub configurato con permessi corretti
- [ ] URL Netlify Build Hook aggiornato
- [ ] File `public/stats/stats-database.json` esiste nel repository
- [ ] Repository GitHub: `magiaslab/svbtailwindok3`

## 🚀 **Test del Workflow:**

### 1. **Test Manuale:**
1. Importa il file JSON in n8n
2. Configura le credenziali GitHub
3. Aggiorna l'URL Netlify
4. Esegui il workflow manualmente

### 2. **Verifica Output:**
- **Nodo "⚙️ Process Data"**: Dovrebbe mostrare 17+ squadre
- **Nodo "🔧 Prepare GitHub Data"**: Dovrebbe mostrare Base64 valido
- **Nodo "📤 Update GitHub Stats"**: Dovrebbe restituire commit SHA
- **Nodo "🚀 Trigger Netlify Deploy"**: Dovrebbe restituire deploy ID

## 📊 **Programmazione Automatica:**

### **Trigger Cron (opzionale):**
Per eseguire il workflow automaticamente:

1. Sostituisci il nodo "🚀 Start" con un nodo "Cron"
2. Imposta la schedulazione:
   - **Lunedì**: `0 8 * * 1` (8:00 AM)
   - **Giovedì**: `0 8 * * 4` (8:00 AM)

## 🔧 **Struttura del Workflow:**

```
🚀 Start
  ↓
🌐 Fetch PlayBasket Data (URL: PlayBasket.it)
  ↓
⚙️ Process Data (Parsing HTML con regex)
  ↓
✅ Check Quality (Verifica dati validi)
  ↓ (success)         ↓ (error)
📥 Get Current Stats  ❌ Error Handler
  ↓
🔧 Prepare GitHub Data (Crea Base64)
  ↓
📤 Update GitHub Stats (PUT API GitHub)
  ↓
🚀 Trigger Netlify Deploy (POST Netlify)
  ↓
🎉 Final Success
```

## 🐛 **Troubleshooting:**

### **Errore "content is not valid Base64":**
- Il nodo "🔧 Prepare GitHub Data" gestisce la conversione
- Verifica che il nodo riceva dati validi da "⚙️ Process Data"

### **Errore "resource not found":**
- Verifica che il file `public/stats/stats-database.json` esista
- Controlla che il repository sia `magiaslab/svbtailwindok3`

### **Errore "Forbidden":**
- Verifica permessi del token GitHub
- Assicurati che il token abbia `Contents: Write`

## 📈 **Monitoraggio:**

Il workflow include logging dettagliato:
- Console logs in ogni nodo Code
- Debug info nel nodo "🔧 Prepare GitHub Data"
- Risultato finale con dettagli commit e deploy

## 🎯 **Risultato Atteso:**

Dopo l'esecuzione corretta:
1. ✅ Dati scrapati da PlayBasket.it
2. ✅ File `stats-database.json` aggiornato su GitHub
3. ✅ Deploy Netlify triggerato
4. ✅ Sito web aggiornato con nuove statistiche

---

## 📞 **Supporto:**

Se hai problemi, controlla:
1. **Console logs** di ogni nodo
2. **Output JSON** di ogni step
3. **Credenziali** configurate correttamente
4. **URL** e **permessi** GitHub/Netlify

