/**
 * Created by zhouli on 18/10/17
 */
const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const app = websockify(new Koa());
app.ws.use(function (ctx, next) {
    return next(ctx)
});
//记录链接的人:聊天室
// let ctxs = [];
// app.ws.use(route.all('/', function (ctx) {
//     ctxs.push(ctx);
//     ctx.websocket.on('message', function (message) {
//         for(let i = 0; i < ctxs.length; i++) {
//             ctxs[i].websocket.send(message);
//         }
//     })
//     console.log(ctx.websocket)
// }));
//单个服务端推送
app.ws.use(route.all('/', function (ctx) {
    ctx.websocket.on('message', function (message) {
        ctx.websocket.send(message);
    })
}));

app.listen(3000);
