app.factory('listService', function ($rootScope, userService, $log) {

    //Create empty object to start
    var service = {};


    service.getList = function (userId) {
        return getLists().filter(function (list) {
            return list.userId == userId;
        })[0];
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

        if ((list = this.getList(userId))) {
            lists = getLists();
            var idx = lists.indexOf(list);
            list.items.push({item: newItem, quantity: quantity});
            updateList(idx, list);
        }
        else {
            // emit an error, clear the fields of the second controller
            $rootScope.$emit("adderror", newItem, userId);
        }

    }

    //check complete, versus remove
    service.removeItem = function (userId, itemToRemove) {

        var rval;
        var list = this.getList(userId);
        list.items = list.items.filter(function (itm) {

            return itm.item != itemToRemove.item || itm.quantity != itemToRemove.quantity;
        });

        var listsIdx = getLists().indexOf(list);

        $log.log(list)
        rval = updateList(listsIdx, list);

        $rootScope.$emit("remove", itemToRemove, userId);

        return rval;
    }

    service.deleteList = function (userId) {

    }

    function updateLists(lists) {
        localStorage.lists = JSON.stringify(lists);
    }

    function getLists() {
        if (!localStorage.lists)
            localStorage.lists = JSON.stringify([]);
        return JSON.parse(localStorage.lists);
    }

    //
    function updateList(idx, list) {
        lists = getLists();
        var ret = lists.splice(idx, 1);
        lists.push(list);
        updateLists(lists);
        return ret;
    }

    return service;

});