'use strict';

// Controller
var ctrl = angular.module('wsc.controllers', []);

var ArticleCtrl = function ($scope, $rootScope, articles, srvShop, SharedState) {

    //watch model state
    $scope.$watch(function () {
        var newVal = SharedState.get('event');
        return newVal;
    }, function (newValue) {
        console.log('event changed to ' + newValue);
        if (newValue) {

            var promiseArticle = srvShop.getArticle(newValue);
            promiseArticle.then(function (a) {
                $scope.article = a.data;
            }, function (err) {
                alert(err);
            });
        }
    });

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

    $scope.removeFromCart = function (id) {
        for (var i = $rootScope.cart.length - 1; i >= 0; i--) {
            if ($rootScope.cart[i].productId === id) {
                $rootScope.cart.splice(i, 1);
                $rootScope.cartTotal();
                $rootScope.updateCart();
                return;
            }
        }
    };
};
ctrl.controller('ArticleCtrl', ['$scope', '$rootScope', 'articles', 'srvShop','SharedState', ArticleCtrl]);

var OrderCtrl = function ($scope, $rootScope, $location, srvShop) {

    $scope.changeView = function (id) {
        var proc = '/process/' + id;
        $location.path(proc);
    };

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

        var details = new Array();

        for (var i in $scope.subtotals)
        {
            details.push($scope.subtotals[i]);
        }

        var Order = {};
        Order.OrderDetails = details;
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

            $scope.changeView($scope.OrderId);

        }, function (err) {
            alert(err);
        });
    };
};
ctrl.controller('OrderCtrl', ['$scope', '$rootScope','$location','srvShop', OrderCtrl]);

var CartCtrl = function ($scope, $rootScope) {

    $scope.addToCart = function (id, qty, price, name, pct) {
        $rootScope.cart.push({ productId: id, cartQty: qty, unitPrice: price, productName: name, picture: pct });
        $rootScope.cartTotal();
        $rootScope.updateCart();
    };

    $scope.removeFromCart = function (id) {
        for (var i = $rootScope.cart.length - 1; i >= 0; i--)
        {
            if ($rootScope.cart[i].productId === id) {
                $rootScope.cart.splice(i, 1);
                $rootScope.cartTotal();
                $rootScope.updateCart();
                return;
            }
        }
    };

};
ctrl.controller('CartCtrl', ['$scope', '$rootScope', CartCtrl]);

var ProcessCtrl = function ($scope, $rootScope, order) {
    $scope.processedOrder = order.data;

    $rootScope.clearCart();
};
ctrl.controller('ProcessCtrl', ['$scope', '$rootScope','order', ProcessCtrl]);