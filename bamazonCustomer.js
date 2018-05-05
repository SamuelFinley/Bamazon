const vorpal = require('vorpal')();
const words = require('lodash/words');
const mysql = require('mysql');
const table = require('./table');

const cli = vorpal;
module.exports = cli;

let username;
let password;
let connectionDB;
let host;
let port;
let pastCmd;
let pastCnts;

cli
    .delimiter(cli.chalk['yellow']('sf~$'))

cli
    .mode('connect <password> [username] [host] [port]')
    .delimiter(cli.chalk['green']('connected>'))
    .init(function (args, callback) {
        password = args.password
        if (!host) {
            host = 'localhost'
        } else {
            host = args.host
        }
        if (!username) {
            username = 'root'
        } else {
            username = username.host
        }
        if (!port) {
            port = 3306
        } else {
            port = args.port
        }
        connectionDB = mysql.createConnection({
            host: host,
            port: port,
            user: username,
            password: password,
            database: "bamazon"
        });

        connectionDB.connect(function (err) {
            if (err) throw err;
            start();
            callback();
        });
    })
    .action(function (input, callback) {
        const [command, ...rest] = words([input], /[@\w]+/g)
        const contents = rest.join(' ')
        if (command === 'disconnect') {
            this.log('have a nice day!')
            connectionDB.end();
            cli.exec('exit');
            process.exit(0);
        } else if (command === 'purchase') {
            lookup(contents);
        } else if (command === 'commands') {
            this.log('disconnect : exits app\npurchase <id> : buys an item\nlist : shows items');
        } else if (command === 'list') {
            start();
        } else {
            this.log(`Command <${command}> was not recognized`);
        }

        callback()
    })

function start() {
    connectionDB.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        new table(res);
        console.log('enter next command');
    });
}

function lookup(id) {
    connectionDB.query(
        "SELECT * FROM products WHERE ?", [{ item_id: id }], function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity === 0) {
                console.log('out of stock');
            } else {
                update(id)
            }
        });
}
function update(id) {
    connectionDB.query(
        "UPDATE products SET stock_quantity = stock_quantity - 1 WHERE ?",
        [
            {
                item_id: id
            }
        ],
        function (error) {
            if (error) throw err;
            console.log("Order placed successfully!");
        }
    );
}
