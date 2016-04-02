function createBook () {
    $('#add').hide();
    $('input[name = "title"]').show();
    $('input[name = "author"]').show();
    $('input[name = "isbn"]').show();
    $('#submit').show();
    $('#submit').click(submitBook);
}

function submitBook(){
    var title = $('input[name = "title"]').val(),
        author = $('input[name = "author"]').val(),
        isbn = $('input[name = "isbn"]').val();

    $.ajax({
        method: "POST",
        headers: {
            "Authorization": "Basic bWlua2E6MTIzNA==",
            "Content-Type": "application/json"
        },
        data : JSON.stringify(
            {
                "title": title,
                "author": author,
                "isbn": isbn
            }
        ),
        url: "https://baas.kinvey.com/appdata/kid_-1U_dQAMyZ/books"
    }).success(function(data) {
        console.log(data);
        $("#books li").remove();
        $('input[name = "title"]').hide();
        $('input[name = "author"]').hide();
        $('input[name = "isbn"]').hide();
        $('#add').hide();
        $('#submit').hide();

    }).error(function() {
        console.log('Cannot add book.');
    });
}