// const config = require('./config');
// const mongoose = require('mongoose');
//
// module.exports = () => {
//   return new Promise((resolve, reject) => {
//     mongoose.Promise = global.Promise;
//     mongoose.set('debug', true);
//
//     mongoose.connection
//       .on('error', error => reject(error))
//       .on('close', () => console.log('Database connection closed.'))
//       .once('open', () => resolve(mongoose.connections[0]));
//
//     mongoose.connect(config.MONGO_URL);
//   });
// };




// const MongoClient = require("mongodb").MongoClient;
//
// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, { useNewUrlParser: true });
//
// mongoClient.connect(function(err, client){
//
//     const db = client.db("usersdb");
//     const collection = db.collection("users");
//     let user = {name: "Tom", age: 23};
//     collection.insertOne(user, function(err, result){
//
//         if(err){
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
// });
