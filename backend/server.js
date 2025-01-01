const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const connectToDb = require('./db/db');

const server = http.createServer(app);
connectToDb();

server.listen(port, () => {
    console.log(`server running on ${port}`)
});