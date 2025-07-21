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

**Esempi:**
- `don-bosco-livorno.png`
- `montevarchi.png`
- `dukes-sansepolcro.png`
- `valdisieve.png`
- `agliana.png`
- `prato-2000.png`
- `bottegone.png`
- `pino-firenze.png`
- `sancat-firenze.png`
- `cus-firenze.png`
- `castelfiorentino.png`
- `sel-rose.png`
- `virtus-certaldo.png`

## 🔄 Sistema di Fallback

Se un logo non è disponibile, il sistema mostrerà automaticamente:
- **Iniziali della squadra** (es. "SVB" per San Vincenzo Basket)
- **Colori personalizzati** della squadra
- **Gradiente** con i colori ufficiali

### Colori di Fallback Configurati

| Squadra | Colore Primario | Colore Secondario |
|---------|----------------|-------------------|
| SVB | Blu (#1e40af) | Giallo (#fbbf24) |
| Livorno | Rosso (#dc2626) | Bianco (#ffffff) |
| Don Bosco | Verde (#059669) | Bianco (#ffffff) |
| Montevarchi | Viola (#7c3aed) | Bianco (#ffffff) |
| Dukes | Grigio (#1f2937) | Arancione (#f59e0b) |
| Valdisieve | Ciano (#0891b2) | Bianco (#ffffff) |
| Agliana | Verde (#059669) | Bianco (#ffffff) |
| Prato 2000 | Rosso (#dc2626) | Bianco (#ffffff) |
| Union Prato | Blu (#1e40af) | Bianco (#ffffff) |
| Bottegone | Marrone (#7c2d12) | Bianco (#ffffff) |
| Pino Firenze | Verde (#059669) | Bianco (#ffffff) |
| Sancat | Blu (#1e40af) | Bianco (#ffffff) |
| Cus Firenze | Rosso (#dc2626) | Bianco (#ffffff) |
| Fucecchio | Viola (#7c3aed) | Bianco (#ffffff) |
| Castelfiorentino | Verde (#059669) | Bianco (#ffffff) |
| Sel Rose | Rosa (#be185d) | Bianco (#ffffff) |
| Virtus Certaldo | Grigio (#1f2937) | Bianco (#ffffff) |

## 📋 Checklist Caricamento

- [ ] Logo in formato PNG/JPG
- [ ] Dimensioni 200x200px o superiori
- [ ] Nome file corretto (es. `don-bosco-livorno.png`)
- [ ] Posizionato in `public/img/teams/`
- [ ] Testato nel browser
- [ ] Verificato fallback funzionante

## 🛠️ Come Testare

1. **Carica il logo** nella cartella corretta
2. **Riavvia il server** di sviluppo: `npm run dev`
3. **Vai alla home** del sito
4. **Verifica** che il logo appaia correttamente
5. **Elimina temporaneamente** il logo per testare il fallback

## 🎯 Campionati Supportati

Il sistema supporta 3 tipi di campionato con badge colorati distintivi:

### 🏆 Serie C
- **Badge**: Blu con icona trofeo
- **Colore**: `bg-blue-600`
- **Icona**: Trophy

### 👥 Under 20
- **Badge**: Verde con icona utenti
- **Colore**: `bg-green-600`
- **Icona**: Users

### 👶 Under 15
- **Badge**: Viola con icona bambino
- **Colore**: `bg-purple-600`
- **Icona**: Baby

## 🔧 Personalizzazione

Per modificare i colori di fallback, editare il file:
```
src/components/TeamLogo.astro
```

E aggiornare l'oggetto `fallbackColors`. 