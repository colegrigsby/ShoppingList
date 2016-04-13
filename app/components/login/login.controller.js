app.controller("loginController", function($scope, $log, userService, $location, $timeout, $rootScope){
    
    $scope.model = {username: "", password: ""};
    $scope.logoffMsg = "Are you sure you want to log off?"

    $scope.ask = true;

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
            $rootScope.$broadcast("loginError");

        }
    }

    $scope.logout = function() {
        userService.clearCurrentUser();


        $location.path('/');

    }

    $scope.home = function(){
        $location.path('/');
    }
    
    
});