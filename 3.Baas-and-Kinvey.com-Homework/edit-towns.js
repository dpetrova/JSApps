//add town
$('#addTown').click(function () {
    var newTown = $('.addTown input:first').val(),
        toCountry = $('.addTown input:last').val(),
        toCountryId,
        queryString = '?query={"name": "' + toCountry + '"}';

    //querying the requested country
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Country/" + queryString
    }).success(function(data) {
        //console.log(data[0]);
        toCountryId = data[0]._id;
    }).error(function() {
        alert('Cannot find country.');
    }).done(function(){
        //add town
        $.ajax({
            method: "POST",
            headers: {
                "Authorization": "Basic cGVzaG86MTIzNA==",
                "Content-Type": "application/json"
            },
            data : JSON.stringify(
                {
                    "name" : newTown,
                    "country": {
                        "_type": "KinveyRef",
                        "_id": toCountryId,
                        "_collection": "Country"
                    }
                }
            ),
            url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Town"
        }).success(function(data) {
            alert(newTown + " has been added to " + toCountry);
        }).error(function() {
            alert('Cannot add town.');
        });
    });
});


//edit town
$('#editTown').click(function () {
    var updatedTown = $('.editTown input:first').val(),
        updatedTownId,
        newField = $('.editTown input:last').val(),
        queryString = '?query={"name": "' + updatedTown + '"}';

    //querying the requested country
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Town/" + queryString
    }).success(function(data) {
        updatedTownId = data[0]._id;
    }).error(function() {
        alert('Cannot find town.');
    }).done(function(){
        //update
        $.ajax({
            method: "PUT",
            headers: {
                "Authorization": "Basic cGVzaG86MTIzNA==",
                "Content-Type": "application/json"
            },
            data : newField,
            url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Town/" + updatedTownId
        }).success(function() {
            alert(updatedTown + " has been updated");
        }).error(function() {
            alert('Cannot update town.');
        });
    });
});


//delete town
$('#deleteTown').click(function () {
    var deletedTown = $('.deleteTown input').val(),
        queryString = '?query={"name": "' + deletedTown + '"}';

    $.ajax({
        method: "DELETE",
        headers: {
            "Authorization": "Basic cGVzaG86MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_ZJJjWyATRl/Town/" + queryString
    }).success(function() {
        $('li:contains("' + deletedTown + '")').remove();
        console.log(deletedTown + " has been deleted")
    }).error(function() {
        alert('Cannot delete town.');
    });
});
