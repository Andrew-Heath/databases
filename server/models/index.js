var db = require('../db').dbConnection;

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (res) {
      var queryString = 'SELECT m.message, u.username, r.roomname FROM messages m INNER JOIN users u ON (m.user=u.id) INNER JOIN rooms r on (m.room=r.id)';
      queryHelper(queryString, res);
    },
    // a function which can be used to insert a message into the database
    post: function (data, res) {
      // check if room exists
        // if so,
          // post message
        // if no,
          // make room
            // post message
      var queryString = 'INSERT messages VALUE(0, "' + 
        data.message + 
        '", (SELECT id FROM users WHERE username="' + 
        data.username + 
        '"), (SELECT id FROM rooms WHERE roomname="' + 
        data.roomname + '"))';
      queryString = 'INSERT messages VALUE(0, "TEST", 1, 1)';
      db.query(queryString, [], function(err, results) {
        res.send('message saved');
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (res) {
      var queryString = 'SELECT username FROM users';
      queryHelper(queryString, res);
    },
    post: function (data, res) {
      // check if user already exists
        // if so,
          // don't add
        // if no,
          // add to users
      var queryString = 'SELECT * FROM users WHERE username="' + 
        data.username + '"';
      queryHelper(queryString, res, function(err, results) {
        if (results.length === 0) {
          queryString = 'INSERT users VALUE(0, "' + 
          data.username + '")';
          queryHelper(queryString, res);
        } else {
          res.send();
        }
      });
    }
  }
};

var queryHelper = function(queryString, res, cb) {
  cb = cb || function(err, results) {
    res.send(results);
  };
  db.query(queryString, [], cb);
};

