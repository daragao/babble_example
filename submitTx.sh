echo "{\"method\":\"Babble.SubmitTx\",\"params\":[\"$(echo "$1" | base64)\"],\"id\":0}"
echo "{\"method\":\"Babble.SubmitTx\",\"params\":[\"$(echo "$1" | base64)\"],\"id\":0}" | nc -v  172.77.5.1 1338
