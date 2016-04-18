
app.factory('userService', function($rootScope, $log) {

    var service = {};
    var _currentUser = {};

    //TODO lodash library

    service.addUser = function (username, password) {
        var users = getUsers();

        var dup = _.find(users, {username: username});
        if (dup){
            $rootScope.$broadcast("user:duplicate", username);
            return -1;
        }
        else {
            var id = users.length;

            var user = {id: id, username: username, password: password};
            users.push(user);
            updateUsers(users);
            $rootScope.$broadcast("user:added", username);
            return id;
        }
    };


    service.getUserById = function(userId){
        return _.find(getUsers(), {id: userId});
    };

    service.getUserByName = function(username){
        return _.find(getUsers(), {username: username});
    };

    service.removeUser = function(userId){
        return _.remove(getUsers(), {id: userId});
    };

    
    //log in function
    service.setCurrentUser = function(user){
        localStorage.currentUser = JSON.stringify(user);
        localStorage.loggedIn = true;
        $rootScope.$broadcast("user:loggedIn", user.username);
    }

    service.getCurrentUser = function() {
        if (this.loggedIn())
            return JSON.parse(localStorage.currentUser);
        return undefined;
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
        $rootScope.$broadcast("user:loggedOff", name.username);
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
