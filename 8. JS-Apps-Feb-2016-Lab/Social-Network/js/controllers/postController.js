var app = app || {};

app.postController = (function () {
    function PostController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    PostController.prototype.loadPosts = function (selector) {
        var _this = this; //we need to cash this

        this.model.getAllPosts()
            .then(function (data) {
                var result = {
                    posts: []
                };

                data.forEach(function (post) {
                    result.posts.push({
                        content: post.content,
                        author: post.author,
                        date: post.date,
                        id: post._id
                    })
                });

                _this.viewBag.showPosts(selector, result);
            })
    };

    //load form for add post
    PostController.prototype.loadAddPost = function (selector) {
        this.viewBag.showAddPost(selector);
    };

    PostController.prototype.addPost = function (data) {
        var result = {
            content: data.content,
            author: sessionStorage['username'],
            date: new Date()
        };

        this.model.addPost(result)
            .then(function (success) {
                console.log(success);
                poppy.pop("success","Post Successful","Post successfully added!");
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/home/'});
                })
            });
    };

    return {
        load: function (viewBag, model) {
            return new PostController(viewBag, model);
        }
    };
}());
