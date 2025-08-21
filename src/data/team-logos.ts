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
  "Dukes Sansepolcro": "/img/teams/dukes-sansepolcro.png",
  "Fides Montevarchi": "/img/teams/logo_000391_U.S.D.FidesP.Montevarchi.png",
  "Folgore Fucecchio": "/img/teams/logo_004714_G.S.FolgorePallacanestroFucecchio.png",
  "Pall. Prato": "/img/teams/logo_045426_Pall.2000Prato.png",
  "Pallacanestro Agliana": "/img/teams/endiasfalti-agliana.png",
  "Pall. Valdisieve": "/img/teams/logo_003487_ValdisieveBasket1975.png",
  "Pino Dragons Firenze": "/img/teams/logo_035117_PinoDragonsBKFirenze.png",
  "Sancat Firenze": "/img/teams/logo_050932_Sancat.png",
  "Union Basket Prato": "/img/teams/logo_051850_PratoBasketGiovane.png",
  "US Livorno": "/img/teams/logo_016720_U.D.D.LivornoBasket.png",
  "Virtus Certaldo": "/img/teams/logo_040215_S.S.VirtusCertaldo.png"
};

// Funzione per ottenere il logo di una squadra con fallback
export function getTeamLogo(teamName: string): string {
  return teamLogos[teamName] || "/img/logo-default.svg"; // Logo di default se non trovato
}

// Funzione per verificare se un logo esiste
export function hasTeamLogo(teamName: string): boolean {
  return teamName in teamLogos;
}
