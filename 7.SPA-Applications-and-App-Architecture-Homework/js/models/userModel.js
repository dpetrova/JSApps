var app = app || {};

app.userModel = (function () {
    function UserModel(requester) {
        this._requester = requester; //define own requester
        this.serviceUrl = this._requester.baseUrl + 'user/' + this._requester.appId;
    }

    UserModel.prototype.register = function (data) {
        var requestUrl = this.serviceUrl;
        return this._requester.post(requestUrl, data);
    };

    UserModel.prototype.login = function (data) {
        var requestUrl = this.serviceUrl + '/login';
        return this._requester.post(requestUrl, data)
    };

    UserModel.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '/_logout';
        return this._requester.post(requestUrl, null, true);
    };

    return {
        load: function(requester) {
            return new UserModel(requester);
        }
    };
}());
