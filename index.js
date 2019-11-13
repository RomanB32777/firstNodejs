// let things  = require('./new');
// let events = require('events');
// const app = require('./app');
// const database = require('./database');
// const config = require('./config');
// //const gulpfile = require('./gulpfile');
//
//
// database()
//   .then(info => {
//     console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
//     app.listen(config.PORT, () =>
//       console.log(`Example app listening on port ${config.PORT}!`)
//     );
//   })
//   .catch(() => {
//     console.error('Ubable to connect to database');
//     process.exit(1);
//   });

//app.listen(3000);
//app.listen(config.PORT, () => console.log(`Example app listenong on port ${config.PORT}`));

// let server = http.createServer(function(req, res) {
//  console.log("URL " + req.url);
// if (req.url === '/index' || req.url === '/'){
//   res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//   fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(res);
// }
// // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
// // let myReadShort = fs.createReadStream(__dirname + '/index.html', 'utf-8')
// // myReadShort.pipe(res);
// //  res.end('Hello world<!');
// });
//
// server.listen(3000, '127.0.0.1');


// let myEmit = new events.EventEmitter();
//
// myEmit.on('some_event', function(text) {
//   console.log(text);
// });
//
// myEmit.emit('some_event', 'Обработка собтия');
//
// console.log(things.some_value);
//
// console.log(things.array_count([1,3,4,2]));
//
// console.log(things.multiply(5, 8));
