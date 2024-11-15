const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir los archivos estáticos (HTML, CSS, JS) desde la carpeta "public"
app.use(express.static('public'));

// Al aceptar una conexión, se maneja a cada cliente individualmente
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado.');

  // Solicita el nombre de usuario
  socket.on('set username', (username) => {
    socket.username = username;
    io.emit('chat message', `${username} se ha unido al chat.`);
  });

  // Maneja los mensajes de chat
  socket.on('chat message', (msg) => {
    if (socket.username) {
      io.emit('chat message', `${socket.username}: ${msg}`);
    }
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado.');
    if (socket.username) {
      io.emit('chat message', `${socket.username} ha salido del chat.`);
    }
  });
});

// Inicia el servidor
server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
