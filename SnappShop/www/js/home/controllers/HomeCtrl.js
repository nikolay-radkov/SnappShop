app.controller('HomeCtrl', function ($scope, productsData) {

    var loadProducts = function () {
        productsData.getAllProducts()
            .then(function (data) {
            var items = [];
            items = data.products;

            for (var i = 0; i < data.products.length; i++) {
                for (var j = 0; j < data.users.length; j++) {
                    if (data.products[i].authorId.toString() === data.users[j]._id.toString()) {
                        items[i].author = data.users[j];
                    }
                }
            }

            for (var i = 0; i < data.products.length; i++) {
                for (var j = 0; j < data.types.length; j++) {
                    if (data.products[i].authorId.toString() === data.types[j]._id.toString()) {
                        items[i].type = data.types[j];
                    }
                }
            }

            $scope.items = items;
                console.log($scope.items);
        },
        function(err){
            $scope.error = err;
        });
    };

    loadProducts();
});