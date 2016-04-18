app.factory('listService', function ($rootScope, userService, $log) {

    //Create empty object to start
    var service = {};


    service.getList = function (userId) {
        return _.find(getLists(), {userId: userId});
    }
    service.getCurrentList = function () {
        return this.getList(userService.getCurrentUser().id)
    }


    service.addList = function (userId) {
        var lists = getLists();
        lists.push({userId: userId, items: []});
        updateLists(lists);
    }

    service.addItem = function (userId, newItem, quantity) {
        var list;
        if ((list = this.getList(userId))) {
            var duplicate = _.find(list.items, {item: newItem});
            if(duplicate) {
                var q = (list.items[list.items.indexOf(duplicate)].quantity += quantity);
                $rootScope.$broadcast("list:updateQ", newItem, q);

            }
            else {
                list.items.push({item: newItem, quantity: quantity, completed: false});
                $rootScope.$broadcast("list:add", newItem, quantity);

            }
            updateList(list);

        }
        else {
            // emit an error, clear the fields of the second controller
        }

    }

    //removes all instances of the item where it's quantity is the same 
    service.removeItem = function (userId, itemToRemove) {
        var list = this.getList(userId);

        _.remove(list.items, itemToRemove);
        updateList(list);

        $rootScope.$broadcast("list:remove", itemToRemove.item);
    }

    service.toggleComplete = function(userId, item){
        var list = this.getList(userId);

        _.remove(list.items, item)

        item.completed = !item.completed;

        list.items.push(item);
        updateList(list);
        
        $rootScope.$broadcast("list:completed", item.item);
        
    };
    
    service.removeAllFromList = function(userId) {
        this.deleteList(userId);
        this.addList(userId);
        $rootScope.$broadcast("list:cleared");

    }
    
    service.deleteList = function (userId) {
        var list = this.getList(userId);
        var lists = getLists();
        _.remove(lists, list);
        updateLists(lists);
    };

    function updateLists(lists) {
        localStorage.lists = JSON.stringify(lists);
    }

    function getLists() {
        if (!localStorage.lists)
            localStorage.lists = JSON.stringify([]);
        return JSON.parse(localStorage.lists);
    }

    //
    function updateList(list) {
        lists = getLists();
        _.remove(lists, {userId: list.userId});
        lists.push(list);
        updateLists(lists);
    }

    function listIndex(list){
        var lists = getLists();
        return _.indexOf(lists, list);
    }

    return service;

});