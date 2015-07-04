app.controller('DetailCtrl', function ($scope, $stateParams, productsData) {
    var id = $stateParams.productId;
    $scope.hidden = [];

    var details = function (id) {
        productsData.getProductDetails(id)
            .then(function (data) {
                $scope.product = data[0];
                var index = data[0].images.indexOf(data[0].background);
                $scope.hidden[index] = true;
            },
            function (err) {
                //TODO: handle error
            });
    };

    $scope.changeBackground = function (image, index) {
        productsData.updateProductBackground(id, image)
            .then(function (success) {
                if (success) {
                    $scope.product.background = image;
                    $scope.hidden = [];
                    $scope.hidden[index] = true;
                }
                else {
                    //TODO: cant update
                }
            },
            function (err) {
                //TODO: handle error
            })
    };

    details(id);
});