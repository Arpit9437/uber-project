const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const connectToDb = require('./db/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

const port = process.env.PORT || 4000;

const server = http.createServer(app);
connectToDb();

server.listen(port, () => {
    console.log(`server running on ${port}`);
});

module.exports = app;

