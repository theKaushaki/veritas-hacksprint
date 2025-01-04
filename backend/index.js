const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db');
const jwt = require('jsonwebtoken');
const router = require('./routes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.use(cors());
app.use(express.json());

const userSocketMap = {};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', router);

io.on('connection', (socket) => {
    socket.on('authenticate', (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            userSocketMap[userId] = socket.id;

            socket.join(userId);
            console.log(`User ${userId} connected with socket ID ${socket.id}`);

        } catch (error) {
            console.log('Authentication error:', error);
            socket.emit('message', { text: 'Authentication failed' });
        }
    });

    socket.on('disconnect', () => {
        for (let userId in userSocketMap) {
            if (userSocketMap[userId] === socket.id) {
                delete userSocketMap[userId];
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
});

const sendMessageToUser = (userId, message) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
        io.to(socketId).emit('message', { text: message });
        console.log(`Message sent to user ${userId}: ${message}`);
    } else {
        console.log(`User ${userId} is not connected`);
    }
};

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('MongoDB connection error:', error);
    process.exit(1);
});

module.exports = sendMessageToUser;