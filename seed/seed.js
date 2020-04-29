(function () {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/skipg', { useNewUrlParser: true });
  require('../src/api/models/users.model');

  const users = require('./users');

  users.seedUsers().then((user) => {
    console.log('seeded user!');
  });
})();
