'use strict';

// Controller
var ctrl = angular.module('wsc.controllers', []);

var HomeCtrl = function ($scope) {

};
ctrl.controller('HomeCtrl', ['$scope', HomeCtrl]);



//ctrl.controller('LibraryCtrl', ['$scope', 'books', 'movies', function ($scope, books, movies) { }]);
var ArticleCtrl = function ($scope, articles) {

    $scope.articles = articles.data;
};
ctrl.controller('ArticleCtrl', ['$scope', 'articles', ArticleCtrl])
