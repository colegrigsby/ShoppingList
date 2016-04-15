app.controller("loginController", function($scope, $log, userService, $location, $timeout, $rootScope){
    
    $scope.model = {username: "", password: ""};


    $scope.login = function() {
        //$log.log($scope.model.username, $scope.model.password);
        //check if a user exists and if they authenticate
        if((user = userService.getUserByName($scope.model.username)) && user.password == $scope.model.password){
            //set the applications userID?
            userService.setCurrentUser(user);

            $location.path('/');
            
        }
        else {
            //invalid login
            //$log.log("failure ;(", user );
            $scope.model.password = "";
            $rootScope.$broadcast("login:error");

        }
    }


    
    
    
});

