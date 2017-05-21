import io from 'socket.io-client';

const wsPort = 3000;
const wsURL = 'http://localhost:'+wsPort;
const socket = io(wsURL);
export default socket;
