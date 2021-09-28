const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('new user connected', 'new user connected!');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
  });

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})

// app.listen(PORT, () => {
//     console.log('listening on PORT ' + PORT);
//     console.log('this is dirname ' + __dirname);
// })