'use strict';

app.factory('productsData', function ($http, $q, baseUrl) {
    var productsUrl = baseUrl + '/products';

    return {
        getAllProducts: function () {
            var deferred = $q.defer();
            $http.get(productsUrl)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        getProductDetails: function(id) {
            var deferred = $q.defer();
            $http.get(productsUrl + '/' + id)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        updateProductBackground: function(id, image) {
            var deferred = $q.defer();
            $http.put(productsUrl + '/' + id, { image: image})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }
});