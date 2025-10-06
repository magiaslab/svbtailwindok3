# 🚀 Setup Veloce N8N - Basket San Vincenzo

## 📥 **1. Importa il Workflow**

1. **Scarica**: `n8n-basket-ready.json`
2. **N8N** → **Import from file** → Seleziona il file
3. **Il workflow è già configurato** con tutti i valori!

---

## 🔑 **2. Crea Solo 1 Credenziale**

### **Credenziale GitHub:**
1. **N8N** → **Credentials** → **Add Credential**
2. **Cerca** → **HTTP Header Auth**
3. **Configura**:
   - **Name**: `GitHub Auth`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer YOUR_GITHUB_TOKEN_HERE`
4. **Salva**

---

## 🔧 **3. Configura Netlify (Solo 1 Modifica)**

1. **Apri il workflow importato**
2. **Clicca sul nodo** `🚀 Netlify Deploy`
3. **Modifica l'URL**:
   - **Da**: `INSERISCI_QUI_IL_TUO_NETLIFY_BUILD_HOOK`
   - **A**: Il tuo Netlify build hook URL
4. **Salva il workflow**

### **Come ottenere Netlify Build Hook:**
1. **Netlify Dashboard** → Il tuo sito → **Site settings**
2. **Build & deploy** → **Build hooks**
3. **Add build hook**:
   - **Name**: `N8N Basketball Scraper`
   - **Branch**: `master`
4. **Copia l'URL** generato

---

## ✅ **4. Test del Workflow**

1. **Clicca** `Execute Workflow`
2. **Verifica** che tutti i nodi si completino ✅
3. **Controlla GitHub** che i file si aggiornino
4. **Verifica Netlify** che il deploy si attivi

---

## 🕐 **5. Attiva Programmazione Automatica**

1. **Workflow** → **Settings** → **Active**: `ON`
2. **Il workflow si eseguirà**:
   - **Lunedì alle 8:00** (dopo partite weekend)
   - **Giovedì alle 8:00** (dopo partite infrasettimanali)

---

## 🎯 **Cosa Fa il Workflow**

1. **🌐 Scarica** la pagina PlayBasket.it
2. **📊 Estrae** la tabella classifiche HTML
3. **⚙️ Processa** i dati delle squadre
4. **✅ Valida** che ci siano almeno 10 squadre
5. **📁 Ottiene** SHA dei file GitHub esistenti
6. **🔄 Aggiorna** `serie-c-stats.json` su GitHub
7. **🔄 Aggiorna** `stats-database.json` su GitHub
8. **🚀 Triggera** rebuild Netlify

---

## 🏆 **Risultato**

Le classifiche si aggiorneranno automaticamente sul sito ogni Lunedì e Giovedì alle 8:00! 

**URL Sito**: https://basketsanvincenzo.netlify.app

---

## 🚨 **Troubleshooting**

### **Errore "Buffer is not defined"**
Se ottieni questo errore, sostituisci nei nodi GitHub:
```javascript
Buffer.from(...).toString('base64')
```
Con:
```javascript
btoa(JSON.stringify(...))
```

### **Errore 404 GitHub**
Verifica che:
- La credenziale `GitHub Auth` sia configurata correttamente
- Il repository `magiaslab/svbtailwindok3` esista
- I file `public/stats/serie-c-stats.json` e `public/stats/stats-database.json` esistano

### **Errore Netlify**
Verifica che:
- L'URL del build hook sia corretto e completo
- Il build hook sia attivo su Netlify

---

**🎉 Setup completato in 5 minuti!**
