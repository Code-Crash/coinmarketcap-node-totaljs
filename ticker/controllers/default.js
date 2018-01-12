var CoinMarketCap = require("node-coinmarketcap");
var _ = require("underscore");


exports.install = function() {
    F.route('/');
    F.route('/usage/', view_usage);
    F.websocket('/', socket_homepage, ['json']); // Open socket here insted of view and pass the socket event to another application.
};

function view_usage() {
    var self = this;
    self.plain(F.usage(true));
}

var controller = null;

/**
 * @desc Broadcast message with the help of socket.
 * @param {*} data 
 */
function send_message(data) {
    socket = controller;
    if (!socket) {
        return;
    }
    socket.send(data);
}

/**
 * Socket Managment
 */
function socket_homepage() {

    controller = this;

    controller.on('open', function(client) {

        console.log('Connect / Online:', controller.online, 'New Clinet ID:', client.id);
        // client.send({ message: 'Hello {0}'.format(client.id) });  // Client is connected client and controller is running socket
        controller.send({
            message: 'Connect new user: {0}\nOnline: {1}'.format(client.id, controller.online)
        }, null, [client.id]);

    });

    controller.on('close', function(client) {

        console.log('Disconnect / Online:', controller.online);
        controller.send({
            message: 'Disconnect user: {0}\nOnline: {1}'.format(client.id, controller.online)
        });

    });

    controller.on('message', function(client, message) {
        console.log(message);
    });
}


/**
 * ########################################
 *  
 *            CoinMarketCap is Start
 * 
 * ########################################
 */

var SYMBOL_CONSTANTS = ['BTC', 'XRP', 'ETH', 'BCH', 'ADA', 'LTC', 'MIOTA', 'XLM', 'XEM', 'DASH', 'XMR', 'NEO', 'EOS', 'TRX', 'BTG', 'QTUM', 'XRB', 'ETC', 'BCC', 'LSK', 'ICX', 'XVG', 'BTS', 'ARDR', 'OMG', 'STEEM', 'ZEC', 'PPT', 'SNT', 'STRAT', 'USDT', 'WAVES', 'BCN', 'HSR', 'KMD', 'DOGE', 'SC', 'GNT', 'REP', 'BNB', 'VERI', 'VEN', 'ARK', 'DCR', 'KCS', 'DRGN', 'SALT', 'PIVX', 'DGB', 'NXT', 'MONA', 'GBYTE', 'BAT', 'AION', 'FCT', 'XZC', 'MAID', 'REQ', 'POWR', 'BTCD', 'RDD', 'KNC', 'CVC', 'ZRX', 'ENG', 'ETN', 'PAY', 'SYS', 'WAX', 'RHOC', 'FUN', 'SAN', 'BTM', 'XBY', 'QASH', 'ETHOS', 'DGD', 'AE', 'XP', 'KIN', 'VTC', 'SKY', 'GAS', 'STORJ', 'ICN', 'GNO', 'ELF', 'GAME', 'DENT', 'SUB', 'QSP', 'GXS', 'RDN', 'WTC', 'STORM', 'BNT', 'MANA', 'UBQ', 'SMART', 'EDG'];

var _options = {
    events: true, // Enable event system
    refresh: 5, // Refresh time in seconds (Default: 60)
    convert: "USD" // Convert price to different currencies. (Default USD) :  "EUR"
}

var coinmarketcap = new CoinMarketCap(_options);

// Trigger this event every 60 seconds with information about All Symbols
_.each(SYMBOL_CONSTANTS, function(symbol) {
    coinmarketcap.on(symbol, (coin) => {
        send_message(coin); // Send Data to socket users.
        console.log('This will by ticker: ', coin.symbol);
    });
});

// // Get all the symbols supported by Coin Market Cap
// coinmarketcap.getAll((coins) => {
//     send_message(coins); // Send Data to socket users.
//     var symbols = [];
//     _.each(coins, function(coin) {
//         symbols.push(coin.symbol);
//     });
//     console.log('Get all coins: ', coins, coins.length);
//     console.log(symbols);
// });