google.charts.load('current', {'packages':['treemap']});
google.charts.setOnLoadCallback(init);

function init() {
    var parentId = 'Global';

    var data = [
        ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
        [parentId, null, 0, 0]
    ];

    $.ajax({
        url: 'readFile.php',
        method: 'GET',
        dataType: 'json',
        cache: false,
        async: true
    }).done(function (response) {

        var count  = 10000;
        var length = (count <= response.length) ? count : response.length;

        if(length>0) {
            for (var i = 0; i < length ; i++) {

                ///console.log(':data:i:', typeof(data[i][0]), data[i][0].trim(), typeof(data[i][1]), data[i][1].trim());
                response[i][1] = parseFloat(response[i][1]);

                if(response[i][1] === response[i][1]) {
                    //response[i][1] = response[i][1].toFixed(2);
                } else {
                    response[i][1] = 0.0;
                };

                var id = response[i][0] ? response[i][0].trim() : i;
                var size = response[i][1];
                var color = response[i][1];

                data.push([id, parentId, size, color]);
            };
            drawChart(data);
        } else {
            console.info('data for draw chart is not exists');
        };
    }).error(function(e) {
        console.error(e.name + ':' + e.message + '/r/n' + e.stack);
    });
};

function drawChart(data) {
    console.log('drawChart:start');
    console.time('drawChart:end');

    var data = google.visualization.arrayToDataTable(data);

    var tree = new google.visualization.TreeMap(document.getElementById('chart'));

    google.visualization.events.addListener(tree, 'ready', readyHandler);


    tree.draw(data, {
        minColor: '#f00',
        midColor: '#ddd',
        maxColor: '#0d0',
        headerHeight: 15,
        fontColor: 'black',
        showScale: true
    });

    function readyHandler() {
        console.timeEnd('drawChart:end');
    };
};