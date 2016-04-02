//select element by className and append element to it
$('.wrapper').append('<button>Appended button</button>');

//create element and append it to element selected by tagName
$('<br/><span>Appended span</span>').appendTo('p');

//select element by id and prepend element to it
$('#special').prepend('<li>Prepended Li</li>');

//create element and prepend it to element selected by filter selector
$('<a href="">Prepended link</a><br/>').prependTo('li:last');

//remove element selected by filter selector
$('a:contains("Uni")').remove();