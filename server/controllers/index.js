var Users = require('../db').Users;
var Messages = require('../db').Messages;
var Sequelize = require('sequelize');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      res.header(defaultCorsHeaders);
      Messages.findAll({include: [Users]})
        .then(function(messages) {
          res.json(messages);
        });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      res.header(defaultCorsHeaders);
      models.messages.post(req.body, res);
    },

    options: function(req, res) {
      res.header(defaultCorsHeaders);
      res.set(200).send();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.header(defaultCorsHeaders);
      User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function (req, res) {
      res.header(defaultCorsHeaders);
      models.users.post(req.body, res);
    },

    options: function(req, res) {
      res.header(defaultCorsHeaders);
      res.set(200).send();
    }
  }
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};
