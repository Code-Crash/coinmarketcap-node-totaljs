exports.install = function() {
    F.route('/');
    F.route('/*', view_app);
    F.route('/usage/', view_usage);
};

function view_app() {
    var self = this;
    self.view('app');
}

function view_usage() {
    var self = this;
    self.plain(F.usage(true));
}

/**
 * @desc This will do any backend opration, like store in the DB and for 
 *      clinet its already in index.html with WebSocket.
 */
WEBSOCKETCLIENT(function(client) {
    client.connect('ws://127.0.0.1:8000/');
    client.on('open', function() {
        console.log('OPEN');
    });
    client.on('close', function() {
        console.log('CLOSE');
    });
    client.on('message', function(message) {
        console.log('MESSAGE:>', message && message.symbol, message && message.rank); // Process the message for DB.
    });
});