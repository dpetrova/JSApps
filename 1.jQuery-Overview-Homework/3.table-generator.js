var json = [
    {"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},
    {"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},
    {"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}
];

var rows = Object.keys(json),
    cols = Object.keys(json[0]);

var $table = $('<table>' +
               '<thead>' +
               '<tr>' +
               '<th colspan="' + cols.length + '">Cars</th>' +
               '</tr>' +
               '</thead>' +
               '</table>');

var $tbody = $('<tbody></tbody>'),
    $header = $('<tr></tr>');

cols.forEach(function(key){
    $header.append('<th>' + key + '</th>');
});
$tbody.append($header);

json.forEach(function(object){
    var tableRow = $('<tr></tr>');
    for(var key in object) {
        var value = object[key];
        tableRow.append('<td>' + value + '</td>');
    }

    $tbody.append(tableRow);
});

$table.append($tbody);
$('body').prepend($table);
