# 🔐 Setup Credenziali GitHub per N8N

## 📋 Prerequisiti

1. **GitHub Personal Access Token** con permessi `Contents: Write`
2. **N8N** con accesso alle credenziali

## 🚀 Configurazione Passo-Passo

### 1. Creare GitHub Personal Access Token

1. Vai su GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clicca "Generate new token (classic)"
3. Imposta:
   - **Name**: `N8N Basket Scraper`
   - **Expiration**: `90 days` (o come preferisci)
   - **Scopes**: Seleziona `repo` (include automaticamente `Contents: Write`)
4. Clicca "Generate token"
5. **COPIA IL TOKEN** (non lo vedrai più!)

### 2. Configurare Credenziali in N8N

1. In N8N, vai su **Credentials** (icona chiave)
2. Clicca **"+ Add Credential"**
3. Cerca e seleziona **"Header Auth"**
4. Configura:
   - **Name**: `GitHub API Token`
   - **Header Name**: `Authorization`
   - **Header Value**: `token TUO_GITHUB_TOKEN_QUI`
   
   ⚠️ **IMPORTANTE**: Il valore deve essere `token ` seguito dal tuo token, esempio:
   ```
   token ghp_1234567890abcdef1234567890abcdef12345678
   ```

5. Clicca **"Save"**

### 3. Usare le Credenziali nei Workflow

Nei nodi HTTP Request per GitHub API:
1. Imposta **Authentication**: `Header Auth`
2. Seleziona la credenziale **"GitHub API Token"** creata sopra

## 🧪 Test delle Credenziali

Per testare se le credenziali funzionano, puoi usare questo comando curl:

```bash
curl -H "Authorization: token TUO_TOKEN" \
     https://api.github.com/repos/magiaslab/svbtailwindok3/contents/src/data/stats/serie-c-stats.json
```

Se funziona, dovresti vedere i dettagli del file JSON.

## 🔧 Workflow che Usano le Credenziali

- `n8n-basket-test-update.json` - Test aggiornamento singolo file
- `n8n-basket-complete-final.json` - Workflow completo

## ⚠️ Note di Sicurezza

1. **Non condividere mai il token** con nessuno
2. **Usa scadenze ragionevoli** per i token (30-90 giorni)
3. **Rigenera il token** se sospetti sia compromesso
4. **Usa solo i permessi necessari** (in questo caso `repo`)

## 🐛 Troubleshooting

### Errore "Bad credentials"
- Verifica che il token sia corretto
- Controlla che sia preceduto da `token ` (con spazio)
- Assicurati che il token non sia scaduto

### Errore "Not Found"
- Verifica che il repository sia corretto: `magiaslab/svbtailwindok3`
- Controlla che il path del file sia corretto

### Errore "Forbidden"
- Il token non ha i permessi necessari
- Rigenera il token con scope `repo`

