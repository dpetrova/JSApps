function deleteBook(){
    var $this = $(this);
    var bookId = $this.parent().attr('id');

    $.ajax({
        method: "DELETE",
        headers: {
            "Authorization": "Basic bWlua2E6MTIzNA=="
        },
        url: "https://baas.kinvey.com/appdata/kid_-1U_dQAMyZ/books/" + bookId
    }).success(function() {
        $('#' + bookId).remove();
        console.log("Book has been deleted")
    }).error(function() {
        console.log('Cannot delete book.');
    });
}
