function countryClick(event) {
   var li = event.target,
       $li = $(li), //parsing regular DOM element to jQuery element
       country = $li.text(),
       countryId,
       queryCountryString = '?query={"name": "' + country + '"}',
       queryTownsString = '?query={"country._id": "' + countryId + '"}';

    //querying the requested country
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country/" + queryCountryString
    }).success(function(data) {
        //console.log(data[0]);
        countryId = data[0]._id;
    }).error(function() {
        alert('Cannot find country.');
    }).done(function(){
        //get towns by country
        $.ajax({
            method: "GET",
            headers: {
                "Authorization": "Basic cGVzaG86MTIzNA=="
            },
            url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Town/" + '?query={"country._id": "' + countryId + '"}'
        }).success(function(data) {
            $("#towns").empty();
            $(".towns h2").text("Towns of " + country);
            for (var i in data) {
                var town = data[i],
                townItem = $('<li>');
                townItem.text(town.name);
                townItem.appendTo($("#towns"));
            }
        }).error(function() {
            alert('Cannot load towns.');
        });
    });
};