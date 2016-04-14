app.directive('shoppingList', function (listService, $log) {
    return {
        scope: {
            list: "="
        },
        link: function(scope, elem, attr){

            scope.sorting = "Sort Z to A";
            scope.alpha = true;
            scope.showSort = attr.showSort !== undefined;
            scope.showRemove = attr.showRemove !== undefined;
            scope.model = {newItem: "", quantity: 1};
            //scope.list = listService.getCurrentList();


            scope.add = function(){

                listService.addItem(scope.list.userId, scope.model.newItem, scope.model.quantity);
                scope.model.newItem = "";
                scope.model.quantity = 1;
                scope.list = listService.getCurrentList();

            }

            scope.remove = function(item) {
                listService.removeItem(scope.list.userId, item);
                scope.list = listService.getCurrentList();

            }

            scope.toggleComplete = function(item) {
                listService.toggleComplete(scope.list.userId, item);
                
            }


            //not implemented in this project
            scope.swapSort = function() {
                if (scope.alpha) {
                    scope.sorting = "Sort A to Z";
                }
                else
                    scope.sorting = "Sort Z to A";
                scope.alpha = !scope.alpha;
            }

        },
        templateUrl: 'app/components/list/shoppingList.template.html'
    };
});