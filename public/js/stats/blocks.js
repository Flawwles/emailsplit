$(function() {
  var avgNumber = document.getElementById("avg-number");
  var scripRun = document.getElementById("run-number");
	var myChart = Highcharts.chart('stats-blocks', {
		chart: {
			type: 'line'
		},
		title: {
			text: 'Blocks',
			style: {
				fontFamily: "\"Roboto\", sans-serif",
				fontSize: "1.5rem",
				fontWeight: "300",
				color: '#797979'
			}
		},
		xAxis: {
			labels: {
				enabled: false
			}
		},
		yAxis: {
			title: {
				text: 'Blocks in template'
			}
		},
		tooltip: {
			formatter: function() {
				return 'Blocks in email: <b>' + this.y;
			}
		},
		series: [{
			name: 'Block in email over time',
			labels: false,
			data: []
		}]
	});
	$.getJSON('http://localhost:3000/logs/log.json', function(stats) {
		myChart.series[0].setData(stats.data);
    scripRun.innerHTML = stats.data.length;
    avgNumber.innerHTML = createAverage(stats.data);
    scripRun.className += ' loaded';
    avgNumber.className += ' loaded';
	});

  function createAverage(array) {
    var totalNumber = 0,
        averageValue = 0;

    array.forEach(function(number) {
      totalNumber += number;
      averageValue = Math.round(totalNumber / array.length);
    });
    return averageValue;
  }
});
