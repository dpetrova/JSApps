var app = app || {};

app.lecturesController = (function () {
    function LecturesController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    LecturesController.prototype.loadLectures = function (selector) {
        var _this = this;
        this.model.getAllLectures()
            .then(function (data) {
                var result = {
                    lectures: []
                };

                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        id: lecture._id
                    })
                });

                _this.viewBag.showLectures(selector, result);
            })
    };

    LecturesController.prototype.loadMyLectures = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];
        this.model.getLecturesByCreatorId(userId)
            .then(function (data) {
                var result = {
                    lectures: []
                };

                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        id: lecture._id
                    })
                });

                _this.viewBag.showMyLectures(selector, result);
            })
    };

    LecturesController.prototype.loadAddLecture = function (selector) {
        this.viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        this.model.addLecture(result)
            .then(function (success) {
                console.log(success);
                noty({
                        text: 'Lecture is added successfully!',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 2000}
                );
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/calendar/my/'});
                })
            });
    };

    LecturesController.prototype.loadEditLecture = function (selector, data) {
        this.viewBag.showEditLecture(selector, data);
    };

    LecturesController.prototype.editLecture = function (data) {
        data.lecturer = sessionStorage['username'];

        this.model.editLecture(data._id, data)
            .then(function (success) {
                console.log(success);
                noty({
                        text: 'Lecture is modified successfully!',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 2000}
                );
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/calendar/my/'});
                })
            })
    };

    LecturesController.prototype.loadDeleteLecture = function (selector, data) {
        this.viewBag.showDeleteLecture(selector, data);
    };

    LecturesController.prototype.deleteLecture = function (lectureId) {
        this.model.deleteLecture(lectureId)
            .then(function (success) {
                noty({
                        text: 'Lecture is deleted successfully!',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 2000}
                );
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/calendar/my/'});
                })
            });
    };

    return {
        load: function (viewBag, model) {
            return new LecturesController(viewBag, model);
        }
    };
}());
