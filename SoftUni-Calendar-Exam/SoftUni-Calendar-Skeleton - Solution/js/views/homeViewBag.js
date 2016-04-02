var app = app || {};

app.homeViewBag = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome-guest.html', function(templ) {
            $(selector).html(templ);
        })
    }

    function showHomePage(selector, data) {
        $.get('templates/welcome-user.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    function showHomeMenu(selector, data) {
        $.get('templates/menu-home.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    function showLoginMenu(selector, data) {
        $.get('templates/menu-login.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage,
                showHomePage: showHomePage,
                showHomeMenu: showHomeMenu,
                showLoginMenu: showLoginMenu
            }
        }
    }
}());