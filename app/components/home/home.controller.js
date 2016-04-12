app.controller("homeController", function($scope, $log, listService, userService){



    $scope.loggedIn = function(){
        return userService.loggedIn();
    }
    
});