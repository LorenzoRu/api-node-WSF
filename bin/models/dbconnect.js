mongoose = require('mongoose');
async function dbconnect() {
await mongoose.connect('mongodb://127.0.0.1:27017/tasks');
console.log('connected to database');
};
 dbconnect();

 module.exports = mongoose;