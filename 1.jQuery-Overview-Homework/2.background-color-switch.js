var inputForm = $('<form method="post" action="">' +
                  '<fieldset>' +
                  '<legend>Switching the background color</legend>' +
                  'Class: <input type="text" name="clas" value="" placeholder="Enter the class here" required="required" /><br/>' +
                  'Color: <input type="color" name="doorColor" value="#ff80c0" /><br/>' +
                  '<input type="submit" value="Paint" />' +
                  '</fieldset>' +
                  '</form>');

$('body').append(inputForm);

var $button = $('input[type*="submit"]');

$button.on('click', function(){
    var $class = $('input[type*="text"]').val(),
        $color = $('input[type*="color"]').val();
    $('.' +$class).css('background', $color);
});



