var models = require('../models');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (req, res) {
      res.writeHead(200);
      // models.messages.get();
      // res.write(JSON.stringify(
      //   { results: [{objectId: '1', createdAt: '2019-11-14', username: 'hi', roomname: 'hello', text: 'this is the message'}]
      //   }
      // ));
      // console.log('controller: ', JSON.stringify(undefined));
      let messagesAsync = Promise.promisify(models.messages.get);
      // console.log("This is first test of messagesAsync ", messagesAsync(req));

      messagesAsync(req)
        .then((results) => {
          // console.log("This is promise in controller ", results);
          res.write(JSON.stringify(results));
          res.end();
        })
        .catch((err) => {
          // console.log(err);
          throw err;
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(200);
      console.log("This was successful post!");
      let postAsync = Promise.promisify(models.messages.post);
      postAsync(req)
        .then((results) => {
          res.end();
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    post: function (req, res) { }
  }
};

