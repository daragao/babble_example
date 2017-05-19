const config = {
    nodes: [
        { name: 'node1', ip: '172.77.5.1', submitTxPort: 1338, clientIp: '127.0.0.1', commitTxPort: 9001 },
        { name: 'node2', ip: '172.77.5.2', submitTxPort: 1338, clientIp: '127.0.0.1', commitTxPort: 9002 },
        { name: 'node3', ip: '172.77.5.3', submitTxPort: 1338, clientIp: '127.0.0.1', commitTxPort: 9003 },
        { name: 'node4', ip: '172.77.5.4', submitTxPort: 1338, clientIp: '127.0.0.1', commitTxPort: 9004 },
    ],
	restServer: { port: 3000 },
	getId: (() => { var id = 0; return (() => (++id)); })()
};

module.exports = config;
