# 🚀 Setup Netlify Build Hook

## 📋 Come Ottenere il Build Hook ID

### 1. Accedi a Netlify
1. Vai su [Netlify Dashboard](https://app.netlify.com/)
2. Seleziona il tuo sito `svbtailwindok3`

### 2. Crea Build Hook
1. Vai su **Site settings** → **Build & deploy**
2. Scorri fino a **Build hooks**
3. Clicca **Add build hook**
4. Configura:
   - **Hook name**: `N8N Auto Stats Update`
   - **Branch to build**: `master`
5. Clicca **Save**

### 3. Copia l'URL
Netlify ti darà un URL come:
```
https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

### 4. Aggiorna il Workflow
Nel workflow `n8n-basket-complete-dynamic.json`, sostituisci:

```javascript
// PRIMA:
"url": "https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID"

// DOPO (con il tuo ID reale):
"url": "https://api.netlify.com/build_hooks/67abc123def456789"
```

## 🧪 Test del Build Hook

### Test Manuale
```bash
curl -X POST https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

Se funziona, vedrai:
- Risposta HTTP 200
- Nuovo deploy nella dashboard Netlify

### Test in N8N
1. Importa il workflow completo
2. Configura credenziali GitHub
3. Aggiorna Build Hook URL
4. Esegui manualmente per testare

## 📊 Monitoraggio Deploy

### Dashboard Netlify
1. Vai su **Deploys** nel tuo sito
2. Vedrai i deploy con nome "Triggered by hook"
3. Controlla i log per eventuali errori

### Tempi Tipici
- **Trigger**: Immediato (< 5 secondi)
- **Build**: 2-5 minuti
- **Deploy**: 30-60 secondi
- **Totale**: 3-7 minuti

## ⚠️ Troubleshooting

### Build Hook Non Funziona
1. **Verifica URL**: Controlla che l'ID sia corretto
2. **Controlla Permissions**: Il build hook deve essere attivo
3. **Test Manuale**: Usa curl per testare direttamente

### Deploy Fallisce
1. **Controlla Logs**: Vai su Netlify → Deploys → Log specifico
2. **Errori Build**: Spesso sono errori TypeScript o dipendenze
3. **File Mancanti**: Verifica che tutti i file siano su GitHub

### Deploy Lento
1. **Cache Issues**: Netlify potrebbe avere cache attiva
2. **Build Optimization**: Controlla `netlify.toml` per ottimizzazioni
3. **Dependencies**: Verifica che `package-lock.json` sia aggiornato

## 🎯 Workflow Completo

Una volta configurato il Build Hook, il workflow farà:

1. **8:00 AM Lunedì/Giovedì**: Trigger automatico
2. **Scraping**: Estrae dati da PlayBasket.it
3. **Parsing**: Processa 17 squadre con statistiche
4. **GitHub Update**: Aggiorna `serie-c-stats.json` e `stats-data.ts`
5. **Netlify Deploy**: Trigger automatico del build
6. **Sito Aggiornato**: Statistiche live in 3-7 minuti

## 🔄 Monitoraggio Continuo

### Log N8N
- Controlla esecuzioni in N8N dashboard
- Verifica messaggi di successo/errore

### Netlify Dashboard
- Monitora deploy automatici
- Controlla performance e tempi

### Sito Web
- Verifica che le statistiche si aggiornino
- Controlla timestamp ultimo aggiornamento

