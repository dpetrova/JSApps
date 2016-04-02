var app = app || {};

app.authorsViews = (function () {
    function showAllAuthors(parent, data) {
        $.get('templates/authors.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(parent).children().last().html(rendered);
        })
    }

    function showAddNewAuthor(selector, data){
        $.get('templates/addNewAuthor.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#addNewAuthor').on('click', function () {
                var author = $('#author').val();
                Sammy(function () {
                    this.trigger('add-new-author', {name: author});
                })
            });
        })
    }

    return {
        load: function () {
            return {
                showAllAuthors: showAllAuthors,
                showAddNewAuthor: showAddNewAuthor
            }
        }
    }
}());

