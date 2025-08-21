import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    // Percorso al file delle statistiche
    const statsPath = path.join(process.cwd(), 'src', 'data', 'stats', 'serie-c-stats.json');
    
    // Prova a leggere le statistiche principali
    let stats;
    try {
      const statsContent = await fs.readFile(statsPath, 'utf-8');
      stats = JSON.parse(statsContent);
    } catch (error) {
      console.warn('⚠️ Errore lettura statistiche principali, uso fallback:', error);
      
      // Se fallisce, usa i dati di fallback
      const fallbackPath = path.join(process.cwd(), 'src', 'data', 'stats', 'serie-c-stats-example.json');
      const fallbackContent = await fs.readFile(fallbackPath, 'utf-8');
      stats = JSON.parse(fallbackContent);
    }
    
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache per 5 minuti
      }
    });
    
  } catch (error) {
    console.error('❌ Errore endpoint statistiche:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Statistiche non disponibili',
      message: 'Impossibile caricare le statistiche'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
