const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Content-Type']
        },
        allowEIO3: true, // Allow Engine.IO version 3
        transports: ['websocket', 'polling'], // Explicitly define transports
        pingTimeout: 60000, // Increase ping timeout for better connection stability
        pingInterval: 25000 // Adjust ping interval
    });

    // Add error handling for connection
    io.engine.on("connection_error", (err) => {
        console.log('Connection error:', err.req);
        console.log('Error message:', err.code, err.message);
        console.log('Error context:', err.context);
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Add error handling for socket events
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log(`${userId} , ${userType}`);
                
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Join error:', error);
                socket.emit('error', { message: 'Failed to join' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;

                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error('Location update error:', error);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        try {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };