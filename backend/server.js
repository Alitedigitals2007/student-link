const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// 1. IMPROVED CORS: Be explicit to avoid browser rejection
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Required if you decide to use cookies later
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // Apply explicit options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = socketIO(server, {
  cors: corsOptions, // Use the same options for Socket.io
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/timeline', require('./routes/timeline'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/payments', require('./routes/payments'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Student Link Backend is running' });
});

// Socket.IO Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-joined', { userId: socket.id });
  });

  socket.on('send-message', (roomId, message) => {
    io.to(roomId).emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
