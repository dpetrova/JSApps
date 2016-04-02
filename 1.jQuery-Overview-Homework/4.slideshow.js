var slide1 = $('<div><h1>Пирин</h1></div>'),
    slide2 = $('<div><h1>Рила</h1></div>'),
    slide3 = $('<div><h1>Трявна</h1></div>'),
    slide4 = $('<div><h1>Царевец</h1></div>'),
    slide5 = $('<div><h1>Шипка</h1></div>'),
    slide6 = $('<div><h1>Боженци</h1></div>'),
    buttonPrev = $('<button type="button" id="prev"><</button>'),
    buttonNext = $('<button type="button" id="next">></button>');

$('body').append(slide1)
    .append(slide2)
    .append(slide3)
    .append(slide4)
    .append(slide5)
    .append(slide6)
    .append(buttonPrev)
    .append(buttonNext);

var index = 0,
    interval;

function previous(){
    if (index <= 0) {
        index = $('div').length - 1;
    }

    show();
    index--;
}

function next(){
    if (index >= $('div').length - 1) {
        index = 0;
    }

    show();
    index++;
}

function show(){
    $('div').hide();
    $($('div')[index]).fadeIn(5000);
    clearInterval(interval);
    interval = setInterval(next, 5000);
}

$('button:first').on('click', previous);
$('button:last').on('click', next);
$('div:contains("Пирин")').css("background-image","url('images/pirin.jpg')");
$('div:contains("Рила")').css("background-image","url('images/rila-lakes.jpg')");
$('div:contains("Трявна")').css("background-image","url('images/tryavna.jpg')");
$('div:contains("Царевец")').css("background-image","url('images/tzarevetz.jpg')");
$('div:contains("Шипка")').css("background-image","url('images/shipka.jpeg')");
$('div:contains("Боженци")').css("background-image","url('images/bojentzi.jpg')");

next();







