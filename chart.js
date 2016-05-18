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
    }).done(function (data) {
        var length = data.length;

        if(length>0) {
            for (var i = 0; i < length ; i++) {

                console.log(':data:i:', typeof(data[i][0]), data[i][0].trim(), typeof(data[i][1]), data[i][1].trim());
                data[i][1] = parseFloat(data[i][1]);

                if(data[i][1] === data[i][1]) {
                    data[i][1] = data[i][1].toFixed(2);
                } else {
                    data[i][1] = 0.1;
                };

                var id = data[i][0] ? data[i][0].trim() : i;
                var size = data[i][1];
                var color = i;

                console.log(':data:i:', id, size, color);

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

    var data = google.visualization.arrayToDataTable(data);

    var tree = new google.visualization.TreeMap(document.getElementById('chart'));

    tree.draw(data, {
        minColor: '#f00',
        midColor: '#ddd',
        maxColor: '#0d0',
        headerHeight: 15,
        fontColor: 'black',
        showScale: true
    });
};