var app = app || {};

app.booksViews = (function () {
    function showAllBooks(selector, data) {
        $.get('templates/books.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#addNewBook').on('click', function (e) {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/addNewBook'}); //trigger custom event
                })
            });

            $('.addAuthor').on('click', function (e) {
                var parent = $(this).parent(), //this is button
                    bookId = parent.attr('data-id');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/addNewAuthor'}); //trigger custom event
                })
            });
        })
    }

    function showAddNewBook(selector, data){
        $.get('templates/addNewBook.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#addNewBook').on('click', function () {
                var title = $('#title').val();
                Sammy(function () {
                    this.trigger('add-new-book', {title: title}); //trigger custom event
                })
            });
        })

    }

    return {
        load: function () {
            return {
                showAllBooks: showAllBooks,
                showAddNewBook: showAddNewBook
            }
        }
    }
}());
