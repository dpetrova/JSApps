(function () {

    //set answers to local storage
    $('input[type="radio"]').on('click', function(event) {
        var checked = event.target;
        localStorage.setItem(checked.name, checked.value);
    });

    $('input[type*="submit"]').on('click', getAnswers);

    function getAnswers(){
        for (var key in localStorage) {
            var question = key,
                answer = localStorage.getItem(key),
                correctAnswer = $('.' + question).attr("name");

            var paragraph = $('<p>').text(question + ' -> ' + answer),
                span = $('<span>').text(answer == correctAnswer ? ' correct' : ' wrong');
            paragraph.css('font-weight', 'bold');
            span.css('color', span.text() == ' correct' ? 'green' : 'red');

            paragraph.append(span);
            $('body').append(paragraph);
        }

        var  button = $('<button id="logout">Play again</button>');
        $('body').append(button);
        $('button').on('click', clearStorage);
    }


    function startTimer(duration, display) {
        var timer = duration,
            minutes,
            seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                clearStorage();
                location.reload();
            }
        }, 1000);
    }

    function clearStorage(){
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }

    var fiveMinutes = 60 * 5,
        display = $('#time');
    startTimer(fiveMinutes, display);

})();



