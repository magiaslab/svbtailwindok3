import type { APIRoute } from 'astro';
import calendarData from '../../data/calendar-system.json';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get('team') || 'svb';
    const competition = url.searchParams.get('competition');
    const limit = parseInt(url.searchParams.get('limit') || '3');

    let matches = calendarData.matches;

    // Filtra per squadra
    if (teamId) {
      matches = matches.filter(match => 
        match.homeTeam === teamId || match.awayTeam === teamId
      );
    }

    // Filtra per competizione
    if (competition) {
      matches = matches.filter(match => match.competition === competition);
    }

    // Filtra solo partite future
    const now = new Date();
    matches = matches.filter(match => new Date(match.date) > now);

    // Ordina per data
    matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Limita il numero di risultati
    matches = matches.slice(0, limit);

    // Aggiungi informazioni delle squadre e competizioni
    const enrichedMatches = matches.map(match => ({
      ...match,
      homeTeamData: calendarData.teams[match.homeTeam as keyof typeof calendarData.teams],
      awayTeamData: calendarData.teams[match.awayTeam as keyof typeof calendarData.teams],
      competitionData: calendarData.competitions[match.competition as keyof typeof calendarData.competitions],
      isHome: match.homeTeam === teamId,
      timeUntil: new Date(match.date).getTime() - now.getTime()
    }));

    return new Response(JSON.stringify({
      success: true,
      data: enrichedMatches,
      total: enrichedMatches.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache per 5 minuti
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Errore nel recupero dei dati del calendario'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Qui potresti aggiungere logica per aggiornare i dati del calendario
    // Per ora restituiamo solo un successo
    return new Response(JSON.stringify({
      success: true,
      message: 'Dati del calendario aggiornati con successo'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Errore nell\'aggiornamento dei dati'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 