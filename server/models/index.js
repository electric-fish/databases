var db = require('../db');
var Promise = require('bluebird');
// var mysql = require('mysql');

Promise.promisifyAll(db);

module.exports = {
  messages: {
    get: function (req, callback) {
      console.log('WE GOT CONNECTED');

      //query messages table to get all messages

      db.queryAsync('SELECT * FROM messages')
        .catch((err) => {
          throw err;
        })
        .then((results, fields) => {
          console.log("This is results in models ", results);

          var msgs = [];
          for (var i = 0; i < results.length; i++) {
            // db.queryAsync
            var obj = {
              'createdAt': results[i].createdAt,
              'objectId': results[i].id,
              'text': results[i].text,
              'username': 'divy',
              'roomname': 'test',
              // 'username': ???,
              // 'roomname': ???,
            };
            console.log(obj);
            msgs.push(obj);
          }
          var data = {
            results: msgs
          };
          // callback(null, results);
          callback(null, data);
        });
    }, // a function which produces all the messages
    post: function (req, callback) {
      let reqObj = req.body;
      let userId = null;

      db.queryAsync('SELECT username = ? FROM users', [reqObj.username])
        .then((results) => {
          if (results.length === 0) {
            //add user if not found
          } else {
            userId = results[0].id;
          }
          return '';
        })
        .then((nothing) => {
          db.queryAsync('SELECT roomname')
        }
        );


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () { },
    post: function () { }
  }
};

