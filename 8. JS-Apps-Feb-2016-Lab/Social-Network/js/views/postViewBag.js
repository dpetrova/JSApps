var app = app || {};

app.postsViewBag = (function () {
    function showPosts(selector, data) {
        $.get('templates/postsPage.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
        })
    }

    function showAddPost(selector) {
        $.get('templates/postsBox.html', function (templ) {
            $(selector).html(templ);
            $('button:contains("Post")').on('click', function () {
                var content = $('#post-content').val();

                Sammy(function () {
                    this.trigger('addPost', {content: content});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showPosts: showPosts,
                showAddPost: showAddPost
            }
        }
    }
}());
