#!/usr/bin/env node

/**
 * 🏀 Script di Scraping Statistiche Basket San Vincenzo
 * 
 * Questo script aggiorna automaticamente le statistiche delle squadre SVB
 * estraendole da PlayBasket.it e altri siti ufficiali
 */

import puppeteer from 'puppeteer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurazione
const CONFIG = {
  // URL delle pagine da scrapare
  urls: {
    serieC: 'https://www.playbasket.it/toscana/league.php?lt=2&lf=M&lr=TO&lp=FI&lc=C%2FM&season=2026&lg=1&mod=st',
    under17: 'https://www.playbasket.it/toscana/league.php?lt=2&lf=M&lr=TO&lp=FI&lc=C%2FM&season=2026&lg=1&mod=st',
    under13: 'https://www.playbasket.it/toscana/league.php?lt=2&lf=M&lr=TO&lp=FI&lc=C%2FM&season=2026&lg=1&mod=st'
  },
  
  // Timeout e configurazioni browser
  browser: {
    headless: true,
    timeout: 30000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  
  // Percorsi file di output
  output: {
    statsDir: path.join(__dirname, '../src/data/stats'),
    backupDir: path.join(__dirname, '../src/data/stats/backup')
  }
};

class StatsScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.stats = {
      serieC: {},
      under17: {},
      under13: {},
      lastUpdate: new Date().toISOString(),
      source: 'playbasket.it'
    };
  }

  /**
   * Inizializza il browser Puppeteer
   */
  async init() {
    console.log('🚀 Inizializzazione browser...');
    
    try {
      this.browser = await puppeteer.launch({
        headless: CONFIG.browser.headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      
      this.page = await this.browser.newPage();
      await this.page.setUserAgent(CONFIG.browser.userAgent);
      await this.page.setViewport({ width: 1920, height: 1080 });
      
      console.log('✅ Browser inizializzato con successo');
    } catch (error) {
      console.error('❌ Errore inizializzazione browser:', error);
      throw error;
    }
  }

  /**
   * Scrapa le statistiche Serie C
   */
  async scrapeSerieC() {
    console.log('🏀 Scraping statistiche Serie C...');
    
    try {
      await this.page.goto(CONFIG.urls.serieC, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.browser.timeout 
      });
      
      // Aspetta che la tabella della classifica si carichi
      await this.page.waitForSelector('table', { timeout: 15000 });
      
      const serieCStats = await this.page.evaluate(() => {
        const stats = {
          standings: [],
          teamStats: {},
          lastUpdate: new Date().toISOString(),
          season: '2025-2026',
          competition: 'Serie C Maschile Toscana',
          conference: 'Conference Nord-Ovest',
          group: 'Girone B'
        };
        
        // Estrai la tabella della classifica
        const table = document.querySelector('table');
        if (!table) return stats;
        
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 13) {
            // Estrai i dati dalla riga
            const position = parseInt(cells[0]?.textContent?.trim()) || index + 1;
            const teamName = cells[1]?.textContent?.trim() || '';
            const points = parseInt(cells[2]?.textContent) || 0;
            const pointsPerGame = parseFloat(cells[3]?.textContent) || 0;
            const games = parseInt(cells[4]?.textContent) || 0;
            const wins = parseInt(cells[5]?.textContent) || 0;
            const losses = parseInt(cells[6]?.textContent) || 0;
            const percentage = parseFloat(cells[7]?.textContent) || 0;
            const streak = cells[8]?.textContent?.trim() || '-';
            const pointsFor = parseInt(cells[9]?.textContent) || 0;
            const pointsAgainst = parseInt(cells[10]?.textContent) || 0;
            const quality = cells[11]?.textContent?.trim() || 'n/a';
            const pointsForPerGame = parseFloat(cells[12]?.textContent) || 0;
            const pointsAgainstPerGame = parseFloat(cells[13]?.textContent) || 0;
            
            // Estrai il link della squadra se presente
            const teamLink = cells[1]?.querySelector('a')?.href || '';
            const teamId = teamLink ? new URL(teamLink, window.location.href).searchParams.get('obj') : '';
            
            stats.standings.push({
              position,
              team: teamName,
              teamId,
              teamLink,
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
            });
            
            // Aggiungi statistiche dettagliate per squadra
            stats.teamStats[teamName] = {
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
          }
        });
        
        return stats;
      });
      
      this.stats.serieC = serieCStats;
      console.log(`✅ Serie C: ${serieCStats.standings.length} squadre trovate`);
      console.log(`🏆 Prima in classifica: ${serieCStats.standings[0]?.team || 'N/A'}`);
      
    } catch (error) {
      console.error('❌ Errore scraping Serie C:', error);
      // Fallback: carica dati esistenti
      await this.loadFallbackData('serieC');
    }
  }

  /**
   * Scrapa le statistiche Under 17
   */
  async scrapeUnder17() {
    console.log('🏀 Scraping statistiche Under 17...');
    
    try {
      await this.page.goto(CONFIG.urls.under17, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.browser.timeout 
      });
      
      // Logica simile per Under 17
      const under17Stats = await this.page.evaluate(() => {
        // Implementa estrazione dati Under 17
        return {
          standings: [],
          teamStats: {},
          lastUpdate: new Date().toISOString()
        };
      });
      
      this.stats.under17 = under17Stats;
      console.log(`✅ Under 17: statistiche aggiornate`);
      
    } catch (error) {
      console.error('❌ Errore scraping Under 17:', error);
      await this.loadFallbackData('under17');
    }
  }

  /**
   * Scrapa le statistiche Under 13
   */
  async scrapeUnder13() {
    console.log('🏀 Scraping statistiche Under 13...');
    
    try {
      await this.page.goto(CONFIG.urls.under13, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.browser.timeout 
      });
      
      // Logica simile per Under 13
      const under13Stats = await this.page.evaluate(() => {
        // Implementa estrazione dati Under 13
        return {
          standings: [],
          teamStats: {},
          lastUpdate: new Date().toISOString()
        };
      });
      
      this.stats.under13 = under13Stats;
      console.log(`✅ Under 13: statistiche aggiornate`);
      
    } catch (error) {
      console.error('❌ Errore scraping Under 13:', error);
      await this.loadFallbackData('under13');
    }
  }

  /**
   * Carica dati di fallback se lo scraping fallisce
   */
  async loadFallbackData(category) {
    console.log(`🔄 Caricamento dati di fallback per ${category}...`);
    
    try {
      const fallbackPath = path.join(CONFIG.output.statsDir, `${category}-fallback.json`);
      const fallbackData = await fs.readFile(fallbackPath, 'utf8');
      this.stats[category] = JSON.parse(fallbackData);
      console.log(`✅ Dati di fallback caricati per ${category}`);
    } catch (error) {
      console.warn(`⚠️ Nessun dato di fallback disponibile per ${category}`);
      this.stats[category] = {
        standings: [],
        teamStats: {},
        lastUpdate: new Date().toISOString(),
        error: 'Dati non disponibili'
      };
    }
  }

  /**
   * Salva le statistiche in file JSON
   */
  async saveStats() {
    console.log('💾 Salvataggio statistiche...');
    
    try {
      // Crea directory se non esistono
      await fs.mkdir(CONFIG.output.statsDir, { recursive: true });
      await fs.mkdir(CONFIG.output.backupDir, { recursive: true });
      
      // Salva statistiche complete
      const statsPath = path.join(CONFIG.output.statsDir, 'stats-database.json');
      await fs.writeFile(statsPath, JSON.stringify(this.stats, null, 2));
      
      // Salva backup con timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(CONFIG.output.backupDir, `stats-backup-${timestamp}.json`);
      await fs.writeFile(backupPath, JSON.stringify(this.stats, null, 2));
      
      // Salva file separati per categoria
      await fs.writeFile(
        path.join(CONFIG.output.statsDir, 'serie-c-stats.json'),
        JSON.stringify(this.stats.serieC, null, 2)
      );
      
      await fs.writeFile(
        path.join(CONFIG.output.statsDir, 'under17-stats.json'),
        JSON.stringify(this.stats.under17, null, 2)
      );
      
      await fs.writeFile(
        path.join(CONFIG.output.statsDir, 'under13-stats.json'),
        JSON.stringify(this.stats.under13, null, 2)
      );
      
      console.log('✅ Statistiche salvate con successo');
      
    } catch (error) {
      console.error('❌ Errore salvataggio statistiche:', error);
      throw error;
    }
  }

  /**
   * Aggiorna Google Sheets (opzionale)
   */
  async updateGoogleSheets() {
    // Implementazione per Google Sheets se necessario
    console.log('📊 Aggiornamento Google Sheets (opzionale)...');
  }

  /**
   * Chiude il browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Browser chiuso');
    }
  }

  /**
   * Esegue tutto il processo di scraping
   */
  async run() {
    console.log('🚀 Avvio scraping statistiche Basket San Vincenzo...');
    console.log(`📅 Timestamp: ${new Date().toISOString()}`);
    
    try {
      await this.init();
      
      // Esegui scraping per tutte le categorie
      await this.scrapeSerieC();
      await this.scrapeUnder17();
      await this.scrapeUnder13();
      
      // Salva i risultati
      await this.saveStats();
      
      // Opzionale: aggiorna Google Sheets
      await this.updateGoogleSheets();
      
      console.log('🎉 Scraping completato con successo!');
      
    } catch (error) {
      console.error('💥 Errore durante lo scraping:', error);
      throw error;
    } finally {
      await this.close();
    }
  }
}

// Esegui lo script se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const scraper = new StatsScraper();
  
  scraper.run()
    .then(() => {
      console.log('✅ Script completato con successo');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script fallito:', error);
      process.exit(1);
    });
}

export default StatsScraper;
