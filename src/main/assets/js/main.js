var io = require('socket.io-client');
var $ = require('jquery');
var moment = require('moment');

var userName = 'user' + Math.floor((Math.random() * 1000) + 1);

var socket = io.connect('http://localhost:9092');

// Buttons
var sendButton = document.getElementById('send');
var disconnectButton = document.getElementById('disconnect');

socket.on('connect', function () {
    output('<span class="connect-msg">Client has connected to the server!</span>');
});

socket.on('chatevent', function (data) {
    output('<span class="username-msg">' + data.userName + ':</span> ' + data.message);
});

socket.on('disconnect', function () {
    output('<span class="disconnect-msg">The client has disconnected!</span>');
});

function sendDisconnect() {
    socket.disconnect();
}

function sendMessage() {
    var message = $('#msg').val();
    $('#msg').val('');

    var jsonObject = {
        userName: userName,
        message: message
    };
    socket.emit('chatevent', jsonObject);
}

function output(message) {
    var currentTime = "<span class='time'>" + moment().format('HH:mm:ss.SSS') + "</span>";
    var element = $("<div>" + currentTime + " " + message + "</div>");
    $('#console').prepend(element);
}


// Add event listeners to buttons
sendButton.addEventListener('click', sendMessage);
disconnectButton.addEventListener('click', sendDisconnect);

$(document).keydown(function (e) {
    if (e.keyCode == 13) {
        $('#send').click();
    }
});