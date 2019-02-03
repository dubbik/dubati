'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const chatController = require('./controllers/chatCtrl');
const fizzController = require('./controllers/fizz');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get('/chat', chatController.chatGet);
app.post('/chat', chatController.chatPost);
app.get('/api/', fizzController.fizzGet);

app.listen(8080, () => {
    console.log('Server is running on 8080!');
});
