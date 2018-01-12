app.factory('websocketService', ['$rootScope', '$timeout', function($rootScope, $timeout) {

    var _ws;
    var _client = '';
    var message;

    // Broadcost when we recive data
    function onMessage(e) {
        var message = JSON.parse(decodeURIComponent(e.data));
        $rootScope.$apply(function() {
            $rootScope.$broadcast('websocket', 'message', message);
        });
    }

    function onClose(e) {
        console.log('open');
    }

    return {

        open: function(url, client) {
            _client = client;
            _ws = new WebSocket(url);
            _ws.onmessage = onMessage;
            _ws.onclose = onClose;
            _ws.onopen = function() {
                console.log('WebSocket Open');
            };
        },

        close: function() {
            _ws.close();
            _ws = null;
            _client = '';
            message = null;
            // $rootScope.$broadcast('websocket', 'message', message);
        },

        send: function(message) {
            _ws.send(encodeURIComponent(JSON.stringify({ message: msg })));
        }
    };

}]);