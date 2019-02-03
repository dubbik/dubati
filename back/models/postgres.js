const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'postgres',
	port: 5432,
	});

module.exports.loadAll = async (qty) => {
	let qText = 'SELECT * FROM (SELECT * FROM messages ORDER BY id desc LIMIT $1) t ORDER BY id';
	let qValues = [qty];
	return  await pool.query(qText, qValues);
}

module.exports.loadOne = async (id) => {
	let qText = 'SELECT * FROM messages WHERE id > $1';
	let qValues = [id];
	return await pool.query(qText, qValues);
}

module.exports.newMessage = (author, message, time) => {
    let qText = 'INSERT INTO messages(author, body, date) VALUES($1, $2, $3)';
    let qValues = [author, message, time];
    pool.query(qText, qValues);
}