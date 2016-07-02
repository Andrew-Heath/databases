var db = require('../db').dbConnection;

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (res) {
      var queryString = 'SELECT m.id, m.message, u.username, r.roomname FROM messages m INNER JOIN users u ON (m.user=u.id) INNER JOIN rooms r on (m.room=r.id)';
      queryHelper(queryString, res);
    },
    // a function which can be used to insert a message into the database
    post: function (data, res) {

      var queryString = 'SELECT * FROM rooms WHERE roomname="' +
          data.roomname + '"';
      queryHelper(queryString, res, function(err, results) {
        if (results.length === 0) {
          queryString = 'INSERT rooms VALUE(0, "' +
          data.roomname + '")';
          queryHelper(queryString, res, function(err, results) {
            queryString = 'INSERT messages VALUE(0, "' + 
              data.message + 
              '", (SELECT id FROM users WHERE username="' + 
              data.username + 
              '"), (SELECT id FROM rooms WHERE roomname="' + 
              data.roomname + '"))';
            queryHelper(queryString, res);
          });
        } else {
          console.log('in message');
          console.log('message', data);
          queryString = 'INSERT messages VALUE(0, "' + 
            data.message + 
            '", (SELECT id FROM users WHERE username="' + 
            data.username + 
            '"), (SELECT id FROM rooms WHERE roomname="' + 
            data.roomname + '"))';
          queryHelper(queryString, res);
        }
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
      var queryString = 'SELECT * FROM users WHERE username="' + 
        data.username + '"';
      queryHelper(queryString, res, function(err, results) {
        if (results.length === 0) {
          queryString = 'INSERT users VALUE(0, "' + 
          data.username + '")';
          queryHelper(queryString, res);
        } else {
          res.send(results);
        }
      });
    }
  }
};

var queryHelper = function(queryString, res, cb) {
  cb = cb || function(err, results) {
    res.send({results: results});
  };
  db.query(queryString, [], cb);
};

