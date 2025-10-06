// 🏀 N8N Workflow - Scraping Classifiche Basket San Vincenzo
// Questo codice va inserito nel nodo "Code" di N8N

// Funzione principale per elaborare i dati HTML
function processStandings(htmlRows) {
  const standings = [];
  const teamStats = {};
  
  // Processa ogni riga della tabella
  htmlRows.forEach((rowHtml, index) => {
    // Parsing HTML della riga
    const parser = new DOMParser();
    const doc = parser.parseFromString(rowHtml, 'text/html');
    const cells = doc.querySelectorAll('td');
    
    // Salta header e righe vuote
    if (cells.length < 12 || !cells[0]?.textContent?.trim()) return;
    
    const position = parseInt(cells[0]?.textContent?.trim()) || 0;
    if (position === 0) return; // Salta se non è una posizione valida
    
    // Estrai dati dalla riga
    const teamCell = cells[1];
    const teamName = teamCell?.textContent?.trim() || '';
    const teamLink = teamCell?.querySelector('a')?.href || '';
    const teamId = teamLink ? new URL(teamLink, 'https://www.playbasket.it').searchParams.get('obj') : '';
    
    const points = parseInt(cells[2]?.textContent?.trim()) || 0;
    const pointsPerGame = parseFloat(cells[3]?.textContent?.trim()) || 0;
    const games = parseInt(cells[4]?.textContent?.trim()) || 0;
    const wins = parseInt(cells[5]?.textContent?.trim()) || 0;
    const losses = parseInt(cells[6]?.textContent?.trim()) || 0;
    
    // Gestisci percentuale (può essere .000 o 1.00)
    let percentage = cells[7]?.textContent?.trim() || '0';
    if (percentage.startsWith('.')) percentage = '0' + percentage;
    percentage = parseFloat(percentage) || 0;
    
    const streak = cells[8]?.textContent?.trim() || '-';
    const pointsFor = parseInt(cells[9]?.textContent?.trim()) || 0;
    const pointsAgainst = parseInt(cells[10]?.textContent?.trim()) || 0;
    const quality = cells[11]?.textContent?.trim() || 'n/a';
    const pointsForPerGame = parseFloat(cells[12]?.textContent?.trim()) || 0;
    const pointsAgainstPerGame = parseFloat(cells[13]?.textContent?.trim()) || 0;
    
    // Crea oggetto squadra per classifica
    const teamData = {
      position,
      team: teamName,
      teamId,
      teamLink: teamLink ? 'https://www.playbasket.it/toscana/' + teamLink : '',
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
    
    // Crea statistiche dettagliate per squadra
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
  });
  
  return {
    standings: standings.sort((a, b) => a.position - b.position),
    teamStats,
    lastUpdate: new Date().toISOString(),
    season: '2025-2026',
    competition: 'Serie C Maschile Toscana',
    conference: 'Conference Nord-Ovest',
    group: 'Girone B'
  };
}

// Codice principale N8N
const htmlRows = $input.all()[0].json.standings || [];
const processedData = processStandings(htmlRows);

// Crea struttura dati completa
const fullStats = {
  serieC: processedData,
  under17: {
    standings: [],
    teamStats: {},
    lastUpdate: new Date().toISOString()
  },
  under13: {
    standings: [],
    teamStats: {},
    lastUpdate: new Date().toISOString()
  },
  lastUpdate: new Date().toISOString(),
  source: 'playbasket.it'
};

// Output per i nodi successivi
return [
  {
    json: {
      serieCStats: processedData,
      fullStats: fullStats,
      basketSanVincenzoPosition: processedData.standings.find(team => 
        team.team.toLowerCase().includes('san vincenzo')
      )?.position || 'Non trovato',
      totalTeams: processedData.standings.length,
      lastUpdate: processedData.lastUpdate
    }
  }
];
