var app = app || {};

app.booksController = (function() {
    function BooksController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag; // these are views of this controller
    }

    BooksController.prototype.loadAllBooks = function(selector) {
        var _this =this;

        this._model.getAllBooks()
            .then(function (successData) {
                var result = {
                    books: []
                };

                successData.forEach(function (book) {
                    result.books.push({title: book.title, bookId: book._id});
                });

                _this._viewBag.showAllBooks(selector, result);
            }).done();
    };

    BooksController.prototype.loadAddBookPage = function(selector) {
        var _this = this;

        _this._viewBag.showAddNewBook(selector);
    };

    BooksController.prototype.addNewBook = function(data) {
        var _this = this;

        this._model.addNewBook(data)
            .then(function() {
                //reload page with all books after added new one
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/books'});
                });

            })
    };

    return {
        load: function(model, viewBag) {
            return new BooksController(model, viewBag);
        }
    };
}());
