var app = app || {};

app.booksModel = (function () {
    function BooksModel(requester) {
        this._requester = requester; //define own requester
        this.serviceUrl = this._requester.baseUrl +
        'appdata/' +
        this._requester.appId +
        '/books';
    }

    BooksModel.prototype.getAllBooks = function () {
        return this._requester.get(this.serviceUrl, true); // true is concerned with useSession (i.e. use auth token)
    };

    BooksModel.prototype.addNewBook = function(data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    return {
        load: function(requester) {
            return new BooksModel(requester);
        }
    }
}());

