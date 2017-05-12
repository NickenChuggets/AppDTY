var Sequelize = require('sequelize');

var sequelize = new Sequelize('AppDTY', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: './models/AppDTY.db'
});

var Users = sequelize.define('Users', {
	// id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	name: Sequelize.STRING,
	rank: Sequelize.STRING
}, {
	timestamps: false,
	tableUser: 'Users',
	force: true,
});

sequelize.sync({ force: true }).then(() => {
	Users.create({
		name: 'John Doe',
		rank: 'administrator',
	}).then(out => console.log(out.dataValues));

	Users.create({
		name: 'Jane Deer',
		rank: 'user',
	}).then(out => console.log(out.dataValues));
})


function getUsers() {
	return Users.findAll(
		{ raw: true }
	);
}

function getUser(id) {
	return Users.findById(id);
}

function addUser(name, rank) {
	return Users.create({ name: name, rank: rank });
}

function changeUserRank(id, rank) {
	return Users.update(
		{ rank: rank },
		{ where: { id: id } }
	).then(() => getUser(id))
}

function deleteUser(id) {
	return Users.findOne(
		{ where: { id: id } }
	)
		.then(function(users) {
			return users.destroy();
		})
}

module.exports = {getUsers, getUser, addUser, changeUserRank, deleteUser}