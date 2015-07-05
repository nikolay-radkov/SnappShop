app.controller('DetailCtrl', function ($scope, $stateParams, $location, $ionicHistory, identity, productsData) {
    $scope.identity = identity;

    if(!identity.isAuthenticated()) {
        $location.path('/login');
    }

    var id = $stateParams.productId;
    $scope.hidden = [];

    var details = function (id) {
        productsData.getProductDetails(id)
            .then(function (data) {
                $scope.product = data.product;
                $scope.type = data.type;
                console.log(data);
                var index = data.product.images.indexOf(data.product.background);
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

    $scope.swipeLeft = function() {
        $location.path('/info/' + id);
    };

    $scope.goBack = function() {
            $ionicHistory.goBack();
    };

    details(id);
});