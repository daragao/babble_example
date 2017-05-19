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
    const submitTxResponseChannels = config.submitClient.map((d) => `submitTxResponse@${d.ip}:${d.port}`);
    const submitTxChannels = config.submitClient.map((d) => `submitTx@${d.ip}:${d.port}`);
    const commitTxChannels = config.commitServer.map((d) => `commitTx@${d.port}`);
    return res.send({
        submitTxResponseChannels,
        submitTxChannels,
        commitTxChannels,
    });
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

const onUserMsgReceived = (ip,port,msg) => {
    console.log('message: ' + msg);
    const channelName = 'submitTxResponse@'+ip+':'+port;
    submitTx(ip,port,msg)
        .then((data) => io.emit(channelName,data))
        .catch(console.log);
};

io.on('connection', (socket) => {
    console.log('a user connected, total users connected:',totalConnectedUsers());
    socket.on('disconnect', () => console.log('user disconnected, total users connected:',totalConnectedUsers()));
    //listen to all the submitTx channels
    config.submitClient.forEach((sCfg) => {
        const channelName = 'submitTx@'+sCfg.ip+':'+sCfg.port;
        socket.on(channelName, onUserMsgReceived.bind(this,sCfg.ip,sCfg.port));
    });
});

httpServer.listen(config.restServer, () => console.log(`REST API listening on *:${config.restServer.port}`));
//create a channel per each node (listed in the config file)
config.commitServer.forEach((cfgCommitSrv) =>
    commitTxServer(cfgCommitSrv,onCommitTxReceived.bind(this,'commitTx:'+cfgCommitSrv.port)));
