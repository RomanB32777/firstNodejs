const http = require('http');
const fs = require('fs');
const Post = require('./models/post');
//const crossEnv = require('cross-env');
const staticAsset = require('static-asset');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
//console.log(config);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes');
const _ = require('lodash');


const couples = [['134134', '32'], ['56', '6792']]; // [['id', 'id'], ['id', 'id']]
const couples1 = ['134134', '6', '98', '89'];
const index0 = _.findIndex(couples, arr => _.indexOf(arr, '6792') );

const index = _.indexOf(couples, '134134'); // index найденного элемента, -1 - если не найденного
 const index1 = _.findIndex(couples1, function (el) {

        return el === '89';
 });
console.log(index0);
//console.log(MongoStore);
const app = express();

let urlencodedParser= bodyParser.urlencoded({ extended: false});
app.use(bodyParser.json());

    mongoose.Promise = global.Promise;
    mongoose.set('debug', config.IS_PRODUCTION);

    mongoose.connection
      .on('error', error => console.log(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
      });

    mongoose.connect(config.MONGO_URL, { useFindAndModify: false });

    // sessions
    app.use(
      session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    );

app.post('/about', urlencodedParser, function(req, res) {
 if (!req.body) return res.sendStatus(400);
console.log(req.body);
const { title, body } = req.body;

Post.create({
  title: title,
  body: body
}).then(post => console.log(post.id));

 res.render('about-success', {data: req.body});
})

app.set('view engine', 'ejs');

 //app.use('/public', staticAsset('public'));
app.use('/build', express.static('build'));
//app.use(express.static(path.join(__dirname + 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/news/:id/:name', function(req, res) {
//   res.send('This is - ' + req.params.id + req.params.name);
// })

// app.get('/', function(req, res) {
//   Post.find({}).then(posts => {
//      res.render('index', {posts: posts});
//   });
//     //req.assetFingerprint("/public/css/layout.css") ;
// //  res.sendFile(__dirname + '/index.html');
// });



app.use('/', routes.archive);
app.use('/api/auth', routes.auth); // ?
app.use('/post', routes.post);
app.use('/comment', routes.comment);
app.use('/upload', routes.upload);
app.use('/delete', routes.deleteu);

app.get('/news/:id', function(req, res) {
  console.log(req.query); // /news/id!filter=id&some=city
 res.render('news', {newsId: req.params.id})
})

//404

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
  //  error: error
    error: !config.IS_PRODUCTION ? error : {}
  });
});

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);



//
// /**
//  * A simple ExpressJS server app
//  */
//
// 'use strict';
//
// var express = require('express');
// var http = require('http');
// var path = require('path');
// var app = express();
// var server = http.createServer(app);
//
// app.get('/', function(req, res) {
//
//   // Toggle between serving public/index.html
//   // and sending a text 'Ola Mundo!' to see
//   // nodemon restarting the server upon edit
//
//   res.sendfile('index.html');
// //  res.send('Ola Mundo!');
//
// });
//
// app.use(express.static('public'));
//
// server.listen(3000, 'localhost');
// server.on('listening', function() {
//   console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });
