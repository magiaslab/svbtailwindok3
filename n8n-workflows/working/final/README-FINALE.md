# 🏀 Basket Stats N8N - VERSIONE FINALE

## 📁 **Workflow Finali Organizzati**

Questa cartella contiene i **3 workflow definitivi** per il sistema di scraping delle statistiche di basket.

### 🔢 **Ordine di Utilizzo**

#### **01 - Test Connessione** 
**File**: `01-test-connection.json`
- 🎯 **Scopo**: Verifica connessione a PlayBasket.it
- ▶️ **Trigger**: Manuale
- ✅ **Usa questo PRIMA** di tutto per verificare che la connessione funzioni
- 📊 **Output atteso**: `overall.success: true` con numero squadre > 5

#### **02 - Workflow Principale** ❌ **DEPRECATO**
**File**: `02-basket-stats-main.json`
- ❌ **PROBLEMA**: Mapping celle sbagliato
- 🚫 **NON USARE** - dati incorretti

#### **05 - Workflow Principale CORRETTO** ✅ **RACCOMANDATO**
**File**: `05-basket-stats-corrected.json`
- 🎯 **Scopo**: Scraping automatico con dati corretti
- ⏰ **Trigger**: Automatico (Lunedì/Giovedì alle 8:00)
- 🔄 **Funzioni**: Scraping → GitHub → Netlify Deploy
- ✅ **MAPPING CELLE CORRETTO**: Punti reali, link corretti
- ⚠️ **ATTIVA SOLO** dopo aver testato con 01, 03 e 04

#### **03 - Test Manuale**
**File**: `03-test-manual.json`
- 🎯 **Scopo**: Test completo senza schedule
- ▶️ **Trigger**: Manuale
- 🧪 **Usa questo** per testare la logica completa prima di attivare il workflow principale
- 📊 **Output atteso**: `success: true` e `qualityCheck.passed: true`

#### **04 - Debug Celle** 🔍
**File**: `04-debug-cells.json`
- 🎯 **Scopo**: Debug dettagliato delle celle HTML
- ▶️ **Trigger**: Manuale
- 🐛 **Usa questo** se i dati sono sbagliati per vedere cosa c'è nelle celle
- 📊 **Mostra**: Contenuto raw HTML di ogni cella

## 🚀 **Procedura di Installazione**

### Passo 1: Test Base
1. Importa `01-test-connection.json`
2. Eseguilo manualmente
3. Verifica: `overall.success: true`

### Passo 2: Test Completo
1. Importa `03-test-manual.json`
2. Eseguilo manualmente
3. Verifica: `success: true` e `qualityCheck.passed: true`

### Passo 3: Debug (Se Necessario)
1. Se i dati sono sbagliati, importa `04-debug-cells.json`
2. Eseguilo per vedere il contenuto delle celle HTML
3. Verifica che i dati siano nella posizione corretta

### Passo 4: Attivazione
1. **SOLO se tutti i test passano**, importa `05-basket-stats-corrected.json`
2. Attiva il workflow
3. Monitoraggio automatico ogni Lunedì e Giovedì

## ⚙️ **Configurazione Richiesta**

### GitHub Token
Il token è già incluso nei workflow:
```
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
```

### Netlify Build Hook
L'URL è già configurato:
```
https://api.netlify.com/build_hooks/66f7e9c6e0b7a7b8c9d0e1f2
```

### Repository GitHub
```
magiaslab/svbtailwindok3
```

## 🔧 **Troubleshooting**

### Test 01 Fallisce
- Verifica connessione internet
- Controlla che PlayBasket.it sia online
- Verifica che l'URL sia corretto

### Test 03 Fallisce
- Esegui prima il test 01
- Controlla i log del nodo "Test Complete Logic"
- Verifica che `teamsFound > 5`

### Workflow 02 Non Funziona
- **NON attivare** se i test 01 e 03 non passano
- Controlla i log di ogni nodo
- Verifica le credenziali GitHub e Netlify

## 📊 **Monitoraggio**

### Logs Importanti
- **Connection**: Verifica accesso HTML
- **Parsing**: Controlla squadre trovate
- **Quality Check**: Soglia minima 5 squadre
- **GitHub**: Aggiornamento file JSON
- **Netlify**: Deploy del sito

### Frequenza Aggiornamenti
- **Automatico**: Lunedì e Giovedì alle 8:00
- **Manuale**: Esegui workflow 03 quando necessario

## 🎯 **Risultato Finale**

Una volta attivato il workflow 02:
- ✅ Scraping automatico 2 volte a settimana
- ✅ Aggiornamento file `src/data/stats/serie-c-stats.json`
- ✅ Commit automatico su GitHub
- ✅ Deploy automatico Netlify
- ✅ Statistiche sempre aggiornate sul sito

**Sistema completamente automatizzato! 🚀**
