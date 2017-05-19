const net = require('net');
const config = require('./config.js');

/*
 * SUBMIT TX CLIENT
 */
const submitMsg = (ip,port,str) => new Promise((resolve,reject) => {
    const messageId = config.getId();
    const generateSubmitTx = (str) => ({
        method: 'Babble.SubmitTx',
        params: [Buffer(str).toString('base64')],
        id: messageId
    });

    //const client = new net.Socket({ allowHalfOpen: true, readable: true, writable: true });
    const client = new net.Socket();
    client.setEncoding('utf8');
    const submitTx = (str) => client.write(JSON.stringify(generateSubmitTx(str)));
    client.on('data', (data) => {
        //console.log('Received: ' + data);
        client.end();
        resolve(JSON.parse(data));
    });

    client.on('connect', () => {
        console.log('Connection made')
        submitTx(str)
    });
    client.on('error', (err) => reject(err));
    client.on('drain', () => console.log('Connection drained',messageId));
    client.on('end', () => {
        console.log('Connection ended',messageId);
        client.destroy();
    });
    client.on('close', () => console.log('Connection closed',messageId));

    const connectSubmitTx = () => client.connect(port, ip);
    connectSubmitTx();
});

module.exports = submitMsg;
