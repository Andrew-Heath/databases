var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', 'laa');

var Users = db.define('users', {
  username: Sequelize.STRING
});


var Messages = db.define('messages', {
  message: Sequelize.STRING,
  roomname: Sequelize.INTEGER
});

Users.hasMany(Messages);
Messages.belongsTo(Users);

Users.sync();
Messages.sync();

exports.User = User;
exports.Message = Message;