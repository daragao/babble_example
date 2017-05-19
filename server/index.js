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
var app = express()
//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

/*
 * WEBSOCKET IO
 */
const httpServer = http.Server(app);
const io = socketio(httpServer);

const totalConnectedUsers = () => {
    const connectedSockets = io.sockets.connected;
    const totalConnections = Object.keys(connectedSockets).length
    return totalConnections;
};

const onCommitTxReceived = (channelName,data) => {
    //console.log('commitTx:',data);
    var strArr = data.params.map((p) => (new Buffer.from(p, 'base64').toString('utf8')));
    io.emit(channelName,strArr);
};

const onUserMsgReceived = (msg) => {
    console.log('message: ' + msg);
    const nodeCfg = config.submitClient[0];
    const channelName = 'submitTxResponse@'+nodeCfg.ip+':'+nodeCfg.port;
    submitTx(nodeCfg.ip,nodeCfg.port,msg)
        .then((data) => io.emit(channelName,data))
        .catch(console.log);
};

io.on('connection', (socket) => {
    console.log('a user connected, total users connected:',totalConnectedUsers());
    socket.on('disconnect', () => console.log('user disconnected, total users connected:',totalConnectedUsers()));
    socket.on('chat message', onUserMsgReceived);
});

httpServer.listen(config.restServer, () => console.log(`REST API listening on *:${config.restServer.port}`));
config.commitServer.forEach((port) => commitTxServer(port,onCommitTxReceived.bind(this,'commitTx:'+port)));
