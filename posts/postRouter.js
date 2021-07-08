const express = require('express');
const posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
	posts.get(req.query).then((post) => {
		res.status(200).json(post);
	});
});

router.get('/:id', validatePostId, (req, res) => {
	posts.getById(req.params.id).then((post) => {
		res.status(200).json(post);
	});
});

router.delete('/:id', validatePostId, (req, res) => {
	posts.remove(req.params.id).then((post) => {
		res.status(200).json({ id: Number(req.params.id) });
	});
});

router.put('/:id', validatePostId, (req, res) => {
	posts
		.update(req.params.id, req.body)
		.then((post) => res.status(200).json(post));
});

// custom middleware

function validatePostId(req, res, next) {
	posts.getById(req.params.id).then((user) => {
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(400).json({ message: 'invalid user id' });
		}
	});
}

module.exports = router;
