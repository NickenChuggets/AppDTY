var express = require('express');
var userModel = require('../models/user.model');
var router = express.Router();

router.get('/', function(req, res) {
	if (req.query.name === undefined) {
		console.log('tout')
		userModel.getUsers().then(out => res.json(out));
	} else {
		console.log(req.query.name)
		userModel.searchUser(req.query.name).then(out => res.json(out))
	}
});

router.get('/:id', function(req, res) {
	var id = parseInt(req.params.id);
	userModel.getUser(id).then(out => res.json(out));
});

router.post('/', function(req, res) {
	userModel.addUser(req.body.fName, req.body.lName, req.body.rank).then(out => res.json(out.dataValues))
	.catch(err => res.json(err));
});

router.put('/:id', function(req, res) {
	var id = parseInt(req.params.id);
	userModel.changeUserRank(id, req.body.rank).then(out => res.json(out));
});

router.delete('/:id', function(req, res) {
	var id = parseInt(req.params.id);
	userModel.deleteUser(id).then(out => res.json(out.dataValues))
	.catch(() => res.json({error: 'User does not exist'}));
});

module.exports = router;
