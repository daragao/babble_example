## Babble Chat example

 Short example made for [babble.io](https://www.babble.io/) consensus algorithm.

 This example uses websockets to update the messages on the frontend, and call the babble nodes through RPC. Fun project to understand how babble works ;)

 `server`: simple express server that wraps the RPC calls to babble
 `frontend`: simple frontend showing messages being sent to one node
 `frontend2`: simple frontend the allows messages to be sent to multiple nodes, and checks when they are received
