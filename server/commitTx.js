const net = require('net');
//const config = require('./config.js');

/*
 * COMMIT TX SERVER
 */
const handleConnection = (conn,callback) => {
	var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
	console.log('new client connection from %s', remoteAddress);
    conn.setEncoding('utf8');

	const onConnData = (d) => {
		var obj = JSON.parse(d);
		conn.write(JSON.stringify({ id: obj.id, result: true, error: null }));
        conn.end();
	}

    conn.on('drain', () => console.log('Connection drained'));
    conn.on('end', () => {
        console.log('Connection ended');
        conn.destroy();
    });
	conn.on('data', onConnData);
	conn.on('data', (d) => callback(JSON.parse(d)));
	conn.on('close', () => console.log('connection from %s closed', remoteAddress));
	conn.on('error', (err) => console.log('Connection %s error: %s', remoteAddress, err.message));

};

const createServer = (serverCfg,callback) => {
    const server = net.createServer({ allowHalfOpen: false });
    server.on('connection', (conn) => handleConnection(conn,callback));
    server.listen(serverCfg, () => console.log('server listening to %j', server.address()));
};

module.exports = createServer;
