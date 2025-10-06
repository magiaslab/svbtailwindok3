# 🚀 Trigger Deploy Netlify

## 📋 Come Triggerare un Deploy Manuale

### Metodo 1: Build Hook (Raccomandato)

Se hai configurato un Build Hook in Netlify:

```bash
curl -X POST https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

### Metodo 2: Dashboard Netlify

1. Vai su [Netlify Dashboard](https://app.netlify.com/)
2. Seleziona il sito `svbtailwindok3`
3. Vai su "Deploys"
4. Clicca "Trigger deploy" → "Deploy site"

### Metodo 3: Git Push (Automatico)

Il deploy dovrebbe essere automatico quando fai push su `master`. Se non funziona:

1. Controlla le impostazioni di deploy in Netlify
2. Verifica che il branch sia impostato su `master`
3. Controlla i log di build per errori

## 🔍 Verificare lo Stato del Deploy

### Controllare l'ultimo deploy:
```bash
# Verifica se il sito è aggiornato
curl -I https://svbtailwindok3.netlify.app/

# Controlla l'API delle statistiche
curl https://svbtailwindok3.netlify.app/api/stats
```

### Log di Deploy
1. Vai su Netlify Dashboard
2. Seleziona il sito
3. Vai su "Deploys"
4. Clicca sull'ultimo deploy per vedere i log

## ⚠️ Possibili Problemi

### API Non Disponibile
- L'endpoint `/api/stats` potrebbe non essere buildato correttamente
- Controlla i log di build per errori TypeScript/Astro
- Verifica che il file `src/pages/api/stats.ts` sia corretto

### Cache Issues
- Netlify potrebbe avere cache attiva
- Prova con `?v=timestamp` nell'URL per bypassare la cache
- Esempio: `https://svbtailwindok3.netlify.app/api/stats?v=1727551200`

### Build Errors
- Controlla i log di build in Netlify
- Verifica che non ci siano errori TypeScript
- Assicurati che tutti i file necessari siano presenti

## 🎯 Test Rapido

Dopo il deploy, testa questi endpoint:

```bash
# Homepage
curl -s https://svbtailwindok3.netlify.app/ | grep -i "title"

# API Stats
curl -s https://svbtailwindok3.netlify.app/api/stats | jq '.standings | length'

# File JSON diretto
curl -s https://svbtailwindok3.netlify.app/stats/serie-c-stats.json | jq '.standings | length'
```

Se tutti e tre funzionano, il deploy è riuscito!

