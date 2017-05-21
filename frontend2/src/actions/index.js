export const refresh = () => ({ type: 'REFRESH' });
export const sendSubmitTx = (node,msg) => ({ type: 'SEND_SUBMIT_TX', data: { node, msg, time: Date.now() } });
export const receivedSubmitTx = (node,msg) => ({ type: 'RECEIVE_SUBMIT_TX', data: { node, msg, time: Date.now() } });
export const receivedCommitTx = (node,msg) => ({ type: 'RECEIVE_COMMIT_TX', data: { node, msg, time: Date.now() } });
