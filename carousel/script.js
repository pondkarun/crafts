'use strict';

var app = angular.module('appName', ['ngAnimate', 'ui.bootstrap']);
app.controller('CarouselDemoCtrl', function() {
    var _this = this;

    _this.myInterval = 5000;
    _this.active = 0;
    var slides = _this.slides = [];
    var currIndex = 0;

    _this.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://www.smo-msci.com/crafts/images/crafts_164986253720200222_014631.jpg',
            text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
            id: currIndex++
        });
    };

    for (var i = 0; i < 10; i++) {
        _this.addSlide();
    }


});