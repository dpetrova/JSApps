var app = app || {};

app.userController = (function() {
    function UserController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function(selector) {
        this.viewBag.showLoginPage(selector);
    };

    UserController.prototype.login = function(data) {
        return this.model.login(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['name'] = success.name;
                sessionStorage['userId'] = success._id;
                poppy.pop("success","Login Successful","Successfully logged in!");

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'}); //after login redirect to home page
                });

            }).done();
    };


    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function(data) {
        return this.model.register(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['name'] = success.name;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            }).done();
    };

    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();
                poppy.pop("success","Logout Successful","Successfully logged out!");

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            })
    };

    UserController.prototype.loadEditProfilePage = function (selector) {
        this.viewBag.showEditProfilePage(selector);
    };

    UserController.prototype.edit = function(data) {
        return this.model.update(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['name'] = success.name;
                sessionStorage['userId'] = success._id;
                poppy.pop("success","Edit-profile Successful","Profile successfully edited!");

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            }).done();
    };

    return {
        load: function(viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
}());
