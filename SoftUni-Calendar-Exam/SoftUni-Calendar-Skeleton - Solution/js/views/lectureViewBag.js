var app = app || {};

app.lecturesViewBag = (function () {
    function showLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-03-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').hide();
                        $('#deleteLecture').hide();
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showMyLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-03-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function() {
                            var lectureId = $(this).parent().prev().children().attr('data-id');
                            var lecture = data.lectures.filter(function (a) {
                                return a.id == lectureId;
                            });
                            console.log(lecture);
                            if (lecture.length) {
                                Sammy(function () {
                                    this.trigger('showEditLecture', lecture[0]);
                                })
                            }
                            //Sammy(function () {
                            //    this.trigger('redirectUrl', {url: '#/calendar/edit/' + lectureId, data:lecture[0]});
                            //})
                        });
                        $('#deleteLecture').on('click', function() {
                            var lectureId = $(this).parent().prev().children().attr('data-id');
                            var lecture = data.lectures.filter(function (a) {
                                return a.id == lectureId;
                            });
                            console.log(lecture);
                            if (lecture.length) {
                                Sammy(function () {
                                    this.trigger('showDeleteLecture', lecture[0]);
                                })
                            }
                            //Sammy(function () {
                            //    this.trigger('redirectUrl', {url: '#/calendar/delete/', _id:lectureId});
                            //})
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        })
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);

            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                //todo: add sessionStorage['username']
                    lecturer = sessionStorage['username'];

                Sammy(function () {
                    this.trigger('addLecture', {title: title, start: start, end: end, lecturer: lecturer});
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#editLecture').on('click', function() {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'],
                    id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('editLecture', {title: title, start: start, end: end, lecturer: lecturer,  _id:id});
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#deleteLecture').on('click', function() {
                //todo: get id
                id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('deleteLecture', {_id:id});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLectures: showLectures,
                showMyLectures: showMyLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());
