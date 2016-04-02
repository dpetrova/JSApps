//add country
$('#add').click(function () {
    var newCountry = $('.add input').val();

    $.ajax({
        method: "POST",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA==",
            "Content-Type": "application/json"
        },
        data : JSON.stringify(
            {
                "name" : newCountry
            }
        ),
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country"
    }).success(function(data) {
        var countryName = data.name,
            countryItem = $('<li>');
        //countryItem.click(countryClick);
        countryItem.text(countryName);
        countryItem.appendTo($("#countries"));

    }).error(function() {
        alert('Cannot add country.');
    });
});


//edit country
$('#edit').click(function () {
    var updatedCountry = $('.edit input:first').val(),
        updatedCountryId,
        newField = $('.edit input:last').val(),
        queryString = '?query={"name": "' + updatedCountry + '"}';

    //querying the requested country
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country/" + queryString
    }).success(function(data) {
        //console.log(data[0]);
        updatedCountryId = data[0]._id;
    }).error(function() {
        alert('Cannot find country.');
    }).done(function(){
        //update
        $.ajax({
            method: "PUT",
            headers: {
                "Authorization": "Basic cGVzaG86MTIzNA==",
                "Content-Type": "application/json"
            },
            data : newField,
            url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country/" + updatedCountryId
        }).success(function(data) {
            alert(updatedCountry + " has been updated");
            console.log(data)
        }).error(function() {
            alert('Cannot update country.');
        });
    });
});


//delete country
$('#delete').click(function () {
    var deletedCountry = $('.delete input').val(),
        queryString = '?query={"name": "' + deletedCountry + '"}';

    $.ajax({
        method: "DELETE",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country/" + queryString
    }).success(function() {
        $('li:contains("' + deletedCountry + '")').remove();
        console.log(deletedCountry + " has been deleted")
    }).error(function() {
        alert('Cannot delete country.');
    });
});
