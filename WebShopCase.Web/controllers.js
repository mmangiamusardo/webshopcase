'use strict';

// Controller
var ctrl = angular.module('wsc.controllers', []);

var HomeCtrl = function ($scope) {

};
ctrl.controller('HomeCtrl', ['$scope', HomeCtrl]);


//ctrl.controller('LibraryCtrl', ['$scope', 'books', 'movies', function ($scope, books, movies) { }]);
var ArticleCtrl = function ($scope, $rootScope, articles) {
    $scope.articles = articles.data;
  
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    
    $scope.numberOfPages = function () {
        return Math.ceil($scope.articles.length / $scope.pageSize);
    };

    $scope.addToCart = function (id, qty, price, name, pct) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, picture : pct });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('ArticleCtrl', ['$scope', '$rootScope', 'articles', ArticleCtrl]);


var ArticleDetailsCtrl = function ($scope, $rootScope, article) {
    $scope.articleDetail = article.data;

    $scope.addToCart = function (id, qty, price, name, pct) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, picture: pct });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('ArticleDetailsCtrl', ['$scope', '$rootScope', 'article', ArticleDetailsCtrl]);


var OrderCtrl = function ($scope, $rootScope) {
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.address = '';
    $scope.addressNum = '';
    $scope.zipCode = '';
    $scope.city = '';
    $scope.email = '';

    $scope.save = function () {
        var Order = {};
        //Order.FirstName = 
        alert('marco');
    };
    //srvShop
};
ctrl.controller('OrderCtrl', ['$scope', '$rootScope', OrderCtrl]);


var CartCtrl = function ($scope, $rootScope) {

    $scope.addToCart = function (id, qty, price, name, pct) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, picture: pct });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('CartCtrl', ['$scope', '$rootScope', CartCtrl]);