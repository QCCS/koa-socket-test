// Server (app.js)
var Koa = require('koa');
var app = new Koa();
var socketServer = require('http').Server(app.callback());
var io = require('socket.io')(socketServer);

// socketServer
socketServer.listen(3000);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('message', function (data) {
        console.log(data);
        socket.emit('news', data);
        socket.broadcast.emit('news',data);
    });
});

// httpServer
app.listen(3001);
app.use(async ctx => {
    ctx.body = 'Hello World';
});
