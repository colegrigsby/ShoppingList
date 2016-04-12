app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/home.partial.html',
            controller: "homeController"
        })
        
        .state('home.register', {
            url: '/register',
            templateUrl: 'app/components/login/register.partial.html',
            controller: "registerController"
        })
        
        .state('home.login', {
            url: '/login',
            templateUrl: 'app/components/login/login.partial.html',
            controller: 'loginController'

        })
        .state('home.logout', {
            url: '/logout',
            templateUrl: 'app/components/login/logout.partial.html',
            controller: 'loginController'

        })


    
        
});