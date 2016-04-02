function editBook(){
    var $this = $(this);
    $this.parent().append($('<input type="text" name="field" value="" placeholder="Enter changed book in format -> {&quot;key&quot;: &quot;value&quot;}" />'));
    $this.parent().append($('<button id="edit">Submit Field</button><br/>'));
    $('#edit').click(submitField);
}


function submitField(){
    var $this = $(this);
    var bookId = $this.parent().attr('id'),
        newField = $('input[name = "field"]').val();
    console.log(newField);

    $.ajax({
        method: "PUT",
        headers: {
            "Authorization": "Basic bWlua2E6MTIzNA==",
            "Content-Type": "application/json"
        },
        data : newField,
        url: "https://baas.kinvey.com/appdata/kid_-1U_dQAMyZ/books/" + bookId
    }).success(function(data) {
        console.log("Book has been updated successfully");
        console.log(data)
    }).error(function() {
        console.log('Cannot update book.');
    });
}
