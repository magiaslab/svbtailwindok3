# 🏀 Sistema Calendario Automatico - Basket San Vincenzo

## 📋 Panoramica

Il nuovo sistema di calendario automatico sostituisce il vecchio sistema manuale con un approccio intelligente che:

- ✅ **Gestisce automaticamente** home/away
- ⏰ **Countdown in tempo reale** per ogni partita
- 🔄 **Aggiornamenti automatici** dei dati
- 🎯 **Interfaccia moderna** con icone dinamiche
- 📱 **Responsive design** ottimizzato

## 🏗️ Architettura

### File Principali

```
src/
├── components/
│   ├── SmartNextMatch.astro      # Componente principale
│   ├── CountdownTimer.astro      # Timer countdown
│   └── CalendarUpdater.astro     # Aggiornamenti automatici
├── data/
│   └── calendar-system.json      # Dati strutturati
└── pages/
    └── api/
        └── calendar.ts           # API endpoint
```

## 📊 Struttura Dati

### `calendar-system.json`

```json
{
  "teams": {
    "svb": {
      "name": "Garden Toscana Resort Basket San Vincenzo",
      "shortName": "SVB",
      "logo": "/img/logo svb.png",
      "homeVenue": "Pala Toscanini"
    }
  },
  "competitions": {
    "serie-c": {
      "name": "Serie C Unica",
      "shortName": "Serie C",
      "status": "active"
    }
  },
  "matches": [
    {
      "id": "serie-c-1",
      "competition": "serie-c",
      "homeTeam": "union-prato",
      "awayTeam": "svb",
      "date": "2024-10-13T18:00:00",
      "venue": "Pala Toscanini",
      "status": "scheduled"
    }
  ]
}
```

## 🚀 Funzionalità

### 1. **Countdown Intelligente**
- ⏰ Timer in tempo reale per ogni partita
- 📱 Responsive con giorni, ore, minuti, secondi
- 🎯 Cambia automaticamente in "Partita in corso!" quando inizia

### 2. **Icone Dinamiche**
- 🏠 **Casa**: Icona casa verde per partite casalinghe
- 🚌 **Trasferta**: Icona location blu per partite in trasferta
- 🔄 **Automatico**: Determina casa/away dai dati del calendario

### 3. **Aggiornamenti Automatici**
- 🔄 API endpoint `/api/calendar` per dati dinamici
- ⏱️ Cache intelligente (5 minuti)
- 📡 Aggiornamenti periodici ogni 5 minuti
- 🎯 Eventi JavaScript per aggiornamenti in tempo reale

### 4. **Gestione Errori**
- 📝 Fallback per partite non programmate
- 🔧 Gestione errori API
- 📱 Messaggi informativi per l'utente

## 🛠️ Come Aggiungere Partite

### Metodo 1: Modifica JSON (Manuale)
```json
{
  "id": "serie-c-5",
  "competition": "serie-c",
  "homeTeam": "svb",
  "awayTeam": "nuova-squadra",
  "date": "2024-11-10T18:00:00",
  "venue": "Pala Toscanini",
  "status": "scheduled"
}
```

### Metodo 2: API (Automatico)
```javascript
// POST /api/calendar
{
  "action": "add_match",
  "data": {
    "competition": "serie-c",
    "homeTeam": "svb",
    "awayTeam": "nuova-squadra",
    "date": "2024-11-10T18:00:00",
    "venue": "Pala Toscanini"
  }
}
```

## 🎨 Personalizzazione

### Colori e Stili
- 🎨 Colori personalizzabili in `tailwind.config.cjs`
- 🏠 Icone SVG personalizzabili
- 📱 Layout responsive con Tailwind CSS

### Configurazioni
```json
{
  "settings": {
    "timezone": "Europe/Rome",
    "countdownEnabled": true,
    "autoUpdate": true,
    "maxUpcomingMatches": 3
  }
}
```

## 🔧 API Endpoints

### GET `/api/calendar`
**Parametri:**
- `team`: ID squadra (default: "svb")
- `competition`: ID competizione (opzionale)
- `limit`: Numero massimo partite (default: 3)

**Risposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "serie-c-1",
      "homeTeam": "union-prato",
      "awayTeam": "svb",
      "date": "2024-10-13T18:00:00",
      "isHome": false,
      "timeUntil": 86400000,
      "homeTeamData": { ... },
      "awayTeamData": { ... },
      "competitionData": { ... }
    }
  ],
  "total": 1
}
```

### POST `/api/calendar`
Per aggiornare i dati del calendario (futuro sviluppo).

## 📱 Utilizzo

### Nel Codice
```astro
---
import SmartNextMatch from "../components/SmartNextMatch.astro";
---

<SmartNextMatch />
```

### JavaScript
```javascript
// Forza aggiornamento manuale
window.calendarUpdater.forceUpdate();

// Ascolta aggiornamenti
window.addEventListener('calendar:updated', (event) => {
  console.log('Nuove partite:', event.detail);
});
```

## 🔄 Migrazione dal Vecchio Sistema

### Vecchio Sistema
```astro
<!-- Vecchio componente manuale -->
<Nextmatch />
```

### Nuovo Sistema
```astro
<!-- Nuovo componente automatico -->
<SmartNextMatch />
```

## 🎯 Vantaggi

1. **⏰ Tempo Reale**: Countdown live per ogni partita
2. **🔄 Automatico**: Nessuna gestione manuale richiesta
3. **📱 Responsive**: Ottimizzato per tutti i dispositivi
4. **🎨 Moderno**: Interfaccia pulita e professionale
5. **🔧 Scalabile**: Facile aggiungere nuove funzionalità
6. **📊 Strutturato**: Dati organizzati e facilmente gestibili

## 🚀 Prossimi Sviluppi

- [ ] **Integrazione API esterne** (FIP, PlayBasket)
- [ ] **Notifiche push** per partite imminenti
- [ ] **Widget personalizzabili** per altre pagine
- [ ] **Sincronizzazione Google Calendar**
- [ ] **Statistiche partite** integrate
- [ ] **Live score** durante le partite

---

*Sistema sviluppato per Basket San Vincenzo - 2025* 