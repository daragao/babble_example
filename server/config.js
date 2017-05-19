const config = {
    submitClient: [{ port: 1338, ip: '172.77.5.1' },{ port: 1338, ip: '172.77.5.2' }
        ,{ port: 1338, ip: '172.77.5.3' },{ port: 1338, ip: '172.77.5.4' }],
	commitServer: [ { port: 9001 }, { port: 9002 }, { port: 9003 }, { port: 9004 } ],
	restServer: { port: 3000 },
	getId: (() => { var id = 0; return (() => (++id)); })()
};

module.exports = config;
