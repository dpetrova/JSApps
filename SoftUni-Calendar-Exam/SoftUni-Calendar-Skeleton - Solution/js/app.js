var app = app || {};

(function () {
    var router = Sammy(function () {
        var menu = '#menu',
            container = '#container';

        var requester = app.requester.load('kid_Wkyi55Vpk-', '7beba2b1734c42f6974b8597fac3808a', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var lecturesViewBag = app.lecturesViewBag.load();

        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lecturesModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var lecturesController = app.lecturesController.load(lecturesViewBag, lecturesModel);

        //if there is not set sessionStorage['sessionId'] -> redirect to home page (to login/register)
        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function() {
            homeController.loadLoginMenu(menu);
            homeController.loadWelcomePage(container);
        });

        this.get('#/home/', function() {
            homeController.loadHomeMenu(menu);
            homeController.loadHomePage(container);
        });

        this.get('#/login/', function() {
            homeController.loadLoginMenu(menu);
            userController.loadLoginPage(container);
        });

        this.get('#/register/', function() {
            homeController.loadLoginMenu(menu);
            userController.loadRegisterPage(container);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/calendar/list/', function() {
            homeController.loadHomeMenu(menu);
            lecturesController.loadLectures(container);
        });

        this.get('#/calendar/my/', function() {
            homeController.loadHomeMenu(menu);
            lecturesController.loadMyLectures(container);
        });

        this.get('#/calendar/add/', function() {
            homeController.loadHomeMenu(menu);
            lecturesController.loadAddLecture(container);
        });

        //todo:
        this.get('#/calendar/edit/:lectureId', function(data) {
            //console.log(this.params['lectureId']);
            $('.modal-backdrop').hide();
            homeController.loadHomeMenu(menu);
            lecturesController.loadEditLecture(container, data);
        });

        //todo:
        this.get('#/calendar/delete/:lectureId', function(data) {
            //console.log(this.params['lectureId']);
            $('.modal-backdrop').hide();
            homeController.loadHomeMenu(menu);
            lecturesController.loadDeleteLecture(container, data);
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

        this.bind('showAddLecture', function(ev, data) {
            lecturesController.loadAddLecture(data);
        });

        this.bind('addLecture', function(ev, data) {
            lecturesController.addLecture(data);
        });

        this.bind('showEditLecture', function(ev, data) {
            $('.modal-backdrop').hide();
            homeController.loadHomeMenu(menu);
            lecturesController.loadEditLecture(container, data);
        });

        this.bind('editLecture', function(ev, data) {
            lecturesController.editLecture(data);
        });

        this.bind('showDeleteLecture', function(ev, data) {
            $('.modal-backdrop').hide();
            homeController.loadHomeMenu(menu);
            lecturesController.loadDeleteLecture(container, data);
        });

        this.bind('deleteLecture', function(ev, data) {
            lecturesController.deleteLecture(data._id);
        })
    });

    router.run('#/');
}());
