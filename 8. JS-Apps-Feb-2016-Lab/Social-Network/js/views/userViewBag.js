var app = app || {};

app.userViewBag = (function () {
    var pictureFile;

    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('button:contains("Login")').on('click', function () {
                var username = $('#login-username').val(),
                    password = $('#login-password').val();

                //custom event (it is also possible and with controller injection)
                Sammy(function() {
                    this.trigger('login', {username: username, password: password}); //as data pass an object with fields that UserController.login -> userModel.login is needed
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);

            $('#upload-file-button').change(function (e) {
                var files = e.target.files || e.dataTransfer.files;
                pictureFile = files[0];
            });

            $('button:contains("Register")').on('click', function () {
                var username = $('#reg-username').val(),
                    password = $('#reg-password').val(),
                    name = $('#reg-name').val(),
                    about = $('#reg-about').val(),
                    gender = $('input[name="gender-radio"]:checked').val(),
                    picture = pictureFile;

                Sammy(function() {
                    this.trigger('register', {
                        username: username,
                        password: password,
                        name: name,
                        about: about,
                        gender: gender,
                        picture: picture});
                })
            })
        })
    }

    function showEditProfilePage(selector){
        $.get('templates/edit-profile.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);

            $('#upload-file-button').change(function (e) {
                var files = e.target.files || e.dataTransfer.files;
                pictureFile = files[0];
            });

            $('button:contains("Save Changes")').on('click', function (e) {
                var username = sessionStorage['username'],
                    password = $('#password').val(),
                    name = $('#name').val(),
                    info = $('#about').val(),
                    gender = $('input[name="gender-radio"]:checked').val(),
                    picture = pictureFile,
                    userId = sessionStorage['userId'];

                Sammy(function() {
                    this.trigger('update-profile', {
                        username: username,
                        password: password,
                        name: name,
                        info: info,
                        gender: gender,
                        picture: picture,
                        userId: userId});
                });
            });

            $('button:contains("Cancel")').on('click', function () {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/posts/'});
                })
            })
        })
    }

    function showHoverBox(selector, data) {
        $.get('templates/hover-box.html', function (templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage,
                showEditProfilePage: showEditProfilePage,
                showHoverBox: showHoverBox
            }
        }
    }
}());
