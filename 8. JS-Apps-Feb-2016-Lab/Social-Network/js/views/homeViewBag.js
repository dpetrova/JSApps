var app = app || {};

app.homeViewBag = (function () {
    function showHomePage(selector, data) {
        $.get('templates/default-home.html', function(templ) {
            var renderedData = Mustache.render(templ, data); //when we have template where have to render some live data (i.e. here fullName and username) we can use Mustache
            $(selector).html(renderedData);
        })
    }

    function showUsersHeader(selector, data) {
        $.get('templates/user-header.html', function (templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);
        })
    }

    return {
        load: function () {
            return {
                showHomePage: showHomePage,
                showUsersHeader: showUsersHeader
            }
        }
    }
}());
