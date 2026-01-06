const socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    transports: ["polling", "websocket"],
    allowEIO3: true, // false by default
    pingInterval: 9000,
    pingTimeout: 15000,
  });

  io.on('connection', (socket) => {
    // console.log('New client connected');

    socket.on('joinRoom', (room) => {
      socket.join(room); // This will make the socket join the specified room
      console.log(`User joined room. ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };