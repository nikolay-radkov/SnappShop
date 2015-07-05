app.controller('InfoCtrl', function ($scope, $stateParams, $location, $state, $ionicPopup, $ionicHistory, identity, productsData) {
    $scope.identity = identity;

    if(!identity.isAuthenticated()) {
        $location.path('/login');
    }

    var id = $stateParams.productId;

    var getProductInfo = function (id) {
        productsData.getProductInfo(id)
            .then(function (data) {
                $scope.item = data;

                $scope.navTitle='<img class="title-image" src="$scope.item.product.background" />';
            },
            function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Cannot get product information!'
                });
                alertPopup.then(function (res) {
                    $location.path('/tab/home');
                });
            });
    };

    $scope.vote = function (voteValue) {
        productsData.updateVote({
            value: voteValue,
            id: id
        })
            .then(function (success) {
                if (success) {
                    //TODO:  update view

                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: 'You successfully voted the product!'
                    });
                    alertPopup.then(function (res) {
                        $state.go( $state.current, {}, {reload: true});

                    });
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Cannot vote the product!'
                    });
                    alertPopup.then(function (res) {
                        $location.path('/tab/home');
                    });
                }
            },
            function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Cannot vote the product!'
                });
                alertPopup.then(function (res) {
                    $location.path('/tab/home');
                });
            })
    };

    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

    getProductInfo(id);
});