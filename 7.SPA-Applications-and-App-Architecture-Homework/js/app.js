var app = app || {};

(function () {
    var router = $.sammy(function(){
        var selector = '#container';
        var requester = app.requester.config('kid_-1U_dQAMyZ', '860e9c24c5ee41038dff9b2b24a34060');

        var userViewBag = app.userViews.load();
        var booksViewBag = app.booksViews.load();
        var authorViewBag = app.authorsViews.load();

        var userModel = app.userModel.load(requester);
        var booksModel = app.booksModel.load(requester);
        var authorsModel = app.authorsModel.load(requester);

        var userController = app.userController.load(userModel, userViewBag);
        var booksController = app.booksController.load(booksModel, booksViewBag);
        var authorsController = app.authorsController.load(authorsModel, authorViewBag);

        this.get('#/', function(){
            //testing userModel:
            //userModel.register({username:'penka', 'password': '1234'})
            //    .then(function(data){
            //        console.log(data);
            //    }).done();

            //userViewBag.showLoginPage(selector);
            this.redirect('#/login');
        });

        this.get('#/login', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        this.get('#/register', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/books', function () {
            booksController.loadAllBooks(selector);
        });

        this.get('#/authors', function () {
            authorsController.loadAllAuthors(selector);
        });

        this.get('#/addNewBook', function () {
            booksController.loadAddBookPage(selector);
        });

        this.get('#/addNewAuthor', function () {
            authorsController.loadAddAuthorPage(selector);
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            userController.login(data);
        });

        this.bind('register', function(e, data) {
            userController.register(data);
        });

        this.bind('add-new-book', function(e, data) {
            booksController.addNewBook(data);
        });

        this.bind('show-add-author', function(e, data) {
            authorsController.addNewAuthor(data);
        });

    });



    router.run('#/')
})();
