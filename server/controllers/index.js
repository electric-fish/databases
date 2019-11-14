var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      res.writeHead(200);
      console.log("This was successful get!")
      res.write(JSON.stringify(
        { results: [{objectId: '1', createdAt: '2019-11-14', username: 'hi', roomname: 'hello', text: 'this is the message'}]
        }
      ));
      res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(200);
      console.log("This was successful post!");
      res.write("This was successful post!");
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

