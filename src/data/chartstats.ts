import ApexCharts from 'apexcharts';

const getMainChartOptions = () => {
	let mainChartColors = {};

	if (document.documentElement.classList.contains('dark')) {
		mainChartColors = {
			borderColor: '#374151',
			labelColor: '#9CA3AF',
			opacityFrom: 0,
			opacityTo: 0.15,
		};
	} else {
		mainChartColors = {
			borderColor: '#F3F4F6',
			labelColor: '#6B7280',
			opacityFrom: 0.45,
			opacityTo: 0,
		};
	}

	return {
		chart: {
			height: 420,
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			foreColor: mainChartColors.labelColor,
			toolbar: {
				show: false,
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				enabled: true,
				opacityFrom: mainChartColors.opacityFrom,
				opacityTo: mainChartColors.opacityTo,
			},
		},
		dataLabels: {
			enabled: false,
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif',
			},
		},
		grid: {
			show: true,
			borderColor: mainChartColors.borderColor,
			strokeDashArray: 1,
			padding: {
				left: 35,
				bottom: 15,
			},
		},
		series: [
			{
				name: 'Punti Fatti',
				data: [81, 89, 76, 83, 78],
				color: '#1A56DB',
			},
			{
				name: 'Punti Subiti',
				data: [72, 52, 74, 80, 67],
				color: '#FDBA8C',
			},
		],
		markers: {
			size: 5,
			strokeColors: '#ffffff',
			hover: {
				size: undefined,
				sizeOffset: 3,
			},
		},
		xaxis: {
			categories: [
				'US Livorno',
				'NBA Altopascio',
				'Folgore Fucecchio',
				'Valdisieve',
				'Costone Siena',
				
			],
			labels: {
				style: {
					colors: [mainChartColors.labelColor],
					fontSize: '14px',
					fontWeight: 500,
				},
			},
			axisBorder: {
				color: mainChartColors.borderColor,
			},
			axisTicks: {
				color: mainChartColors.borderColor,
			},
			crosshairs: {
				show: true,
				position: 'back',
				stroke: {
					color: mainChartColors.borderColor,
					width: 1,
					dashArray: 10,
				},
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: [mainChartColors.labelColor],
					fontSize: '14px',
					fontWeight: 500,
				},
				
			},
		},
		legend: {
			fontSize: '14px',
			fontWeight: 500,
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: [mainChartColors.labelColor],
			},
			itemMargin: {
				horizontal: 10,
			},
		},
		responsive: [
			{
				breakpoint: 1024,
				options: {
					xaxis: {
						labels: {
							show: false,
						},
					},
				},
			},
		],
	};
};

if (document.getElementById('main-chart')) {
	const chart = new ApexCharts(
		document.getElementById('main-chart'),
		getMainChartOptions(),
	);
	chart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', () => {
		chart.updateOptions(getMainChartOptions());
	});
}
