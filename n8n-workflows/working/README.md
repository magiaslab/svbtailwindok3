# 🏀 N8N Workflows per Scraping Basket

## 📁 Workflow Disponibili

### 🔍 Debug e Test

1. **`n8n-basket-debug-fixed.json`**
   - Workflow di debug per identificare problemi nel parsing HTML
   - Testa diversi metodi di accesso ai dati N8N
   - Include logging dettagliato per troubleshooting

2. **`n8n-basket-data-inspector.json`**
   - Ispettore della struttura dati ricevuti dall'HTTP Request
   - Utile per capire come N8N organizza i dati
   - Mostra tutte le proprietà disponibili

### ⚙️ Workflow Funzionanti

3. **`n8n-basket-corrected-parsing.json`** ⭐ **RACCOMANDATO PER TEST**
   - Workflow con parsing HTML corretto e mapping dati accurato
   - Risolve i problemi di estrazione dei valori nell'ordine corretto
   - Include controllo qualità dei dati

4. **`n8n-basket-test-update-fixed-sha.json`** ✅ **TESTATO E FUNZIONANTE**
   - Workflow di test per aggiornare solo il file `serie-c-stats.json`
   - SHA corretto e aggiornato
   - **RACCOMANDATO**: Testato con successo il 28/09/2025

5. **`n8n-basket-dynamic-sha.json`** 🔄 **SHA AUTOMATICO**
   - Recupera automaticamente l'SHA corrente del file
   - Non richiede aggiornamenti manuali
   - Perfetto per uso continuativo

6. **`n8n-basket-complete-dynamic-fixed.json`** 🚀 **WORKFLOW COMPLETO FINALE**
   - Workflow completo con SHA dinamico + parsing corretto + GitHub + Netlify
   - Schedulato per Lunedì e Giovedì alle 8:00 AM
   - Aggiorna sia `serie-c-stats.json` che `stats-data.ts`
   - Accesso corretto ai dati multipli (HTML + 2 SHA)
   - Include gestione errori e logging completo
   - **RACCOMANDATO PER PRODUZIONE**

## 🚀 Come Usare

### 1. Import del Workflow
1. Apri N8N
2. Vai su "Workflows" → "Import from File"
3. Seleziona il file JSON desiderato
4. Clicca "Import"

### 2. Test del Parsing
Per testare se il parsing funziona:
1. Importa `n8n-basket-corrected-parsing.json`
2. Esegui manualmente il workflow
3. Controlla l'output del nodo "⚙️ Parse Data Corrected"

### 3. Test Aggiornamento GitHub
Per testare l'aggiornamento su GitHub:
1. Importa `n8n-basket-test-update.json`
2. Configura le credenziali GitHub (Header Auth con token)
3. Esegui manualmente per testare parsing + GitHub update

### 4. Setup Completo
Per il workflow completo:
1. Importa `n8n-basket-complete-final.json`
2. Configura le credenziali GitHub (Header Auth con token)
3. Aggiorna l'URL del Netlify Build Hook
4. Testa manualmente prima di attivare lo schedule

### 5. Debug dei Problemi
Se ci sono problemi:
1. Usa `n8n-basket-data-inspector.json` per capire la struttura dati
2. Usa `n8n-basket-debug-fixed.json` per debug dettagliato

## 🔧 Struttura HTML Rilevata

Il sito PlayBasket.it usa questa struttura:

```html
<table class='league_standings_ranking stats'>
  <tbody>
    <tr class='row_standings'>
      <td class='colfrozen'>1</td>
      <td class="sq colfrozen">
        <a href="club.php?obj=936&action=view&eid=4">Fides Montevarchi</a>
      </td>
      <td class='highlighted_data'>2</td>
      <!-- altri dati statistici -->
    </tr>
    <!-- altre righe -->
  </tbody>
</table>
```

## 📊 Output Atteso

Il workflow produce un JSON con questa struttura:

```json
{
  "standings": [
    {
      "position": 1,
      "team": "Fides Montevarchi",
      "teamId": "936",
      "teamLink": "https://www.playbasket.it/toscana/club.php?obj=936&action=view&eid=4",
      "points": 2,
      "pointsPerGame": 2.00,
      "games": 1,
      "wins": 1,
      "losses": 0,
      "percentage": 1.00,
      "streak": "1W",
      "pointsFor": 92,
      "pointsAgainst": 55,
      "quality": "1.67",
      "pointsForPerGame": 92.0,
      "pointsAgainstPerGame": 55.0
    }
  ],
  "teamStats": { /* statistiche per squadra */ },
  "lastUpdate": "2025-09-28T19:00:00.000Z",
  "season": "2025-2026",
  "competition": "Serie C Maschile Toscana",
  "conference": "Conference Nord-Ovest",
  "group": "Girone B",
  "totalTeams": 17
}
```

## ⚠️ Note Importanti

1. **Accesso ai Dati**: I dati HTML sono in `items[0].data` quando `responseFormat: "string"`
2. **Mapping Corretto**: I valori devono essere estratti nell'ordine corretto dalla tabella HTML
3. **Punti in Classifica**: Usa `class='highlighted_data'` per i punti veri, non la posizione
4. **Controllo Qualità**: Verifica sempre che siano state estratte almeno 10 squadre
5. **Credenziali GitHub**: Serve un Personal Access Token con permessi `Contents: Write`
6. **Netlify Build Hook**: Sostituisci `YOUR_BUILD_HOOK_ID` con l'ID reale del tuo build hook

## 🔄 Prossimi Passi

1. **Testa il parsing corretto**: Usa `n8n-basket-corrected-parsing.json`
2. **Testa aggiornamento GitHub**: Usa `n8n-basket-test-update.json` 
3. **Configura credenziali**: GitHub PAT e Netlify Build Hook
4. **Testa workflow completo**: Usa `n8n-basket-complete-final.json`
5. **Attiva scheduling**: Una volta testato, attiva il trigger cron

## 🐛 Problemi Risolti

- ✅ Errore `html.includes is not a function` - Risolto accesso ai dati
- ✅ Mapping dati errato - Corretto ordine estrazione valori
- ✅ Punti in classifica sbagliati - Usa `highlighted_data` class
- ✅ Struttura output corretta per il sito web
