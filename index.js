import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoute';
import kafkaRoutes from './src/routes/kafkaRoute';

const app = express();
const PORT = 3000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//Set up default mongoose connection
let mongoDB = 'mongodb://10.24.29.27/CRMdb';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
kafkaRoutes(app);

// serving static files
app.use(express.static('public/img'));
app.use(express.static('public/video'));
app.use(express.static('public/document'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);
