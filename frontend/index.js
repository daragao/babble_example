$(function () {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    var nodeName = getParameterByName('node') || 'node1';
    var wsPort = 3000;
    var wsURL = 'http://localhost:'+wsPort;
    $('#messages').append($('<li>').text(nodeName));
    $('#messages').append($('<li>').text(wsURL));
    var socket = io(wsURL);
    $('form').submit(function(e){
        socket.emit('submitTx@'+nodeName, $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('submitTxResponse@'+nodeName, function(msg){
        $('#messages').append($('<li>').text('submitTxResponse@'+ nodeName + ' > ' + JSON.stringify(msg))); });
    socket.on('commitTx@'+nodeName, function(msg){
        $('#messages').append($('<li>').text(JSON.stringify(msg))); });
});
