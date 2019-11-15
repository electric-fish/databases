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
          // console.log("This is results in models ", results);

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
            // console.log(obj);
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
      let roomId = null;

      db.queryAsync('SELECT username = ? FROM users', [reqObj.username])
        .then((userResults) => {
          let keys = Object.keys(userResults[0]);
          console.log(keys);
          if (userResults[0][keys[0]] === 0) {
            //add user if not found
            console.log('posting user ');
            return db.queryAsync('INSERT INTO users (username) VALUES (?)', [reqObj.username]);
          } else {
            userId = userResults[0];
            console.log('hi');
            return '';
          }
        })
        .then((nothing) => {
          console.log('user query complete');
          db.queryAsync('SELECT roomname = ? FROM rooms', [reqObj.roomname])
            .then((roomResults) => {
              console.log('adding room: ', roomResults);
              let keys = Object.keys(roomResults[0]);
              if (roomResults[0][keys[0]] === 0) {
                // add room if not found
                return db.queryAsync('INSERT INTO rooms (roomname) VALUES (?)', [reqObj.roomname]);
              } else {
                roomId = roomResults[0].id;
                console.log('roomId = ', roomId);
                return '';
              }
            });
        })
        .then((nothing) => {
          let roomname = reqObj.roomname;
          let username = reqObj.username;
          let text = reqObj.message;
          let createdAt = '2000-10-11';

          db.queryAsync('INSERT INTO messages (text, createdAt, id_User, id_Room) VALUES (?, ?, (SELECT id from users WHERE username = ?), (SELECT id from rooms WHERE roomname = ?))', [text, createdAt, username, roomname]);

        });
      // .then(() => { //DO INSERT INTO HERE???
      //   db.queryAsync('INSERT INTO ')
      // });


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () { },
    post: function () { }
  }
};

