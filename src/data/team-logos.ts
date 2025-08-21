// Mappatura loghi squadre Serie C
// Questo file mappa i nomi delle squadre ai loro loghi

export const teamLogos: Record<string, string> = {
  // Squadre con loghi disponibili
  "ABC Castelfiorentino": "/img/seriec/abc-castelfiorentino.png",
  "Basket San Vincenzo": "/img/logo svb.png", // Logo SVB
  "Basket Sei Rose": "/img/seriec/basket-sei-rose.png",
  "Bottegone S.Angelo": "/img/seriec/bottegone-sangelo.png",
  "CUS Firenze": "/img/seriec/cus-firenze.png",
  "Don Bosco Livorno": "/img/seriec/don-bosco-livorno.png",
  "Forte dei Marmi": "/img/seriec/forte-dei-marmi.png",
  "Giglio Basket": "/img/seriec/giglio-basket.png",
  "Livorno Basket": "/img/seriec/livorno-basket.png",
  "Monsummano": "/img/seriec/monsummano.png",
  "Pisa Basket": "/img/seriec/pisa-basket.png",
  "Pistoia Basket": "/img/seriec/pistoia-basket.png",
  "Prato Basket": "/img/seriec/prato-basket.png",
  "San Miniato": "/img/seriec/san-miniato.png",
  "Siena Basket": "/img/seriec/siena-basket.png",
  "Tirrenia": "/img/seriec/tirrenia.png",
  "Viareggio": "/img/seriec/viareggio.png"
};

// Funzione per ottenere il logo di una squadra con fallback
export function getTeamLogo(teamName: string): string {
  return teamLogos[teamName] || "/img/logo-default.png"; // Logo di default se non trovato
}

// Funzione per verificare se un logo esiste
export function hasTeamLogo(teamName: string): boolean {
  return teamName in teamLogos;
}
