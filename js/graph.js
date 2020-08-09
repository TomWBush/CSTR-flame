
var chart_lookup = {
    "H2":{},
    "CO":{},
    "CH4":{},
    "C2H2":{},
    "C2H5OH":{},
    "C2H6":{},
    "C3H8":{},
};


function resetGraph(){
    
    chart_lookup = {
        "H2":{},
        "CO":{},
        "CH4":{},
        "C2H2":{},
        "C2H5OH":{},
        "C2H6":{},
        "C3H8":{},
    };

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
        showEmpty: false,
    },

    xAxis: {
            title: {
                text: 'Equivalence Ratio'
            },
            tickInterval: 0.5,
            max: 5,
            min: 0.0,
            showEmpty: false,
    },

    plotOptions: {
        line: {
             dataLabels: {
                 enabled: true
             },
             enableMouseTracking: false,
        },
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },

    series: [
             {
                 data:  [null, null],
                 name:' ',
                 marker:{
                    enabled: false
                 },
             }
//             {
//        lineWidth: 2,
//        name: 'Hydrogen',
//        data: []
//    },
//     {
//         name: 'Carbon Monoxide',
//         data: []
//     },
//     {
//         name: 'Methane',
//         data: []
//     },
//     {
//         name: 'Acetylene',
//         data: []
//     },
//     {
//         name: 'Ethanol',
//         data: []
//     },
//     {
//         name: 'Ethane',
//         data: []
//     },
//     {
//         name: 'Propane',
//         data: []
//     },
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

