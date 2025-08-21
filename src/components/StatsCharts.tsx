import React, { useEffect, useRef, useState } from 'react';

interface TeamStanding {
  position: number;
  team: string;
  points: number;
  games: number;
  wins: number;
  losses: number;
  percentage: number;
  pointsFor: number;
  pointsAgainst: number;
}

interface StatsChartsProps {
  standings: TeamStanding[];
  className?: string;
}

const StatsCharts: React.FC<StatsChartsProps> = ({ standings, className = "" }) => {
  const chartRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !standings || standings.length === 0) return;

    // Carica ApexCharts dinamicamente solo lato client
    const loadCharts = async () => {
      try {
        const ApexCharts = (await import('apexcharts')).default;
        
        // Grafico 1: Punti per posizione
        if (chartRefs.current.pointsChart) {
          const pointsOptions = {
            series: [{
              name: 'Punti',
              data: standings.map(team => team.points)
            }],
            chart: {
              type: 'bar',
              height: 300,
              toolbar: {
                show: false
              },
              background: 'transparent'
            },
            colors: ['#3b82f6'],
            plotOptions: {
              bar: {
                borderRadius: 8,
                horizontal: false,
                distributed: true,
                dataLabels: {
                  position: 'top'
                }
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val: number) {
                return val.toString();
              },
              style: {
                fontSize: '12px',
                colors: ['#ffffff']
              }
            },
            xaxis: {
              categories: standings.map(team => team.team.length > 15 ? team.team.substring(0, 15) + '...' : team.team),
              labels: {
                style: {
                  colors: '#6b7280',
                  fontSize: '10px'
                },
                rotate: -45
              }
            },
            yaxis: {
              title: {
                text: 'Punti',
                style: {
                  color: '#6b7280'
                }
              },
              labels: {
                style: {
                  colors: '#6b7280'
                }
              }
            },
            grid: {
              borderColor: '#e5e7eb',
              strokeDashArray: 4
            },
            title: {
              text: 'Punti per Squadra',
              align: 'center',
              style: {
                color: '#374151',
                fontSize: '16px',
                fontWeight: 'bold'
              }
            }
          };

          const pointsChart = new ApexCharts(chartRefs.current.pointsChart, pointsOptions);
          pointsChart.render();
        }

        // Grafico 2: Vittorie vs Sconfitte (Top 8)
        if (chartRefs.current.winsLossesChart) {
          const top8 = standings.slice(0, 8);
          const winsLossesOptions = {
            series: [
              {
                name: 'Vittorie',
                data: top8.map(team => team.wins)
              },
              {
                name: 'Sconfitte',
                data: top8.map(team => team.losses)
              }
            ],
            chart: {
              type: 'bar',
              height: 300,
              stacked: true,
              toolbar: {
                show: false
              },
              background: 'transparent'
            },
            colors: ['#10b981', '#ef4444'],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 6
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val: number) {
                return val.toString();
              }
            },
            xaxis: {
              categories: top8.map(team => team.team.length > 12 ? team.team.substring(0, 12) + '...' : team.team),
              labels: {
                style: {
                  colors: '#6b7280',
                  fontSize: '10px'
                },
                rotate: -45
              }
            },
            yaxis: {
              title: {
                text: 'Partite',
                style: {
                  color: '#6b7280'
                }
              },
              labels: {
                style: {
                  colors: '#6b7280'
                }
              }
            },
            grid: {
              borderColor: '#e5e7eb',
              strokeDashArray: 4
            },
            title: {
              text: 'Vittorie vs Sconfitte (Top 8)',
              align: 'center',
              style: {
                color: '#374151',
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'center'
            }
          };

          const winsLossesChart = new ApexCharts(chartRefs.current.winsLossesChart, winsLossesOptions);
          winsLossesChart.render();
        }

        // Grafico 3: Differenza Punti (PF - PS)
        if (chartRefs.current.pointsDiffChart) {
          const pointsDiffOptions = {
            series: [{
              name: 'Differenza Punti',
              data: standings.map(team => team.pointsFor - team.pointsAgainst)
            }],
            chart: {
              type: 'line',
              height: 300,
              toolbar: {
                show: false
              },
              background: 'transparent'
            },
            colors: ['#8b5cf6'],
            stroke: {
              curve: 'smooth',
              width: 3
            },
            markers: {
              size: 6,
              colors: ['#8b5cf6'],
              strokeColors: '#ffffff',
              strokeWidth: 2
            },
            dataLabels: {
              enabled: true,
              formatter: function (val: number) {
                return val > 0 ? `+${val}` : val.toString();
              },
              style: {
                fontSize: '10px',
                colors: ['#6b7280']
              }
            },
            xaxis: {
              categories: standings.map(team => team.team.length > 12 ? team.team.substring(0, 12) + '...' : team.team),
              labels: {
                style: {
                  colors: '#6b7280',
                  fontSize: '10px'
                },
                rotate: -45
              }
            },
            yaxis: {
              title: {
                text: 'Differenza Punti',
                style: {
                  color: '#6b7280'
                }
              },
              labels: {
                style: {
                  colors: '#6b7280'
                }
              }
            },
            grid: {
              borderColor: '#e5e7eb',
              strokeDashArray: 4
            },
            title: {
              text: 'Differenza Punti Fatti/Subiti',
              align: 'center',
              style: {
                color: '#374151',
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                gradientToColors: ['#8b5cf6'],
                inverseColors: false,
                opacityFrom: 0.3,
                opacityTo: 0.1,
                stops: [0, 100]
              }
            }
          };

          const pointsDiffChart = new ApexCharts(chartRefs.current.pointsDiffChart, pointsDiffOptions);
          pointsDiffChart.render();
        }

        // Grafico 4: Percentuale Vittorie (Doughnut)
        if (chartRefs.current.percentageChart) {
          const svbTeam = standings.find(team => team.team === 'Basket San Vincenzo');
          if (svbTeam) {
            const percentageOptions = {
              series: [svbTeam.percentage * 100, (1 - svbTeam.percentage) * 100],
              chart: {
                type: 'donut',
                height: 300,
                background: 'transparent'
              },
              colors: ['#3b82f6', '#e5e7eb'],
              labels: ['Vittorie', 'Sconfitte'],
              dataLabels: {
                enabled: true,
                formatter: function (val: number) {
                  return val.toFixed(1) + '%';
                },
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold'
                }
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '60%',
                    labels: {
                      show: true,
                      name: {
                        show: true,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#374151'
                      },
                      value: {
                        show: true,
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#3b82f6'
                      }
                    }
                  }
                }
              },
              title: {
                text: `${svbTeam.team} - Percentuale Vittorie`,
                align: 'center',
                style: {
                  color: '#374151',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }
              },
              legend: {
                position: 'bottom'
              }
            };

            const percentageChart = new ApexCharts(chartRefs.current.percentageChart, percentageOptions);
            percentageChart.render();
          }
        }
      } catch (error) {
        console.error('Errore nel caricamento dei grafici:', error);
      }
    };

    loadCharts();
  }, [isClient, standings]);

  if (!isClient) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Caricamento grafici...</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}>
      {/* Grafico 1: Punti per Squadra */}
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
        <div ref={(el) => chartRefs.current.pointsChart = el}></div>
      </div>

      {/* Grafico 2: Vittorie vs Sconfitte */}
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
        <div ref={(el) => chartRefs.current.winsLossesChart = el}></div>
      </div>

      {/* Grafico 3: Differenza Punti */}
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
        <div ref={(el) => chartRefs.current.pointsDiffChart = el}></div>
      </div>

      {/* Grafico 4: Percentuale Vittorie SVB */}
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
        <div ref={(el) => chartRefs.current.percentageChart = el}></div>
      </div>
    </div>
  );
};

export default StatsCharts;
