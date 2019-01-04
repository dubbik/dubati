'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/api/', (request, response) => {
    var number = request.query.number;
    if(number == 666){
    	response.status(400).json({"error":"Jquery parameter is not a number"});
    	console.log('Error for test: 666');
    } else if (isNaN(number)) {
    	response.status(400).json({"error":"Jquery parameter is not a number"});
    	console.log('Error. Jquery parameter is not a number');
    } else {
    	let fizzbuzz = number<=0? "Number, please?" :  number%15===0? "FizzBuzz" : number%5===0? "Buzz" : number%3===0? "Fizz" : number;
    	response.status(200).json({"answer":fizzbuzz});
    	console.log('Success: '+fizzbuzz);
	}    	
    response.end();
});

app.listen(8080, () => {
    console.log('Server is running!');
});