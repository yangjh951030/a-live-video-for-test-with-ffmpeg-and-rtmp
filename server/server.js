const Router  =  require('./route')
const http = require('http');
const url = require('url');
const mediaServer = require('./rtsp'); // rtmp流服务器
const fs = require('fs');
const push = require('./pushStream');
const router = new Router(); //  设置路由
let users = {}; // 存储用户
let rooms = {}; // 存储直播间的，这里只能是一个

router.get('/login',function(context){ // 登录接口
    console.log(context.query);
    let backMessage = {};
    let user = context.query.user;
    if(users[user] === undefined){
        users[user] = user;
        backMessage.success = true;
        backMessage.message = '登录成功';
    }else{
        backMessage.success = false;
        backMessage.message = '登录失败，已经有这个用户';
    }
    context.res.write(JSON.stringify(backMessage));
    context.res.end(); 
})
router.get('/send',function(context){ // 这个功能使用http有点难做，还是用websocket吧
    console.log(context.query);
    let backMessage = {
        message:'发送成功',
        success:true
    }
    context.res.write(JSON.stringify(backMessage));
    context.res.end(); 
})
router.get('/start',function(context){ // 选择自己是直播之后，然后进入请求，服务器为他打开一个流
    console.log('开始直播');
    let user = context.query.user;
    let backMessage = {};
    if(user !== '123'){ // 只有用户是123才能选择直播
        backMessage.success = false;
        backMessage.message = '直播失败,您不是主播'; // 主播也要看到自己的样子
    }else {
        rooms[user] = user;
        backMessage.success = true;
        backMessage.message = '直播成功';
        backMessage.url =  'http://localhost:8000/live/' + user  +'.flv';
        push(user);
    }
    context.res.write(JSON.stringify(backMessage));
    context.res.end(); 
})
router.get('/getRooms',function(context){ // 点击游客的时候应该请求直播室的信息，这里只支持一个直播间
    let group = Object.keys(rooms);
    let backMessage = {};
    backMessage.rooms = group;
    context.res.write(JSON.stringify(backMessage));
    context.res.end();
});
router.get('/getUrl',function(context){ //点击左边的直播间拿到url地址再播放；
    let user = context.query.user;
    let backMessage = {};
    if(rooms[user] !== undefined){
        backMessage.url = 'http://localhost:8000/live/' + user  +'.flv' // 回去一个正常的url，通常不会这么做；
        backMessage.success = true; 
    }else{
        backMessage.success = false;
        backMessage.message = '没有该主播或者主播不存在'; 
    }
    context.res.write(JSON.stringify(backMessage));
    context.res.end();
})

function start(){ // 服务器函数
    function onRequest(request, response) {
        if(request.url !=="/favicon.ico"){ // 去掉这个请求，否则每次请求两次
            response.setHeader("Access-Control-Allow-Origin", "*");//允许的header类型
            response.setHeader('Access-Control-Allow-Headers', 'Content-type');//跨域允许的请求方式
            response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
        　　//可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
            //response.setHeader('Access-Control-Max-Age',1728000);//预请求缓存20天,强缓存，不需要
            request.setEncoding("utf8"); // 设置格式
            let context = {};  // 利用context保存处理结果
            let handle; // 执行函数
            context.req = request;
            context.res = response;
            context.method = request.method;
            if (request.method === 'GET') { // get 方法
                let data =  url.parse(request.url,true); // 需要把路由的参数分割
                context.data = data;
                context.pathname = data.pathname;
                console.log(data.pathname);
                context.query = data.query;
                handle = router.getArray[data.pathname];
                if(typeof handle === 'function'){
                    console.log('start handle')
                    handle(context);
                }else{
                    response.end('已收到');
                }
            } else if(request.method === "POST"){ // post 方法
                context.pathname = request.url;
                let postData = '';
                request.on('data', chunk => {
                    postData += chunk;
                })
                request.on('end', () => {
                    context.body = postData;
                    context.param = postData;
                    handle = router.postArray[pathname];
                    if(typeof handle === 'function'){
                        handle(context);
                    }else{
                        response.end('已收到');
                    }
                })
            }
        }
      }    
    http.createServer(onRequest).listen(7000);
    console.log('server is running at http://localhost:7000');
} // 这个函数超过了50行，不是规范的

start();
mediaServer.run();

