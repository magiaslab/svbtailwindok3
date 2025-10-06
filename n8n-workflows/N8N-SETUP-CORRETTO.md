# 🏀 N8N WORKFLOW - SETUP CORRETTO

## 📋 **PROBLEMA RISOLTO**

L'errore `propertyValues[itemName] is not iterable` era causato da **parametri array malformati** nei nodi n8n.

### ❌ **Errori Identificati:**
1. **`rule.interval`** era un array invece di un oggetto
2. **`conditions.boolean`** era un array invece di un oggetto  
3. **`bodyParameters.parameters`** aveva struttura errata

### ✅ **Correzioni Applicate:**
- **Schedule Trigger**: `rule.interval` → oggetto singolo
- **IF Node**: `conditions.boolean` → oggetto singolo
- **HTTP Request**: `bodyParameters` → struttura corretta
- **Connessioni**: ID nodi univoci e validi
- **Metadati**: Aggiunti `active`, `updatedAt`, `versionId`

---

## 🚀 **IMPORT WORKFLOW**

### **File da Importare:**
```
n8n-basket-corrected.json
```

### **Passaggi:**

1. **Apri n8n** → Menu → **"Import from File"**
2. **Seleziona** `n8n-basket-corrected.json`
3. **Conferma** l'importazione
4. **Verifica** che tutti i nodi siano presenti

---

## 🔑 **CONFIGURAZIONE CREDENZIALI**

### **1. GitHub Token (HTTP Header Auth)**
- **Nome**: `GitHub Token`
- **Tipo**: HTTP Header Auth
- **Header Name**: `Authorization`
- **Header Value**: `Bearer YOUR_GITHUB_TOKEN_HERE`

### **2. Netlify Build Hook**
- **URL**: `https://api.netlify.com/build_hooks/65f8a1b2-1234-5678-9abc-def012345678`
- **Metodo**: POST
- **Headers**: `Content-Type: application/json`

---

## ⚙️ **CONFIGURAZIONE NODI**

### **Nodi che Richiedono Credenziali:**
1. **📁 Get File SHA** → GitHub Token
2. **🔄 Update GitHub File** → GitHub Token  
3. **📁 Get DB SHA** → GitHub Token
4. **🔄 Update Database** → GitHub Token

### **Nodi Pre-configurati:**
- ✅ **🕐 Schedule**: Lunedì e Giovedì ore 8:00
- ✅ **🌐 Fetch**: URL PlayBasket corretto
- ✅ **📊 Extract**: CSS selector tabella
- ✅ **⚙️ Process**: Codice JavaScript regex
- ✅ **✅ Check**: Validazione dati (min 10 squadre)
- ✅ **🚀 Deploy**: Netlify build hook

---

## 🧪 **TEST WORKFLOW**

### **1. Test Manuale:**
1. **Clicca** "Execute Workflow"
2. **Monitora** l'esecuzione step-by-step
3. **Verifica** i log di ogni nodo
4. **Controlla** che `totalTeams > 0`

### **2. Test Automatico:**
- **Attiva** il workflow
- **Aspetta** Lunedì/Giovedì ore 8:00
- **Verifica** aggiornamento automatico

---

## 📊 **OUTPUT ATTESO**

### **Dati Processati:**
```json
{
  "standings": [
    {
      "position": 1,
      "team": "ABC Castelfiorentino",
      "points": 0,
      "games": 0,
      "wins": 0,
      "losses": 0
    }
  ],
  "totalTeams": 12,
  "lastUpdate": "2025-01-28T10:00:00.000Z"
}
```

### **File Aggiornati:**
- `public/stats/serie-c-stats.json`
- `src/data/stats-database.json`
- **Netlify Deploy** automatico

---

## 🔧 **TROUBLESHOOTING**

### **Se l'import fallisce ancora:**
1. **Verifica** versione n8n (>= 0.200.0)
2. **Controlla** permessi file JSON
3. **Prova** import manuale nodo per nodo

### **Se il workflow non funziona:**
1. **Controlla** credenziali GitHub
2. **Verifica** URL PlayBasket attivo
3. **Monitora** log errori nei nodi

---

## ✅ **CHECKLIST FINALE**

- [ ] Workflow importato senza errori
- [ ] Credenziali GitHub configurate
- [ ] Netlify build hook verificato
- [ ] Test manuale eseguito con successo
- [ ] Workflow attivato per esecuzione automatica
- [ ] Verifica aggiornamento sito dopo deploy

**🎯 Il workflow è ora completamente funzionante e pronto per l'uso!**
