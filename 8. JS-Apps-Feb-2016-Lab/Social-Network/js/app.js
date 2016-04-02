var app = app || {};

(function () {
    var router = Sammy(function () {
        var header = '#header',
            section = '#main';

        var requester = app.requester.load('kid_Z1td8vsuyW', '070124c41534494dbdf68d4e546c848e', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var postsViewBag = app.postsViewBag.load();

        var userModel = app.userModel.load(requester);
        var postsModel = app.postsModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag, null);
        var postsController = app.postController.load(postsViewBag, postsModel);

        //if there is not sessionStorage['sessionId'] -> redirect to home page (to login/register)
        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $('#header').hide();
            } else {
                $('.summary-container h2').text('Welcome, ' + sessionStorage['name']); //to change the name in welcome menu
                $('#header').show();
            }
        });

        this.get('#/', function() {
            homeController.loadHomePage(section);
        });

        this.get('#/home/', function() {
            homeController.loadUsersHeader(header);
            postsController.loadPosts(section);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(section);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(section);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/posts/', function() {
            homeController.loadUsersHeader(header);
            postsController.loadAddPost(section);
        });

        this.get('#/edit/', function() {
            userController.loadEditProfilePage(section);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addPost', function(ev, data) {
            postsController.addPost(data);
        });

        this.bind('update-profile', function(ev, data) {
            userController.edit(data);
        });

    });

    router.run('#/');
}());
