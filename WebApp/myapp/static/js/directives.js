'use strict';


/* Directives */
angular.module('angularFlask')
  // Directive for line chart , pass in title and data only  
.directive('hcChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        options: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], scope.options);
                    }
                };
            })
.directive('hcActivityGauge', function() {
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        title: '@',
        data: '='
      },
      link: function(scope, element) {
        Highcharts.chart(element[0], {

            chart: {
              type: 'solidgauge',
              marginTop: 50,
              width: 400,
              height: 400
            },
            
            credits: {
              enabled: false
            },

            title: {
              text: 'Room Status',
              style: {
                fontSize: '24px'
              }
            },

            tooltip: {
              borderWidth: 0,
              backgroundColor: 'none',
              shadow: false,
              style: {
                fontSize: '16px'
              },
              pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
              positioner: function(labelWidth) {
                return {
                  x: 200 - labelWidth / 2,
                  y: 180
                };
              }
            },

            pane: {
              startAngle: 0,
              endAngle: 360,
              background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0
              }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 0
              }]
            },

            yAxis: {
              min: 0,
              max: 100,
              lineWidth: 0,
              tickPositions: []
            },

            plotOptions: {
              solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                  enabled: false
                },
                linecap: 'round',
                stickyTracking: false
              }
            },
            series: scope.data
          },
          /**
           * In the chart load callback, add icons on top of the circular shapes
           */
          function callback() {

            // Move icon
            this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
              .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
              })
              .translate(190, 26)
              .add(this.series[1].group);

            // Exercise icon
            this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
              .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
              })
              .translate(190, 61)
              .add(this.series[1].group);
          }
        );
      }
    };
  });

