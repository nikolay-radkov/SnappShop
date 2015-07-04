app.controller('DetailCtrl', function ($scope, $route, productsData) {
    var id = $route.current.params['id'];

    var details = function (id) {
        productsData.getProductDetails(id)
            .then(function (data) {
                $scope.items = data;
            },
            function () {
                //TODO: handle error
            });
    };

    details(id);
});