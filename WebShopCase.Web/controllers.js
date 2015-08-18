'use strict';

// Controller
var ctrl = angular.module('wsc.controllers', []);

var HomeCtrl = function ($scope) {

};
ctrl.controller('HomeCtrl', ['$scope', HomeCtrl]);


//ctrl.controller('LibraryCtrl', ['$scope', 'books', 'movies', function ($scope, books, movies) { }]);
var ArticleCtrl = function ($scope, $rootScope, articles) {
    $scope.articles = articles.data;
  
    $scope.addToCart = function (id, qty, price, name) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, subTotal: (price * qty) });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('ArticleCtrl', ['$scope', '$rootScope', 'articles', ArticleCtrl]);


var ArticleDetailsCtrl = function ($scope, $rootScope, article) {
    $scope.articleDetail = article.data;

    $scope.addToCart = function (id, qty, price) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, subTotal: (price * qty) });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('ArticleDetailsCtrl', ['$scope', '$rootScope', 'article', ArticleDetailsCtrl]);


var OrderCtrl = function ($scope, $rootScope) {
   
};
ctrl.controller('OrderCtrl', ['$scope', '$rootScope', OrderCtrl]);


var CartCtrl = function ($scope, $rootScope) {

};
ctrl.controller('CartCtrl', ['$scope', '$rootScope', CartCtrl]);