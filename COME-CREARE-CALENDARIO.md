# 🗓️ Come Creare il Calendario - Guida Completa

## 📋 Panoramica

Il nuovo sistema di calendario automatico offre **3 metodi** per creare e gestire le partite:

1. **📝 Modifica Manuale JSON** (Più diretto)
2. **🖥️ Interfaccia Web** (Più user-friendly)
3. **📁 Import CSV** (Per grandi quantità)

---

## 🎯 **Metodo 1: Modifica Manuale JSON**

### 📍 File da Modificare
```
src/data/calendar-system.json
```

### 📝 Struttura di una Partita
```json
{
  "id": "serie-c-5",
  "competition": "serie-c",
  "homeTeam": "svb",
  "awayTeam": "union-prato",
  "date": "2024-11-10T18:00:00",
  "venue": "Pala Toscanini",
  "status": "scheduled",
  "round": 5,
  "season": "2024-2025"
}
```

### 🔧 Come Aggiungere una Partita

1. **Apri il file** `src/data/calendar-system.json`
2. **Vai alla sezione** `"matches"`
3. **Aggiungi un nuovo oggetto** nell'array
4. **Salva il file**

### 📊 Codici Squadre Disponibili
- `"svb"` - Garden Toscana Resort
- `"union-prato"` - Union Basket Prato
- `"fucecchio"` - Folgore Fucecchio
- `"costone-siena"` - Costone Siena
- `"us-livorno"` - US Livorno

### 🏆 Codici Competizioni
- `"serie-c"` - Serie C Unica
- `"under19"` - Under 19 Gold
- `"under14"` - Under 14 Gold

---

## 🖥️ **Metodo 2: Interfaccia Web**

### 📍 Accesso
Vai alla pagina: `/gestione-calendario`

### 📋 Passi per Aggiungere Partite

1. **Seleziona Competizione**
   - Serie C Unica
   - Under 19 Gold
   - Under 14 Gold

2. **Scegli Squadre**
   - **Squadra Casa**: Chi gioca in casa
   - **Squadra Ospite**: Chi gioca in trasferta

3. **Inserisci Dettagli**
   - **Data e Ora**: Quando si gioca
   - **Luogo**: Dove si gioca (auto-compilato)
   - **Giornata**: Numero giornata campionato

4. **Clicca "Aggiungi Partita"**

### ✨ Funzionalità Automatiche
- 🏠 **Auto-compilazione luogo** in base alla squadra casa
- ✅ **Validazione automatica** dei dati
- 🔄 **Aggiornamento immediato** della lista
- ⏰ **Countdown automatico** per ogni partita

---

## 📁 **Metodo 3: Import CSV**

### 📥 Scarica Template
1. Vai a `/gestione-calendario`
2. Clicca **"Scarica Template CSV"**
3. Si scarica `template-partite.csv`

### 📝 Formato CSV
```csv
competizione,homeTeam,awayTeam,data,venue,round
serie-c,svb,union-prato,2024-11-10T18:00:00,Pala Toscanini,5
under19,svb,fucecchio,2024-11-17T18:00:00,Pala Toscanini,3
under14,costone-siena,svb,2024-11-24T18:00:00,PalaEstra,2
```

### 🔄 Import
1. **Compila il CSV** con le tue partite
2. **Carica il file** nell'interfaccia
3. **Controlla l'anteprima**
4. **Conferma l'import**

---

## 🎨 **Personalizzazione Avanzata**

### 🏟️ Aggiungere Nuove Squadre

Nel file `calendar-system.json`, sezione `"teams"`:

```json
"nuova-squadra": {
  "name": "Nome Completo Squadra",
  "shortName": "Nome Breve",
  "logo": "/img/logo-nuova-squadra.png",
  "homeVenue": "Nome Pala",
  "homeVenueAddress": "Città, Provincia"
}
```

### 🏆 Aggiungere Nuove Competizioni

Sezione `"competitions"`:

```json
"nuova-competizione": {
  "name": "Nome Competizione",
  "shortName": "Nome Breve",
  "logo": "/img/logo-competizione.png",
  "season": "2024-2025",
  "status": "active"
}
```

---

## ⚡ **Funzionalità Automatiche**

### 🏠/🚌 Icone Casa/Trasferta
- **Verde Casa** 🏠: Quando SVB gioca in casa
- **Blu Trasferta** 🚌: Quando SVB gioca fuori casa
- **Automatico**: Basato sui dati del calendario

### ⏰ Countdown Intelligente
- **Tempo reale**: Aggiornamento ogni secondo
- **Formato italiano**: "Tra 3 giorni", "Tra 2 ore"
- **"Partita in corso!"**: Quando la partita inizia

### 🔄 Aggiornamenti Automatici
- **Ogni 5 minuti**: Controllo nuovi dati
- **Cache intelligente**: Evita richieste inutili
- **API endpoint**: `/api/calendar` per dati dinamici

---

## 🛠️ **Risoluzione Problemi**

### ❌ Partita Non Appare
1. **Controlla la data**: Deve essere nel futuro
2. **Verifica squadra**: Deve essere SVB (casa o ospite)
3. **Controlla formato**: Data in formato ISO

### ⚠️ Errori di Validazione
- **Squadre uguali**: Casa e ospite non possono essere uguali
- **Data invalida**: Usa formato `YYYY-MM-DDTHH:MM:SS`
- **Competizione sconosciuta**: Usa codici validi

### 🔧 Debug
- **Console browser**: Controlla errori JavaScript
- **API endpoint**: Testa `/api/calendar?team=svb`
- **Log build**: Controlla errori durante il build

---

## 📱 **Esempi Pratici**

### 📅 Esempio: Serie C
```json
{
  "id": "serie-c-5",
  "competition": "serie-c",
  "homeTeam": "svb",
  "awayTeam": "union-prato",
  "date": "2024-11-10T18:00:00",
  "venue": "Pala Toscanini",
  "status": "scheduled",
  "round": 5,
  "season": "2024-2025"
}
```

### 📅 Esempio: Under 19
```json
{
  "id": "under19-3",
  "competition": "under19",
  "homeTeam": "fucecchio",
  "awayTeam": "svb",
  "date": "2024-11-17T18:00:00",
  "venue": "Pala Parenti",
  "status": "scheduled",
  "round": 3,
  "season": "2024-2025"
}
```

---

## 🚀 **Prossimi Sviluppi**

- [ ] **Integrazione API FIP**: Import automatico calendari ufficiali
- [ ] **Sincronizzazione Google Calendar**: Esporta partite su Google
- [ ] **Notifiche push**: Avvisi per partite imminenti
- [ ] **Statistiche integrate**: Risultati e classifiche
- [ ] **Live score**: Punteggi in tempo reale

---

## 📞 **Supporto**

Per problemi o domande:
1. **Controlla la documentazione** in `CALENDARIO-AUTOMATICO.md`
2. **Verifica i log** della console browser
3. **Testa l'API** endpoint `/api/calendar`
4. **Controlla il build** con `npm run build`

---

*Guida creata per Basket San Vincenzo - 2025* 