const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	users
		.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => res.status(500).json({ error: 'error' }));
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	const newPost = req.body;
	users
		.insert(newPost)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => {
			res.status(500).json({ err: 'errr' });
		});
});

router.get('/', (req, res) => {
	users.get(req.query).then((user) => {
		res.status(200).json(user);
	});
});

router.get('/:id', validateUserId, (req, res) => {
	users.getById(req.params.id).then((user) => {
		res.status(200).json(user);
	});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	users
		.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => res.status(500).json({ err: 'errr' }));
});

router.delete('/:id', validateUserId, (req, res) => {
	users.remove(req.params.id).then((user) => {
		res.status(200).json({ id: Number(req.params.id) });
	});
});

router.put('/:id', validateUserId, (req, res) => {
	users
		.update(req.params.id, req.body)
		.then((post) => res.status(200).json(post));
});

//custom middleware

function validateUserId(req, res, next) {
	users.getById(req.params.id).then((user) => {
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(400).json({ message: 'invalid user id' });
		}
	});
}

function validateUser(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing required name field' });
	} else if (!req.body.name) {
		res.status(400).json({ message: 'missing required name field' });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing post data' });
	} else if (!req.body.text) {
		res.status(400).json({ message: 'missing required text field' });
	} else {
		next();
	}
}

module.exports = router;
