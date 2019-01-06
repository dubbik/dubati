'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    return res.status(200).send({ 'message': 'This is a babel script' });
});

app.get('/api/', function (request, response) {
    var number = request.query.number;
    if (number == 666) {
        response.status(400).json({ "error": "Jquery parameter is not a number" });
        console.log('Error for test: 666');
    } else if (isNaN(number)) {
        response.status(400).json({ "error": "Jquery parameter is not a number" });
        console.log('Error. Jquery parameter is not a number');
    } else {
        var fizzbuzz = number <= 0 ? "Number, please?" : number % 15 === 0 ? "FizzBuzz" : number % 5 === 0 ? "Buzz" : number % 3 === 0 ? "Fizz" : number;
        response.status(200).json({ "answer": fizzbuzz });
        console.log('Success: ' + fizzbuzz);
    }
    response.end();
});

app.listen(8080, function () {
    console.log('Server is running!');
});