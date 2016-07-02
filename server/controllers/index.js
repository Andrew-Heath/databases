var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(res);
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      models.messages.post(req.body, res);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(res);
    },
    post: function (req, res) {
      models.users.post(req.body, res);
    }
  }
};

