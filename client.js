const socket = io(); // Conectar con el servidor

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Manejar envío de mensajes
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página
    if (input.value) {
        socket.emit('chat message', input.value); // Enviar mensaje al servidor
        input.value = ''; // Limpiar el campo
    }
});

// Escuchar mensajes del servidor
socket.on('chat message', (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    item.classList.add('message');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Mueve el scroll hacia abajo
});
