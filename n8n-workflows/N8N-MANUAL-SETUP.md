# 🏀 Configurazione Manuale N8N - Basket San Vincenzo

Se l'importazione del JSON continua a dare errori, puoi creare il workflow manualmente seguendo questi passi.

## 🛠️ Creazione Manuale del Workflow

### **1. Crea Nuovo Workflow**
1. **N8N Dashboard** → **New Workflow**
2. **Nome**: `Basket San Vincenzo - Scraping Classifiche`

---

### **2. Nodo 1: Schedule Trigger**
1. **Aggiungi nodo** → **Schedule Trigger**
2. **Configurazione**:
   - **Trigger Interval**: `Custom`
   - **Cron Expression**: `0 8 * * 1,4`
   - **Timezone**: `Europe/Rome` (opzionale)

---

### **3. Nodo 2: HTTP Request (Fetch Page)**
1. **Aggiungi nodo** → **HTTP Request**
2. **Collegalo** al Schedule Trigger
3. **Configurazione**:
   - **Method**: `GET`
   - **URL**: `https://www.playbasket.it/toscana/league.php?lt=2&lf=M&lr=TO&lp=FI&lc=C%2FM&lg=1&mod=st`
   - **Options** → **Timeout**: `120000` (2 minuti)
   - **Options** → **Headers**:
     ```
     User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
     ```

---

### **4. Nodo 3: HTML Extract**
1. **Aggiungi nodo** → **HTML Extract**
2. **Collegalo** al HTTP Request
3. **Configurazione**:
   - **Data Property Name**: `data`
   - **Extraction Values**:
     - **Property Name**: `tableRows`
     - **CSS Selector**: `table tr`
     - **Return Value**: `HTML`
     - **Return Array**: `✅ Abilitato`

---

### **5. Nodo 4: Code (Process Data)**
1. **Aggiungi nodo** → **Code**
2. **Collegalo** al HTML Extract
3. **Incolla questo codice**:

```javascript
const htmlRows = $input.all()[0].json.tableRows || [];
const standings = [];
const teamStats = {};

console.log(`🔍 Processando ${htmlRows.length} righe HTML...`);

htmlRows.forEach((rowHtml, index) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<table><tbody>${rowHtml}</tbody></table>`, 'text/html');
    const cells = doc.querySelectorAll('td');
    
    if (cells.length < 10) return;
    
    const positionText = cells[0]?.textContent?.trim();
    const position = parseInt(positionText) || 0;
    
    if (position === 0 || positionText === '#' || positionText === 'Pos' || !positionText) return;
    
    const teamCell = cells[1];
    const teamName = teamCell?.textContent?.trim() || '';
    
    if (!teamName || teamName === 'Squadra' || teamName === 'Team') return;
    
    const teamLink = teamCell?.querySelector('a')?.getAttribute('href') || '';
    const teamId = teamLink ? teamLink.match(/obj=(\d+)/)?.[1] || '' : '';
    
    const points = parseInt(cells[2]?.textContent?.trim()) || 0;
    const pointsPerGame = parseFloat(cells[3]?.textContent?.trim()) || 0;
    const games = parseInt(cells[4]?.textContent?.trim()) || 0;
    const wins = parseInt(cells[5]?.textContent?.trim()) || 0;
    const losses = parseInt(cells[6]?.textContent?.trim()) || 0;
    
    let percentage = cells[7]?.textContent?.trim() || '0';
    if (percentage.startsWith('.')) percentage = '0' + percentage;
    if (percentage === '1') percentage = '1.00';
    percentage = parseFloat(percentage) || 0;
    
    const streak = cells[8]?.textContent?.trim() || '-';
    const pointsFor = parseInt(cells[9]?.textContent?.trim()) || 0;
    const pointsAgainst = parseInt(cells[10]?.textContent?.trim()) || 0;
    const quality = cells[11]?.textContent?.trim() || 'n/a';
    
    const pointsForPerGame = cells[12] ? parseFloat(cells[12].textContent?.trim()) || 0 : (games > 0 ? pointsFor / games : 0);
    const pointsAgainstPerGame = cells[13] ? parseFloat(cells[13].textContent?.trim()) || 0 : (games > 0 ? pointsAgainst / games : 0);
    
    const teamData = {
      position,
      team: teamName,
      teamId,
      teamLink: teamLink ? `https://www.playbasket.it/toscana/${teamLink}` : '',
      points,
      pointsPerGame,
      games,
      wins,
      losses,
      percentage,
      streak,
      pointsFor,
      pointsAgainst,
      quality,
      pointsForPerGame,
      pointsAgainstPerGame
    };
    
    standings.push(teamData);
    
    teamStats[teamName] = {
      position,
      points,
      games,
      wins,
      losses,
      winPercentage: percentage,
      pointsFor,
      pointsAgainst,
      pointDifference: pointsFor - pointsAgainst,
      averagePointsFor: pointsForPerGame,
      averagePointsAgainst: pointsAgainstPerGame
    };
    
    console.log(`✅ Processata: ${teamName} - Pos: ${position} - Punti: ${points}`);
    
  } catch (error) {
    console.error(`❌ Errore processando riga ${index}:`, error.message);
  }
});

const sortedStandings = standings.sort((a, b) => a.position - b.position);

const result = {
  standings: sortedStandings,
  teamStats,
  lastUpdate: new Date().toISOString(),
  season: '2025-2026',
  competition: 'Serie C Maschile Toscana',
  conference: 'Conference Nord-Ovest',
  group: 'Girone B',
  totalTeams: sortedStandings.length
};

console.log(`📊 Totale squadre processate: ${result.totalTeams}`);

return { json: result };
```

---

### **6. Nodo 5: HTTP Request (Get File SHA)**
1. **Aggiungi nodo** → **HTTP Request**
2. **Collegalo** al Code
3. **Configurazione**:
   - **Method**: `GET`
   - **URL**: `https://api.github.com/repos/{{ $env.GITHUB_REPO }}/contents/public/stats/serie-c-stats.json`
   - **Headers**:
     ```
     Authorization: Bearer {{ $env.GITHUB_TOKEN }}
     Accept: application/vnd.github.v3+json
     User-Agent: N8N-Basketball-Scraper
     ```

---

### **7. Nodo 6: HTTP Request (Update GitHub)**
1. **Aggiungi nodo** → **HTTP Request**
2. **Collegalo** al nodo precedente
3. **Configurazione**:
   - **Method**: `PUT`
   - **URL**: `https://api.github.com/repos/{{ $env.GITHUB_REPO }}/contents/public/stats/serie-c-stats.json`
   - **Headers**:
     ```
     Authorization: Bearer {{ $env.GITHUB_TOKEN }}
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
     User-Agent: N8N-Basketball-Scraper
     ```
   - **Send Body**: `✅ Abilitato`
   - **Body Content Type**: `JSON`
   - **JSON Body**:
     ```json
     {
       "message": "📊 Aggiornamento classifiche Serie C - {{ new Date().toLocaleDateString('it-IT') }}",
       "content": "{{ Buffer.from(JSON.stringify($('Code').item.json, null, 2)).toString('base64') }}",
       "sha": "{{ $('HTTP Request').item.json.sha }}"
     }
     ```

---

### **8. Nodo 7: HTTP Request (Netlify Deploy)**
1. **Aggiungi nodo** → **HTTP Request**
2. **Collegalo** al nodo precedente
3. **Configurazione**:
   - **Method**: `POST`
   - **URL**: `{{ $env.NETLIFY_BUILD_HOOK }}`
   - **Headers**:
     ```
     User-Agent: N8N-Basketball-Scraper
     ```

---

## 🔑 Variabili d'Ambiente

Vai su **Settings** → **Environment Variables** e aggiungi:

```bash
GITHUB_TOKEN=YOUR_GITHUB_TOKEN_HERE
GITHUB_REPO=acipriani/svbtailwindok3
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ✅ Test del Workflow

1. **Salva il workflow**
2. **Clicca "Execute Workflow"**
3. **Verifica che tutti i nodi** si completino con successo
4. **Controlla su GitHub** che i file si aggiornino
5. **Verifica su Netlify** che il deploy si attivi

---

## 🚨 Troubleshooting

### **Errore "Buffer is not defined"**
Sostituisci nel nodo Update GitHub:
```javascript
"content": "{{ Buffer.from(JSON.stringify($('Code').item.json, null, 2)).toString('base64') }}"
```
Con:
```javascript
"content": "{{ btoa(JSON.stringify($('Code').item.json, null, 2)) }}"
```

### **Errore GitHub API 404**
Verifica che:
- `GITHUB_REPO` sia nel formato `username/repository`
- Il token GitHub abbia i permessi `repo`
- Il file `public/stats/serie-c-stats.json` esista nel repository

### **Errore Netlify Deploy**
Verifica che:
- `NETLIFY_BUILD_HOOK` sia l'URL completo del build hook
- Il build hook sia attivo su Netlify

---

**🎉 Una volta completata la configurazione manuale, il workflow funzionerà esattamente come quello importato!**
