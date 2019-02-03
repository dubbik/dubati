const Requests = require('../models/postgres');
var login = 'New client';

function errorFunc(response, status, errorText){
	console.log(`Oops! Error (${status}): ${errorText}`);
	response.status(status).send(errorText);
}

module.exports.chatGet = function(request, response) {
	console.log(`${login}: ${request.url}`);
	if(request.query.lastid) {
		let lastId = request.query.lastid;
  		if (isNaN(lastId)) {
  			errorFunc(response, 400, 'id is not a number');
  			return;
  		}
  		console.log(`${login}: Requesting messages newer than ${lastId}`);
		try {
			Requests.loadOne(lastId).then(res => {
				let log = res.rows.length<1? `no new messages` : JSON.stringify(res.rows);
				console.log(`${login} is receiving messages from db: ${log}`);
				response.status(200).json(res.rows);    
			});
		} catch(error) {
			errorFunc(response, 400, error);
		}
		return;
	}
    
    if(request.query.login) {
		login = request.query.login;
		let load = request.query.load;
		if (isNaN(load)) {
			errorFunc(response, 400, 'message load limit is NaN');
			return
		}
		console.log(`${login} has logged in!`);
		console.log(`${login} is requesting ${load} last messages...`);
		try {
			Requests.loadAll(request.query.load).then(res => {
			console.log(`${login} is receiving messages from db: ${JSON.stringify(res.rows)}`);
			response.status(200).json(res.rows);
			response.end();
			});
		} catch(error) {
			errorFunc(response, 400, error);
		}
		return;
    }
    response.end();
}    

module.exports.chatPost = function(request, response) {
	console.log(`Received request: ${request.url}`);
	let author = request.body.author;
	let message = request.body.message;
	let now = new Date().toISOString();
	console.log(`${author} says: ${message}`);
	try {
		Requests.newMessage(author, message, now);
		console.log(`Message from ${author} saved!`);
		response.status(200);
	} catch(error) {
		errorFunc(response, 400, error);
	}
	response.end();
}