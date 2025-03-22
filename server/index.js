const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // Allows cross-origin requests

// Serve static files correctly
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('chat-message', (msg) => {
        io.emit("chat-message", msg);
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
