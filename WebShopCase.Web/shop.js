(function() {

    var shop = function($http) {

        var getArticles = function(){
            return $http.get("localhost:7054/api/products")
              .then(function(response) {
                  return response.data;
              });
        };
        
        return {
            getArticles: getArticles
        };
    };

    var module = angular.module("webShopCase");

    module.factory("shop", shop);

}());