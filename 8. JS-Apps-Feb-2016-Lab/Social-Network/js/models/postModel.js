var app = app || {};

app.postsModel = (function () {
    function PostsModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/posts/';
    }

    PostsModel.prototype.getAllPosts = function() {
        return this.requester.get(this.serviceUrl, true);
    };

    PostsModel.prototype.addPost = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    return {
        load: function (requester) {
            return new PostsModel(requester);
        }
    }
}());