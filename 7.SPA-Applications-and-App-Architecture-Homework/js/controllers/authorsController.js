var app = app || {};

app.authorsController = (function() {
    function AuthorsController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    AuthorsController.prototype.loadAllAuthors = function(selector) {
        var _this =this;

        this._model.getAllAuthors()
            .then(function (successData) {
                var result = {
                    authors: []
                };

                successData.forEach(function (data) {
                    result.authors.push({name: data.author});
                });

                _this._viewBag.showAllAuthors(selector, result);
            }).done();
    };

    AuthorsController.prototype.loadAddAuthorPage = function(selector) {
        var _this = this;

        _this._viewBag.showAddNewAuthor(selector);
    };

    AuthorsController.prototype.addNewAuthor = function(data) {
        var _this = this;

        this._model.addNewAuthor(data)
            .then(function() {
                //reload page with all books after added new one
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/books'});
                });

            })
    };

    return {
        load: function(model, viewBag) {
            return new AuthorsController(model, viewBag);
        }
    };
}());

