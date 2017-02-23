$(function () {
    var myChart = Highcharts.chart('stats-blocks', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Blocks'
        },
        xAxis: {

          labels:
        {
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
              return 'Block in email: <b>' + this.y;
          }
      },
        series: [{
            name: 'Block in email over time',
            labels: false,
            data: [20, 24, 26, 30, 5]
        }]
    });
});
