# 🏀 Gestione Loghi Squadre

## 📁 Struttura Cartelle

I loghi delle squadre devono essere caricati nella cartella:
```
public/img/teams/
```

## 🎨 Formato Loghi

### Specifiche Tecniche
- **Formato**: PNG o JPG
- **Dimensioni**: 200x200px (minimo consigliato)
- **Forma**: Preferibilmente quadrati o circolari
- **Sfondo**: Trasparente o bianco
- **Peso**: Massimo 100KB per ottimizzare il caricamento

### Nomi File
I loghi devono seguire questa convenzione di naming:
```
{nome-squadra}.png
```

## 🏆 Squadre Serie C 2025/2026 - Conference Nord Ovest

### 📋 Lista Completa Squadre

| ID Squadra | Nome Ufficiale | Nome File Logo | Status Logo |
|------------|----------------|----------------|-------------|
| `svb` | BASKET SAN VINCENZO | `logo-svb.png` | ✅ Presente |
| `us-livorno` | U.S. LIVORNO BASKET | `us-livorno.png` | ✅ Presente |
| `endiasfalti-agliana` | ENDIASFALTI PALL. AGLIANA 2000 | `endiasfalti-agliana.png` | ❌ Mancante |
| `folgore-fucecchio` | FOLGORE FUCECCHIO | `folgore-fucecchio.png` | ✅ Presente |
| `pall-sansepolcro` | PALL. SANSEPOLCRO | `pall-sansepolcro.png` | ❌ Mancante |
| `prato-dragons` | PALLACANESTRO PRATO DRAGONS | `prato-dragons.png` | ❌ Mancante |
| `cus-firenze` | CUS FIRENZE | `cus-firenze.png` | ❌ Mancante |
| `valdisieve` | VALDISIEVE | `valdisieve.png` | ❌ Mancante |
| `fides-montevarchi` | FIDES P. MONTEVARCHI | `fides-montevarchi.png` | ❌ Mancante |
| `bottegone` | BOTTEGONE BASKET 2001 | `bottegone.png` | ❌ Mancante |
| `pino-firenze` | UNIONE SPORTIVA PINO FIRENZE | `pino-firenze.png` | ❌ Mancante |
| `virtus-certaldo` | VIRTUS CERTALDO | `virtus-certaldo.png` | ❌ Mancante |
| `abc-castelfiorentino` | ABC CASTELFIORENTINO | `abc-castelfiorentino.png` | ❌ Mancante |
| `don-bosco-livorno` | PALL. DON BOSCO LIVORNO | `don-bosco-livorno.png` | ❌ Mancante |
| `us-sei-rose` | U S BASKET SEI ROSE | `us-sei-rose.png` | ❌ Mancante |
| `polisportiva-sancat` | POLISPORTIVA SANCAT | `polisportiva-sancat.png` | ❌ Mancante |
| `union-basket-prato` | UNION BASKET PRATO | `union-basket-prato.jpg` | ✅ Presente |

### 🏆 Squadre Coppa Toscana 2025/2026

Le stesse squadre partecipano anche al Trofeo Piperno (Coppa Toscana).

## 🔄 Sistema di Fallback

Se un logo non è disponibile, il sistema mostrerà automaticamente:
- **Iniziali della squadra** (es. "SVB" per San Vincenzo Basket)
- **Colori personalizzati** della squadra
- **Gradiente** con i colori ufficiali

### Colori di Fallback Configurati

| Squadra | ID | Colore Primario | Colore Secondario | Iniziali |
|----------|----|----------------|-------------------|----------|
| BASKET SAN VINCENZO | `svb` | Blu (#1e40af) | Giallo (#fbbf24) | SVB |
| U.S. LIVORNO BASKET | `us-livorno` | Rosso (#dc2626) | Bianco (#ffffff) | Livorno |
| ENDIASFALTI AGLIANA | `endiasfalti-agliana` | Verde (#059669) | Bianco (#ffffff) | Agliana |
| FOLGORE FUCECCHIO | `folgore-fucecchio` | Viola (#7c3aed) | Bianco (#ffffff) | Fucecchio |
| PALL. SANSEPOLCRO | `pall-sansepolcro` | Grigio (#1f2937) | Arancione (#f59e0b) | Sansepolcro |
| PRATO DRAGONS | `prato-dragons` | Rosso (#dc2626) | Bianco (#ffffff) | Prato Dragons |
| CUS FIRENZE | `cus-firenze` | Rosso (#dc2626) | Bianco (#ffffff) | Cus Firenze |
| VALDISIEVE | `valdisieve` | Ciano (#0891b2) | Bianco (#ffffff) | Valdisieve |
| FIDES MONTEVARCHI | `fides-montevarchi` | Viola (#7c3aed) | Bianco (#ffffff) | Montevarchi |
| BOTTEGONE | `bottegone` | Marrone (#7c2d12) | Bianco (#ffffff) | Bottegone |
| PINO FIRENZE | `pino-firenze` | Verde (#059669) | Bianco (#ffffff) | Pino Firenze |
| VIRTUS CERTALDO | `virtus-certaldo` | Grigio (#1f2937) | Bianco (#ffffff) | Certaldo |
| ABC CASTELFIORENTINO | `abc-castelfiorentino` | Verde (#059669) | Bianco (#ffffff) | Castelfiorentino |
| DON BOSCO LIVORNO | `don-bosco-livorno` | Verde (#059669) | Bianco (#ffffff) | Don Bosco |
| BASKET SEI ROSE | `us-sei-rose` | Rosa (#be185d) | Bianco (#ffffff) | Sei Rose |
| POLISPORTIVA SANCAT | `polisportiva-sancat` | Blu (#1e40af) | Bianco (#ffffff) | Sancat |
| UNION BASKET PRATO | `union-basket-prato` | Blu (#1e40af) | Bianco (#ffffff) | Union Prato |

## 📋 Checklist Caricamento

### ✅ Loghi Presenti
- [x] `logo-svb.png` - BASKET SAN VINCENZO
- [x] `us-livorno.png` - U.S. LIVORNO BASKET  
- [x] `folgore-fucecchio.png` - FOLGORE FUCECCHIO
- [x] `union-basket-prato.jpg` - UNION BASKET PRATO

### ❌ Loghi Mancanti (16 squadre)
- [ ] `endiasfalti-agliana.png` - ENDIASFALTI PALL. AGLIANA 2000
- [ ] `pall-sansepolcro.png` - PALL. SANSEPOLCRO
- [ ] `prato-dragons.png` - PALLACANESTRO PRATO DRAGONS
- [ ] `cus-firenze.png` - CUS FIRENZE
- [ ] `valdisieve.png` - VALDISIEVE
- [ ] `fides-montevarchi.png` - FIDES P. MONTEVARCHI
- [ ] `bottegone.png` - BOTTEGONE BASKET 2001
- [ ] `pino-firenze.png` - UNIONE SPORTIVA PINO FIRENZE
- [ ] `virtus-certaldo.png` - VIRTUS CERTALDO
- [ ] `abc-castelfiorentino.png` - ABC CASTELFIORENTINO
- [ ] `don-bosco-livorno.png` - PALL. DON BOSCO LIVORNO
- [ ] `us-sei-rose.png` - U S BASKET SEI ROSE
- [ ] `polisportiva-sancat.png` - POLISPORTIVA SANCAT

## 🛠️ Come Testare

1. **Carica il logo** nella cartella `public/img/teams/`
2. **Riavvia il server** di sviluppo: `npm run dev`
3. **Vai alla home** del sito
4. **Verifica** che il logo appaia correttamente
5. **Elimina temporaneamente** il logo per testare il fallback

## 🎯 Campionati Supportati

Il sistema supporta 2 tipi di campionato con badge colorati distintivi:

### 🏆 Serie C
- **Badge**: Blu con icona trofeo
- **Colore**: `bg-blue-600`
- **Icona**: Trophy

### 🏆 Coppa Toscana
- **Badge**: Rosso con icona trofeo
- **Colore**: `bg-red-600`
- **Icona**: Trophy

## 🔧 Personalizzazione

Per modificare i colori di fallback, editare il file:
```
src/data/calendar-system.json
```

E aggiornare l'oggetto `colors` per ogni squadra nella sezione `teams`.

## 📊 Statistiche

- **Totale squadre**: 17
- **Loghi presenti**: 4
- **Loghi mancanti**: 13
- **Percentuale completamento**: 23.5%

**Obiettivo**: Raggiungere il 100% per una visualizzazione ottimale di tutte le squadre! 🎯 