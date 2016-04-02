$(function() {

    $.ajax({
        method: "GET",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country"
    }).success(function(data) {
         for (var i in data) {
            var country = data[i];
            //console.log(country);

            var countryItem = $('<li>');
            countryItem.text(country.name);
            countryItem.appendTo($("#countries"));
        }
        $('li').click(countryClick)
    }).error(function() {
        alert('Cannot load countries.');
    });
});

