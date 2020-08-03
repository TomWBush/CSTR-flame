
var chart_lookup = {
    "H2":0,
    "CO":1,
    "CH4":2,
    "C2H2":3,
    "C2H5OH":4,
    "C2H6":5,
    "C3H8":6,
};


function resetGraph(){

    return new Highcharts.chart({

                                 
    chart: {
        renderTo: 'chart',
        animation: true,
        width: 450,
        heigth: 400,
        type: 'scatter'
    },
    title: {
        text: ' '
    },
    

    yAxis: {
        title: {
            text: 'Adiabatic Flame Temperature [K]'
        },
    },

    xAxis: {
            title: {
                text: 'Equivalence Ratio'
            },
            tickInterval: 0.5,
            max: 3.750,
            min: 0.0,
    },

    plotOptions: {
        line: {
             dataLabels: {
                 enabled: true
             },
             enableMouseTracking: true
        },
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },

    series: [{
        name: 'Hydrogen',
        data: []
    },
     {
         name: 'Carbon Monoxide',
         data: []
     },
     {
         name: 'Methane',
         data: []
     },
     {
         name: 'Acetylene',
         data: []
     },
     {
         name: 'Ethanol',
         data: []
     },
     {
         name: 'Ethane',
         data: []
     },
     {
         name: 'Propane',
         data: []
     },
             ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 300
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
}
var chart = resetGraph();

