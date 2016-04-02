(function () {
    $('#list').click(listBooks);
    $('input[name = "title"]').hide();
    $('input[name = "author"]').hide();
    $('input[name = "isbn"]').hide();
    $('#add').hide();
    $('#submit').hide();

    function listBooks(){
        $.ajax({
            method: "GET",
            headers: {
                "Authorization": "Basic bWlua2E6MTIzNA=="
            },
            url: "https://baas.kinvey.com/appdata/kid_-1U_dQAMyZ/books"
        }).success(function(data) {
            for (var i in data) {
                var book = data[i];
                //console.log(book);

                var bookItem = $('<li>').attr('id', book._id);
                bookItem.text(book.title + ' - ' + book.author + ' - ' + book.isbn);
                var editButton = $('<button>').text('Edit')
                    .attr('id', 'editButton')
                    .click(editBook);
                bookItem.append(editButton);

                var deleteButton = $('<button>').text('Delete')
                    .attr('id', 'deleteButton')
                    .click(deleteBook);
                bookItem.append(deleteButton);

                bookItem.appendTo($("#books"));
            }

            $('#add').click(createBook);
            $('#add').show();

        }).error(function() {
            console.log('Cannot load books.');
        });
    }
})();





