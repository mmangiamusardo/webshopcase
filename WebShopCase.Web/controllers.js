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


var OrderCtrl = function ($scope, $rootScope, srvShop) {
    //Function to Reset Scope variables
    $scope.initialize = function() {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.address = '';
        $scope.addressNum = '';
        $scope.zipCode = '';
        $scope.city = '';
        $scope.email = '';

    };

    $scope.initialize();
   
    $scope.save = function () {
        var Order = {};
        Order.FirstName = $scope.firstName;
        Order.LastName = $scope.lastName;
        Order.Address = $scope.address;
        Order.AddressNum = $scope.addressNum;
        Order.ZipCode = $scope.zipCode;
        Order.City = $scope.city;
        Order.Email = $scope.email;

        var promiseOrder = srvShop.postOrder(Order);
        promiseOrder.then(function (d) {
            $scope.OrderId = d.data.OrderID;
        }, function (err) {
            alert(err);
        });
    };
};
ctrl.controller('OrderCtrl', ['$scope', '$rootScope','srvShop', OrderCtrl]);


var CartCtrl = function ($scope, $rootScope) {

    $scope.addToCart = function (id, qty, price, name, pct) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, picture: pct });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };
};
ctrl.controller('CartCtrl', ['$scope', '$rootScope', CartCtrl]);