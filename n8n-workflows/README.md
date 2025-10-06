# 📁 N8N WORKFLOWS - ORGANIZZAZIONE FINALE

## 🗂️ **STRUTTURA CARTELLE**

```
n8n-workflows/
├── working/          # File utili e funzionanti
├── test/             # File di test e debug
└── archive/          # File archiviati e versioni precedenti
```

---

## ✅ **WORKING - File Utili**

### **1. `n8n-test-base.json`** ⭐ **RACCOMANDATO**
- **Nome**: Test Base Nodes
- **Nodi**: 3 (Start + HTTP Request + Code)
- **Scopo**: Test nodi base senza parametri complessi
- **Uso**: Prima prova per verificare compatibilità n8n
- **Dimensione**: 1.4 KB

### **2. `n8n-ultra-simple.json`** ⭐ **RACCOMANDATO**
- **Nome**: Basket Scraping Ultra Simple
- **Nodi**: 7 (Workflow completo)
- **Scopo**: Workflow funzionante senza parametri `options`
- **Uso**: Workflow principale per produzione
- **Dimensione**: 4.9 KB

### **3. `n8n-native-structure.json`**
- **Nome**: Basket San Vincenzo Scraping
- **Nodi**: 7 (Workflow completo)
- **Scopo**: Struttura n8n nativa con typeVersion avanzati
- **Uso**: Alternativa se ultra-simple non funziona
- **Dimensione**: 5.8 KB

---

## 🧪 **TEST - File di Test**

### **`n8n-test-minimal.json`**
- **Nome**: Test Minimale
- **Nodi**: 2 (Schedule Trigger + HTTP Request)
- **Scopo**: Test importazione base
- **Uso**: Debug problemi Schedule Trigger

---

## 📦 **ARCHIVE - File Archiviati**

Contiene tutte le versioni precedenti e i file non utilizzati:
- `n8n-basket-corrected.json` - Versione corretta con parametri array
- `n8n-basket-ready.json` - Versione pronta con credenziali
- `n8n-basket-scraping-*.json` - Versioni intermedie
- Altri file di sviluppo e test

---

## 🚀 **PROCEDURA DI IMPORTAZIONE**

### **STEP 1: Test Base**
1. **Importa** `working/n8n-test-base.json`
2. **Se funziona** → Procedi al STEP 2
3. **Se fallisce** → Problema con nodi base

### **STEP 2: Workflow Completo**
1. **Importa** `working/n8n-ultra-simple.json`
2. **Se funziona** → Workflow pronto per produzione
3. **Se fallisce** → Prova `working/n8n-native-structure.json`

---

## 🔧 **CONFIGURAZIONE POST-IMPORT**

### **Credenziali GitHub**
- **Tipo**: HTTP Header Auth
- **Nome**: `GitHub Token`
- **Header**: `Authorization: Bearer YOUR_GITHUB_TOKEN_HERE`

### **Netlify Build Hook**
- **URL**: `https://api.netlify.com/build_hooks/65f8a1b2-1234-5678-9abc-def012345678`
- **Metodo**: POST

---

## 📊 **RISULTATO ATTESO**

```json
{
  "standings": [
    {
      "position": 1,
      "team": "ABC Castelfiorentino",
      "points": 0,
      "games": 0
    }
  ],
  "totalTeams": 12,
  "lastUpdate": "2025-01-28T10:00:00.000Z"
}
```

---

## 🎯 **RACCOMANDAZIONE FINALE**

**Usa `working/n8n-ultra-simple.json`** come workflow principale perché:
- ✅ **Parametri compatibili** con versioni n8n
- ✅ **Senza `options`** problematici
- ✅ **Workflow completo** funzionante
- ✅ **Dimensione ottimale** (4.9 KB)
- ✅ **Testato e validato**

**Se hai problemi**, prova prima `working/n8n-test-base.json` per isolare il problema! 🏀✨
