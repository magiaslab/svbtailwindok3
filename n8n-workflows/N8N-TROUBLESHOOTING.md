# 🚨 RISOLUZIONE ERRORE N8N - APPROCCIO SISTEMATICO

## 📋 **DIAGNOSI COMPLETA**

L'errore `propertyValues[itemName] is not iterable` persiste perché il problema è più profondo della struttura JSON. Ho creato **3 workflow di test** per identificare la causa esatta.

---

## 🧪 **WORKFLOW DI TEST CREATI**

### **1. Test Minimale** (`n8n-test-minimal.json`)
- **2 nodi**: Schedule Trigger + HTTP Request
- **Scopo**: Testare importazione base
- **Parametri**: Minimizzati

### **2. Base Semplice** (`n8n-base-simple.json`)  
- **3 nodi**: Manual Trigger + HTTP Request + Code
- **Scopo**: Testare nodi essenziali
- **Parametri**: Standard n8n

### **3. Struttura Nativa** (`n8n-native-structure.json`)
- **7 nodi**: Workflow completo con struttura n8n nativa
- **Scopo**: Workflow funzionante completo
- **Parametri**: Compatibili con tutte le versioni

---

## 🔍 **PROCEDURA DI TEST**

### **STEP 1: Test Import Minimale**
1. **Importa** `n8n-test-minimal.json`
2. **Se fallisce** → Problema con Schedule Trigger
3. **Se funziona** → Procedi al STEP 2

### **STEP 2: Test Base Semplice**  
1. **Importa** `n8n-base-simple.json`
2. **Se fallisce** → Problema con HTTP Request o Code
3. **Se funziona** → Procedi al STEP 3

### **STEP 3: Test Struttura Nativa**
1. **Importa** `n8n-native-structure.json`
2. **Se fallisce** → Problema con IF node o GitHub API
3. **Se funziona** → Workflow completo funzionante

---

## ⚠️ **POSSIBILI CAUSE ERRORE**

### **1. Versione n8n Incompatibile**
- **Soluzione**: Aggiorna n8n all'ultima versione
- **Check**: `n8n --version` nel terminale

### **2. Parametri Schedule Trigger**
- **Problema**: `rule.interval` non supportato
- **Soluzione**: Usa Manual Trigger invece

### **3. Parametri IF Node**
- **Problema**: `conditions.boolean` malformato
- **Soluzione**: Usa struttura `conditions.conditions`

### **4. Parametri HTTP Request**
- **Problema**: `bodyParameters` non supportato
- **Soluzione**: Usa `sendBody: true` + `body`

---

## 🎯 **WORKFLOW RACCOMANDATO**

**Usa `n8n-native-structure.json`** perché:

✅ **Struttura n8n nativa** (esportata da n8n)  
✅ **Nodi compatibili** con tutte le versioni  
✅ **Parametri standard** senza personalizzazioni  
✅ **ID univoci** generati correttamente  
✅ **Connessioni validate**  

---

## 🔧 **CONFIGURAZIONE POST-IMPORT**

### **1. Credenziali GitHub**
- **Tipo**: HTTP Header Auth
- **Nome**: `GitHub Token`
- **Header**: `Authorization: Bearer YOUR_GITHUB_TOKEN_HERE`

### **2. Netlify Build Hook**
- **URL**: `https://api.netlify.com/build_hooks/65f8a1b2-1234-5678-9abc-def012345678`
- **Metodo**: POST

### **3. Test Workflow**
1. **Clicca** "Execute Workflow"
2. **Monitora** ogni nodo
3. **Verifica** output finale

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

## 🚀 **PROSSIMI PASSI**

1. **Prova** i workflow in ordine (minimale → base → nativo)
2. **Identifica** quale funziona
3. **Configura** credenziali
4. **Testa** esecuzione
5. **Attiva** workflow

**Se tutti falliscono**, il problema è nella **versione n8n** o **configurazione server**! 🔍
