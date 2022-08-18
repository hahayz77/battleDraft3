const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("<h1>HI<h1/>");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('selectChampion', (msg) => {
        console.log(msg);
        console.log(socket.id); 
        io.emit('selected', msg);
      });

    socket.on('players', (A, B) => {
        io.emit('players', A, B);
    });  

  });

server.listen(3030, () => {
  console.log('listening on *:3030');
});