const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
	let date = new Date();
	console.log(
		`Request method: ${req.method}, request url: ${
			req.originalUrl
		} on ${date.toISOString()}`
	);
	next();
}

module.exports = server;
