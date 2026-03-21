# Configurazione token GitHub per il workflow n8n

## Token

Crea un **Personal Access Token** su [Impostazioni GitHub → Developer settings → Tokens](https://github.com/settings/tokens) con scope **`repo`** (lettura e scrittura sul repository).

Non inserire il token in repository pubblici: configuralo nei nodi HTTP in n8n o usa le **Credentials** di n8n.

Nei workflow esportati in questo repo, l’header `Authorization` usa l’espressione `={{ 'token ' + $env.GITHUB_TOKEN }}`. Imposta la variabile d’ambiente **`GITHUB_TOKEN`** nell’istanza n8n (o sostituisci manualmente l’header con `token <IL_TUO_PAT>` dopo l’import).

---

## Opzione 1: Importa il workflow

1. Importa `07-basket-stats-READY.json` o `07-basket-stats-FINAL-WORKING.json` in n8n.
2. Apri i nodi **Get SHA** e **Update GitHub** e imposta l’header `Authorization` su `token <IL_TUO_TOKEN>`.

---

## Opzione 2: Aggiorna un workflow esistente

### Nodi Get SHA e Update GitHub

- **Options** → **Headers** → **Authorization**: `token <IL_TUO_TOKEN>`

### Nodo Update GitHub (body)

Il body deve usare **parametri singoli**, non solo JSON grezzo:

1. Disattiva "JSON Parameters" se presente.
2. In **Body Parameters** aggiungi: `message`, `content`, `sha`, `branch` con valori `={{$json.message}}`, ecc. (come nel file READY).

---

## Test

Esegui il workflow manualmente in n8n e verifica che **Update GitHub** non restituisca 403 o 422.

Test API (sostituisci il token):

```bash
curl -H "Authorization: token YOUR_TOKEN_HERE" \
  https://api.github.com/repos/magiaslab/svbtailwindok3/contents/src/data/stats/serie-c-stats.json
```

---

## Problemi noti risolti

- **403** — token senza permesso di scrittura: serve scope `repo` adeguato.
- **422** — `content`, `message`, `sha` non inviati correttamente: usare body parameters come sopra.

---

## Cron

Lunedì e giovedì alle 08:00: `0 8 * * 1,4`
