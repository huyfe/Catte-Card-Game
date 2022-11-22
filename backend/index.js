const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socketIO = require("socket.io");

// Importing MONGOOSE
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Config env 

// Importing the routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const roomRoute = require('./routes/room');

// Importing the event handlers
const registerUserHandlers = require("./handlers/userHandler");

// Connecting to database mongodb
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to database'));

// Setting up the SOCKET IO
const server = http.createServer(app);
const io = socketIO(server, {
    transports: ["polling", "websocket"],
    cors: {
        origin: "*",
    },
    maxHttpBufferSize: 1e8, pingTimeout: 60000
})

const onConnection = (socket) => {
    console.log("A user has connected...");
    registerUserHandlers(io, socket);
}

// Event handler io connection
io.on("connection", onConnection);

// General middlewares
app.use(express.json());
app.use(cors());

// Route middlewares
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);

const port = process.env.PORT;

server.listen(port, () => console.log("Server up and running on port " + port));