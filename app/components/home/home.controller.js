app.controller("homeController", function($scope, $rootScope, $log, listService, userService){

    $scope.list = listService.getCurrentList();
    $scope.username = userService.getCurrentUser().username;

    $rootScope.$on("loggedIn", function(data){
        $scope.list = listService.getCurrentList();
        $scope.username = userService.getCurrentUser().username;

    });

    $scope.loggedIn = function(){
        return userService.loggedIn();
    }
    
});