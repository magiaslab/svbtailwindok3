// File di indice per le statistiche Serie C
// Questo file viene importato direttamente dai componenti

import serieCStats from './serie-c-stats.json';
import serieCStatsExample from './serie-c-stats-example.json';

export function getSerieCStats() {
  try {
    // Se le statistiche principali sono valide, usale
    if (serieCStats && serieCStats.standings && serieCStats.standings.length > 0 && !serieCStats.error) {
      console.log('📊 Usando statistiche principali:', serieCStats.standings.length, 'squadre');
      return serieCStats;
    } else {
      // Altrimenti usa i dati di fallback
      console.log('🔄 Usando dati di fallback:', serieCStatsExample.standings.length, 'squadre');
      return serieCStatsExample;
    }
  } catch (error) {
    console.warn('⚠️ Errore caricamento statistiche, uso fallback:', error);
    return serieCStatsExample;
  }
}

export { serieCStats, serieCStatsExample };
