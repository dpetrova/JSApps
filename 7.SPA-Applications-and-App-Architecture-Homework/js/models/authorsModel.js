var app = app || {};

app.authorsModel = (function () {
    function AuthorsModel(requester) {
        this._requester = requester; //define own requester
        this.serviceUrl = this._requester.baseUrl +
        'appdata/' +
        this._requester.appId +
        '/books';
    }

    AuthorsModel.prototype.getAllAuthors = function () {
        return this._requester.get(this.serviceUrl, true); // true is concerned with useSession (i.e. use auth token)
    };

    AuthorsModel.prototype.addNewAuthor = function(data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    AuthorsModel.prototype.getAuthorsByBookId = function (bookId) {
        var endpointUrl = this.serviceUrl + '?query={"book._id":"' + bookId + '"}';
        return this._requester.get(endpointUrl, true);
    };

    return {
        load: function(requester) {
            return new AuthorsModel(requester);
        }
    }
}());
