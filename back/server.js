'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	return res.status(200).send({'message': 'This is the main script'});});

const Reflection = require('./src/controllers/Reflections');

app.post('api/v1/reflections', Reflection.create);
app.get('api/v1/reflections', Reflection.getAll);
app.get('api/v1/reflections', Reflection.getOne);
app.put('api/v1/reflections', Reflection.update);
app.delete('api/v1/reflections', Reflection.delete);

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