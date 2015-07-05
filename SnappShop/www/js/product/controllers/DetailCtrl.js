app.controller('DetailCtrl', function ($scope, $stateParams, $location, $ionicPopup, $ionicHistory, identity, productsData) {
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
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Cannot load product details!'
                });
                alertPopup.then(function (res) {
                    $location.path('/tab/home');
                });
            });
    };

    $scope.changeBackground = function (image, index) {
        productsData.updateProductBackground(id, image)
            .then(function (success) {
                if (success) {
                    $scope.product.background = image;
                    $scope.hidden = [];
                    $scope.hidden[index] = true;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: 'Successfully changed the background!'
                    });
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Cannot change product background!'
                    });
                    alertPopup.then(function (res) {
                        $location.path('/tab/home');
                    });
                }
            },
            function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Cannot change product background!'
                });
                alertPopup.then(function (res) {
                    $location.path('/tab/home');
                });
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