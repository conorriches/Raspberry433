
var myApp = angular.module('lightingApp',[]);

myApp.controller('adminCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout) {

    //List of items
    $scope.editItem = -1;

    $scope.items = [];
    $scope.categories = [];
    $scope.rooms = [];

    $scope.channels = [
        {
            name:"Test",
            items:[1,2]
        }
    ];


    /**
     * Initialise the app
     * Pull in data from the DB
     */
    $scope.init = function(){
        $scope.editingItem = -1;
        $http({
            method: 'GET',
            url: '/api/list'
        }).then(function successCallback(response) {
            var data = response.data;

            for(var i=0; i<data.length; i++){
                if($scope.categories.indexOf(data[i].category) == -1) $scope.categories.push(data[i].category);
                if($scope.rooms.indexOf(data[i].room) == -1) $scope.rooms.push(data[i].room);

            }

            $scope.items = response.data;
        });
    };
    $scope.init();



    $scope.saveItem = function(item){
        console.log("Saving:");
        console.log(item);

        $http({
            method: 'POST',
            url: '/api/item/update/',
            data:{obj: item}
        }).then(function(response) {
            console.info(response);
        });

        $scope.editItem = -1;
    };

    $scope.deleteItem = function(item){

        var c = confirm("Are you sure you want to delete this?");

        if(c){
            $http({
                method: 'POST',
                url: '/api/item/delete/',
                data:{obj: item}
            }).then(function(response) {

                for(var i=0; i < $scope.items.length; i++){
                    if($scope.items[i].id == item.id) $scope.items.splice(i,1);
                }

            },function(response) {
               alert("Failure deleting.");
            });
        }

    };

    $scope.addItem = function(item){
        console.log("Adding:");
        console.log(item);

        $http({
            method: 'POST',
            url: '/api/item/new/',
            data:{obj: item}
        }).then(function(response) {
            //SUCCESS
            $scope.items.push(item);
            $scope.newItem = {};
        },function(response) {
            console.error(response);
        });

        $scope.editItem = -1;
    };


}]);