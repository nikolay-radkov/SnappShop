app.controller('HomeCtrl', function ($scope, $location, identity, productsData) {
    $scope.identity = identity;

    if(!identity.isAuthenticated()) {
        $location.path('/login');
    }

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

                items[i].fakePercent = 0;
                for (j = 0; j < data.products[i].votes.length; j++) {
                    if (!data.products[i].votes[j]) {
                        items[i].fakePercent++;
                    }
                }

                items[i].fakePercent = items[i].fakePercent / data.products[i].votes.length * 100;
            }

            for (var i = 0; i < data.products.length; i++) {
                for (var j = 0; j < data.types.length; j++) {
                    if (data.products[i].typeId.toString() === data.types[j]._id.toString()) {
                        items[i].type = data.types[j];
                    }
                }
            }
            console.log(items);
            $scope.items = items;
        },
        function(err){
            $scope.error = err;
        });
    };

    loadProducts();
});