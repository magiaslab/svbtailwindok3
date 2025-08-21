import React, { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { getTeamLogo } from '../data/team-logos';
import StatsCharts from './StatsCharts';

interface Team {
  position: number;
  team: string;
  teamId: string;
  teamLink: string;
  points: number;
  pointsPerGame: number;
  games: number;
  wins: number;
  losses: number;
  percentage: number;
  streak: string;
  pointsFor: number;
  pointsAgainst: number;
  quality: string;
  pointsForPerGame: number;
  pointsAgainstPerGame: number;
}

interface StatsData {
  standings: Team[];
  lastUpdate: string;
  season: string;
  competition: string;
  conference: string;
  group: string;
  source: string;
  totalTeams: number;
  status: string;
}

interface Props {
  showTitle?: boolean;
  showCharts?: boolean;
  maxTeams?: number;
}

const StatisticsTable: React.FC<Props> = ({ showTitle = true, showCharts = true, maxTeams = 17 }) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Prova prima con l'endpoint API
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          
          // Controlla se i dati sono vuoti o contengono errori
          if (data.standings && data.standings.length > 0 && !data.error) {
            setStats(data);
            console.log('📊 Statistiche caricate dall\'API:', data.standings.length, 'squadre');
          } else {
            // Se i dati sono vuoti o contengono errori, usa il fallback
            console.log('⚠️ Dati API vuoti o con errori, uso fallback');
            const fallbackResponse = await fetch('/stats/serie-c-stats-example.json');
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              setStats(fallbackData);
              console.log('🔄 Usando dati di fallback:', fallbackData.standings.length, 'squadre');
            } else {
              throw new Error('Impossibile caricare le statistiche');
            }
          }
        } else {
          // Se l'API fallisce, usa i dati dalla cartella public
          const fallbackResponse = await fetch('/stats/serie-c-stats-example.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setStats(fallbackData);
            console.log('🔄 Usando dati di fallback:', fallbackData.standings.length, 'squadre');
          } else {
            throw new Error('Impossibile caricare le statistiche');
          }
        }
      } catch (err) {
        console.error('❌ Errore caricamento statistiche:', err);
        setError('Statistiche non disponibili');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatPercentage = (value: number): string => {
    return (value * 100).toFixed(1) + '%';
  };

  const getPositionIcon = (position: number): string => {
    if (position <= 8) return 'trophy'; // Prime 8 squadre - coppa
    if (position === 9) return 'star'; // 9a squadra - stella
    return 'zap'; // Altre - fulmine
  };

  const getPositionColor = (position: number): string => {
    if (position <= 8) return 'text-green-400'; // Prime 8 squadre - verde
    if (position === 9) return 'text-yellow-400'; // 9a squadra - giallo
    return 'text-red-600'; // Altre - rosso ancora più forte
  };

  const getPositionStyle = (position: number): React.CSSProperties => {
    if (position <= 8) return { color: '#4ade80' }; // Verde
    if (position === 9) return { color: '#facc15' }; // Giallo
    return { color: '#dc2626' }; // Rosso
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
                📊 Statistiche Serie C
              </h2>
            </div>
          )}
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 text-6xl mb-6">⏳</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Caricamento statistiche...
            </h3>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
                📊 Statistiche Serie C
              </h2>
            </div>
          )}
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 text-6xl mb-6">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Statistiche non disponibili"}
            </h3>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Le statistiche si aggiorneranno automaticamente quando il campionato inizierà
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayTeams = stats.standings.slice(0, maxTeams);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
              Statistiche Serie C
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Classifica aggiornata {stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleDateString('it-IT') : 'in tempo reale'}
            </p>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
              <h3 className="text-xl font-bold text-white">Classifica Serie C</h3>
              <p className="text-sm text-blue-100 mt-1">Fase: Conference NordOvest - Italiana • Girone: Girone C</p>
            </div>
            
            {/* Messaggio informativo per valori a zero */}
            {stats.standings[0]?.points === 0 && (
              <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <LucideIcon name="info" size={20} className="mr-2" />
                  <span className="text-sm font-medium">
                    Campionato non ancora iniziato - I valori si aggiorneranno automaticamente quando inizieranno le partite
                  </span>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Squadra</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Pt</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">G</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">V</th>
                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{color: '#dc2626'}}>P</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">%</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">PF</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">PS</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {displayTeams.map((team, index) => (
                    <tr key={team.teamId} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${team.team === 'Basket San Vincenzo' ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <LucideIcon name={getPositionIcon(team.position)} size={20} style={getPositionStyle(team.position)} />
                          </div>
                          <span className="text-sm font-medium" style={getPositionStyle(team.position)}>
                            {team.position}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            <img 
                              src={getTeamLogo(team.team)} 
                              alt={`Logo ${team.team}`}
                              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                console.warn(`⚠️ Logo non caricato per ${team.team}, uso fallback`);
                                target.src = '/img/logo-default.svg';
                              }}
                              onLoad={() => {
                                console.log(`✅ Logo caricato correttamente per ${team.team}`);
                              }}
                            />
                          </div>
                          <div>
                            <div className={`text-sm font-medium text-white ${team.team === 'Basket San Vincenzo' ? 'font-bold' : ''}`}>
                              {team.team}
                              {team.team === 'Basket San Vincenzo' && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  SVB
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-semibold text-white">{team.points}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-white">{team.games}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-green-500 font-medium">{team.wins}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-medium" style={{color: '#dc2626'}}>{team.losses}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-white font-medium">{formatPercentage(team.percentage)}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-white">{team.pointsFor}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-white">{team.pointsAgainst}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Grafici Statistiche */}
        {showCharts && (
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LucideIcon name="basketball" size={24} className="mr-2 text-blue-600" />
                Grafici Statistiche Dettagliate
              </h3>
              <StatsCharts standings={stats.standings} />
            </div>
          </div>
        )}

        {/* Footer con info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            <LucideIcon name="basketball" size={16} className="mr-2" />
            <span>
              Dati aggiornati da {stats.source} • Ultimo aggiornamento: {new Date(stats.lastUpdate).toLocaleString('it-IT')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsTable;
