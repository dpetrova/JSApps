(function () {
    $('#introduce').hide();

    if (!localStorage.counter) {
        localStorage.setItem("counter", 0);
    }

    if (!localStorage.name) {
        $('#logout').hide();
        $('#introduce').show();
        $('#login').click(function () {
            var name = $('input').val();
            localStorage.setItem("name", name);
            location.reload();
        });
        return;
    }

    if (!sessionStorage.counter) {
        sessionStorage.setItem("counter", 0);
    }

    $('h1').html("Hello, " + localStorage.getItem("name"));
    $('#logout').show();

    var currentSessionCount = parseInt(sessionStorage.getItem("counter"));
    currentSessionCount++;
    sessionStorage.setItem("counter", currentSessionCount);
    $('#session-visits').html(currentSessionCount);

    var currentLocalCount = parseInt(localStorage.getItem("counter"));
    currentLocalCount++;
    localStorage.setItem("counter", currentLocalCount);
    $('#total-visits').html(currentLocalCount);

    $('#logout').click(function () {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    });

})();


