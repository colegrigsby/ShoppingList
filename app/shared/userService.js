
app.factory('userService', function($rootScope, $log) {

    var service = {};
    var _currentUser = {};


    service.addUser = function (username, password) { //TODO check duplicates etc
        var users = getUsers();

        var dup = users.filter(function(user){
            return user.username == username;
        });
        if (dup[0] != undefined){
            $rootScope.$broadcast("duplicateUser", username);
            
            
            return -1;
        }
        else {
            var id = users.length;

            var user = {id: id, username: username, password: password};
            users.push(user);
            updateUsers(users);
            $rootScope.$broadcast("userAdded", username);
            return id;
        }
    };


    //TODO JSON STUFFS
    service.getUserById = function(userId){
        user = getUsers().filter(function(val) {
            return val.id == userId;
        });
        if (user[0])
            return user[0];
        return null;
        //ERROR HANDLING
    };

    service.getUserByName = function(username){
        user = getUsers().filter(function(val) {
            return val.username == username;
        });
        if (user[0])
            return user[0];
        return null;
    };

    service.removeUser = function(){
        //TODO
    };

    
    //log in function
    service.setCurrentUser = function(user){
        localStorage.currentUser = JSON.stringify(user);
        localStorage.loggedIn = true;
        $rootScope.$broadcast("loggedIn", user.username);
    }

    service.getCurrentUser = function() {
        //$log.log(localStorage.loggedIn == true)
        if (localStorage.loggedIn != undefined && JSON.parse(localStorage.loggedIn) == true)
            return JSON.parse(localStorage.currentUser);
        return -1;
    }

    service.loggedIn = function() {
        if(localStorage.loggedIn != undefined)
            return JSON.parse(localStorage.loggedIn);
        return false;
    }

    //logout function
    service.clearCurrentUser = function() {
        var name = JSON.parse(localStorage.currentUser);
        localStorage.currentUser = "";
        localStorage.loggedIn = JSON.stringify(false);
        //$log.log(name);
        $rootScope.$broadcast("loggedOff", name.username);
    }
    
    function updateUsers(users){
        localStorage.users = JSON.stringify(users);
    }

    function getUsers(){
        if (!localStorage.users)
            localStorage.users = JSON.stringify([]);
        return JSON.parse(localStorage.users);
    }

    return service;
});
