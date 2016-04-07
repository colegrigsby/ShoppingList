app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/home.partial.html'
        })

        .state('list',{
            url: '/list',
            templateUrl: 'app/components/list/list.partial.html',
            controller: 'listController'
        })

    
        
});