var app = app || {};

app.homeController = (function() {
    function HomeController(viewBag, model) { //here we dont use model (without pass it, it is null), but for future modification we can use model
        this.model = model;
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadHomePage = function(selector) {
        this.viewBag.showHomePage(selector);
    };

    HomeController.prototype.loadUsersHeader = function(selector) {
        //instead use object here, we can use binding model, written in advance
        var data = {
            name: sessionStorage['name'],
            username: sessionStorage['username']
        };

        this.viewBag.showUsersHeader(selector, data);
    };

    return {
        load: function(viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
}());
