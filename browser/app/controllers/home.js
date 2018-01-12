app.controller('HomeCtrl', ['$scope', '$timeout', 'websocketService', function($scope, $timeout, websocketService) {
    /**
     * Variable section
     */
    $scope.name = 'Coins Browser';
    $scope.messages = [];
    $scope.alias = '';
    $scope.message = '';
    $scope.isConnected = false;
    $scope.sortKey = null;
    $scope.reverse = null;

    /**
     * @desc This will trigger by the broadcast in service when socket send the data
     */
    $scope.$on('websocket', function(e, type, data) {
        console.log(type, data);
        var index;
        if (!data) return;

        index = $scope.findSymbol($scope.messages, 'id', data.id);
        if (~index) { // index !== -1
            $scope.messages[index] = data;
        } else {
            $scope.messages.push(data);
        }

    });

    /**
     * @desc This will find the index of the element
     * @param {*} array 
     * @param {*} attr 
     * @param {*} value 
     */
    $scope.findSymbol = function(array, attr, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };

    // $scope.sort = function(keyname) {
    //     $scope.sortKey = keyname; //set the sortKey to the param passed
    //     $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    // };

    /**
     * @desc Call to open connect with ocket
     */
    $scope.open = function() {
        websocketService.open('ws://127.0.0.1:8000/', $scope.alias);
        $scope.isConnected = true;
    };

    // $scope.open();

    /**
     * @desc Call to close the socket connection
     */
    $scope.close = function() {
        websocketService.close();
        $scope.alias = '';
        $scope.isConnected = false;
        $scope.message = '';
    };

    /**
     * @desc If you want to send the data send from here.
     */
    $scope.send = function() {
        websocketService.send($scope.message);
        $scope.message = '';
    };

}]);