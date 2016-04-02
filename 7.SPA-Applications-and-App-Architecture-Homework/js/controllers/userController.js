var app = app || {};

app.userController = (function () {
    function UserController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function(selector) {
        this._viewBag.showLoginPage(selector)
    };

    UserController.prototype.login = function(data) {
        //var userOutputModel = {
        //    username: data.username,
        //    password: data.password
        //};

        this._model.login(data) //this._model.login(userOutputModel)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/books'});
                })
            }).done()
    };

    UserController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
            })
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this._viewBag.showRegisterPage(selector)
    };

    UserController.prototype.register = function(data) {
        this._model.register(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/books'});
                })
            }).done()
    };

    return {
        load: function (model, viewBag) {
            return new UserController(model, viewBag)
        }
    }
}());
