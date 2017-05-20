const net = require('net');
const express = require('express')
const http = require('http');
const socketio = require('socket.io');

const config = require('./config.js');
const submitTx = require('./submitTx.js');
const commitTxServer = require('./commitTx.js');

/*
 * REST SERVER
 */
const app = express()
app.get('/channels',(req,res) => {

    const resJson = config.nodes.reduce((prev,node) => {
        prev[node.name] = {
            submitTxResponseChannels: `submitTxResponse@${node.name}`,
            submitTxChannels: `submitTx@${node.name}`,
            commitTxChannels: `commitTx@${node.name}`
        };
        return prev;
    },{});
    return res.send(resJson);
});
//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

/*
 * WEBSOCKET IO
 */
//what we are using for now are namespaces and not channels on IOSockets
//but later we can change to sockets
const httpServer = http.Server(app);
const io = socketio(httpServer);

const totalConnectedUsers = () => {
    const connectedSockets = io.sockets.connected;
    const totalConnections = Object.keys(connectedSockets).length
    return totalConnections;
};

const onCommitTxReceived = (channelName,data) => {
    //console.log(channelName,data);
    //const strArr = data.params.map((p) => (new Buffer.from(p, 'base64').toString('utf8')));
    io.emit(channelName,data);
};

const onUserMsgReceived = (nodeName,ip,port,msg) => {
    console.log('message: ' + msg);
    const channelName = 'submitTxResponse@'+nodeName;
    submitTx(ip,port,msg)
        .then((data) => io.emit(channelName,data))
        .catch(console.log);
};

io.on('connection', (socket) => {
    console.log('a user connected, total users connected:',totalConnectedUsers());
    socket.on('disconnect', () => console.log('user disconnected, total users connected:',totalConnectedUsers()));
    //listen to all the submitTx channels
    config.nodes.forEach((node) => {
        const channelName = 'submitTx@'+node.name;
        socket.on(channelName, onUserMsgReceived.bind(this,node.name,node.ip,node.submitTxPort));
    });
});

httpServer.listen(config.restServer, () => console.log(`REST API listening on *:${config.restServer.port}`));
//create a channel per each node (listed in the config file)
config.nodes.forEach((node) =>
    commitTxServer({ port: node.commitTxPort },onCommitTxReceived.bind(this,'commitTx@'+node.name)));
