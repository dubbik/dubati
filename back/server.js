'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

var now = new Date().toISOString();
var insert = "INSERT INTO messages VALUES ('AI-2', 'Now is: "+now+"', '"+now+"')";
//console.log(insert);
pool.query(insert, (err, res) => {
	console.log(err);
});
//pool.query("INSERT INTO messages VALUES ('Alina', 'One more message 3', '2019-01-07 02:03:05')", (err, res) => {});
pool.query("SELECT * FROM messages", (err, res) => {
//	var objLen = Object.keys(res.rows).length;
	console.log(res.rows);
	pool.end();
});

//Project 1
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
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