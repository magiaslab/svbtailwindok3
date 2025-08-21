// Mappatura loghi squadre Serie C
// Questo file mappa i nomi delle squadre ai loro loghi

export const teamLogos: Record<string, string> = {
  // Squadre con loghi disponibili nella cartella teams/
  "ABC Castelfiorentino": "/img/teams/castelfiorentino.png",
  "Basket San Vincenzo": "/img/logo svb.png", // Logo SVB principale
  "Basket Sei Rose": "/img/teams/logo_006457_U.S.BasketSeiRose.png",
  "Bottegone S.Angelo": "/img/teams/logo_046751_BottegoneBasketS.Angelo.png",
  "CUS Firenze": "/img/teams/logo_000381_CUSFirenze.png",
  "Don Bosco Livorno": "/img/teams/logo_037420_Pall.DonBosco.png",
  "Forte dei Marmi": "/img/teams/forte-dei-marmi.png", // Da creare
  "Giglio Basket": "/img/teams/giglio-basket.png", // Da creare
  "Livorno Basket": "/img/teams/logo_016720_U.D.D.LivornoBasket.png",
  "Monsummano": "/img/teams/monsummano.png", // Da creare
  "Pisa Basket": "/img/teams/pisa-basket.png", // Da creare
  "Pistoia Basket": "/img/teams/pistoia-basket.png", // Da creare
  "Prato Basket": "/img/teams/logo_051850_PratoBasketGiovane.png",
  "San Miniato": "/img/teams/san-miniato.png", // Da creare
  "Siena Basket": "/img/teams/siena-basket.png", // Da creare
  "Tirrenia": "/img/teams/tirrenia.png", // Da creare
  "Viareggio": "/img/teams/viareggio.png" // Da creare
};

// Funzione per ottenere il logo di una squadra con fallback
export function getTeamLogo(teamName: string): string {
  return teamLogos[teamName] || "/img/logo-default.png"; // Logo di default se non trovato
}

// Funzione per verificare se un logo esiste
export function hasTeamLogo(teamName: string): boolean {
  return teamName in teamLogos;
}
