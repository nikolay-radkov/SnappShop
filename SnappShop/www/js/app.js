var app = angular.module('starter', ['ionic', 'ngRoute', 'ngCookies', 'ngTouch']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})
    .constant('baseUrl', 'http://localhost:3000')
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('top');
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/account/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/account/signup.html',
                controller: 'SignUpCtrl'
            })
            .state('detail', {
                url: '/detail/:productId',
                templateUrl: 'templates/product/detail.html',
                controller: 'DetailCtrl'
            })
            .state('info', {
                url: '/info/:productId',
                templateUrl: 'templates/product/info.html',
                controller: 'InfoCtrl'
            })


            // Each tab has its own nav history stack:
            .state('tab.home', {
                url: "/home",
                views: {
                    'tab-home': {
                        templateUrl: "templates/home/index.html",
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('tab.browse', {
                url: "/browse",
                views: {
                    'tab-browse': {
                        templateUrl: "templates/home/browse.html"
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');

    });
