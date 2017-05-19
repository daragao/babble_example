const http = require('http');
const fs = require('fs');

const dockerRequest = (path,method='GET',body=undefined,contentType="application/json",filepath=undefined) => {
	const bodyStr = body ? JSON.stringify(body) : undefined;
	const options = {
		socketPath: '/var/run/docker.sock',
		method,
		host: 'v1.28',
		path,
		headers: body ? {
			"Content-Type": contentType,
			"Content-Length": Buffer.byteLength(bodyStr)
		} : undefined
	};

	const callback = (resolve,reject,res) => {
		console.log(`STATUS: ${res.statusCode}`);
		res.setEncoding('utf8');
		res.on('data', data => {
			console.log(data)
			resolve(data);
		});
		res.on('error', error => {
			console.error(error)
			reject(error);
		});
		if(res.statusCode == 204 || res.headers['content-length'] == 0) {
			resolve();
		}
	};

	//Promise function
	const makeRequest = (resolve,reject) => {
		const clientRequest = http.request(options, callback.bind(this,resolve,reject));
		//if a file should be sent
		if(filepath)
			fs.createReadStream(filepath).pipe(clientRequest);
		else
			clientRequest.end(bodyStr);
	};
	return new Promise(makeRequest);
};

const createNetwork = () => {
	const networkCreateURL = '/networks/create';
	const networkCreateObj = {
		name: 'babblenet',
		driver: 'bridge',
		CheckDupicate: true,
		Internal: false,
		IPAM: {
			Config: 
			[
				{
					Subnet: "172.77.0.0/16",
					IPRange: "172.77.5.0/24",
					Gateway: "172.77.5.254"
				},
			],
		},
	};
	return dockerRequest(networkCreateURL,'POST',networkCreateObj);
};

const createNodeContainer = (nodeNumber,containerName,keyPath,clientAddr,clientPort) => {
	const thisAddr = `172.77.5.${nodeNumber}`;
	const nodePort = 1337;
	const proxyPort = 1338;
	const babbleCmd = ['run'
		//,'--datadir=".babble"'
		,'--cache_size=50'
		,'--tcp_timeout=1000'
		,'--heartbeat=75'
		,`--node_addr=${thisAddr}:${nodePort}`
		,`--proxy_addr=${thisAddr}:${proxyPort}`
		,`--client_addr=${clientAddr}:${clientPort}`
		,'--log_level=info'];
	console.log(babbleCmd);
	const containerCreateURL = `/containers/create?name=${containerName}`;
	const containerCreateObj = {
		Image: 'babble',
		//Cmd: ['run' ],
		Cmd: babbleCmd,
		Volumes: { '/.babble': {} },
		NetworkingConfig: {
			EndpointsConfig: {
				babblenet: {
					IPAMConfig: { 'IPv4Address': thisAddr },
					IPAddress: thisAddr,
					NetworkID: 'babblenet'
				}
			}
		}
	};
	return dockerRequest(containerCreateURL,'POST',containerCreateObj);
};

const createDummyContainer = (nodeNumber,containerName) => {
	const thisAddr = `172.77.5.1${nodeNumber}`;
	const proxyAddr = `172.77.5.${nodeNumber}`;
	const clientPort = 1339;
	const proxyPort = 1338;
	const dummyCmd= [`--name="client ${nodeNumber}"` 
		,`--client_addr=${thisAddr}:${clientPort}`
		,`--proxy_addr=${proxyAddr}:${proxyPort}`
		,'--log_level=info'];
	const containerCreateURL = `/containers/create?name=${containerName}`;
	const containerCreateObj = {
		Image: 'dummy',
		Cmd: dummyCmd,
		//AttachStdin: true,
		OpenStdin: true,
		Tty: true,
		NetworkingConfig: {
			EndpointsConfig: {
				babblenet: {
					IPAMConfig: { 'IPv4Address': thisAddr },
					IPAddress: thisAddr,
					NetworkID: 'babblenet'
				}
			}
		}
	};
	return dockerRequest(containerCreateURL,'POST',containerCreateObj);
};

const copyFilesToContainer = (containerName,tarFilepath,destPath) => {
	const contentTypeTar = 'application/x-tar';
	const extractArchiveURL = `/containers/${containerName}/archive?path=${destPath}`;
	return dockerRequest(extractArchiveURL,'PUT',undefined,contentTypeTar,tarFilepath);
};

const startContainer = (containerName) => {
	const containerStartURL = `/containers/${containerName}/start`;
	return dockerRequest(containerStartURL,'POST');
};

createNetwork()
	//then() createNodeContainer can be replaced by promise.all()
	.then(createNodeContainer.bind(this,1,'node1','/home/doart3/babble/node1/','172.77.5.254',9000))
	.then(createNodeContainer.bind(this,2,'node2','/home/doart3/babble/node2/','172.77.5.254',9001))
	//.then(createNodeContainer.bind(this,1,'node1','/home/doart3/babble/node1/','172.77.5.11',1339))
	//.then(createNodeContainer.bind(this,2,'node2','/home/doart3/babble/node2/','172.77.5.12',1339))
	.then(createNodeContainer.bind(this,3,'node3','/home/doart3/babble/node3/','172.77.5.13',1339))
	.then(createNodeContainer.bind(this,4,'node4','/home/doart3/babble/node4/','172.77.5.14',1339))
	//then() copyFilesToContainer can be replaced by promise.all()
	.then(copyFilesToContainer.bind(this,'node1','./node1.tar.gz','.babble'))
	.then(copyFilesToContainer.bind(this,'node2','./node2.tar.gz','.babble'))
	.then(copyFilesToContainer.bind(this,'node3','./node3.tar.gz','.babble'))
	.then(copyFilesToContainer.bind(this,'node4','./node4.tar.gz','.babble'))

	//.then(createDummyContainer.bind(this,1,'client1'))
	//.then(createDummyContainer.bind(this,2,'client2'))
	.then(createDummyContainer.bind(this,3,'client3'))
	.then(createDummyContainer.bind(this,4,'client4'))

	.then(() => {
		startContainer('node1')//.then(startContainer.bind(this,'client1'));
		startContainer('node2')//.then(startContainer.bind(this,'client2'));
		startContainer('node3').then(startContainer.bind(this,'client3'));
		startContainer('node4').then(startContainer.bind(this,'client4'));
	})
	.catch((reason) => console.log('error:',reason));
