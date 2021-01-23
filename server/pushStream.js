const startPush = require('child_process');
const path  = require('path');
const fileurl = '/start.cmd'
const cd = 'F:/ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/';
let pushurl = 'ffmpeg -f dshow -i video="HD WebCam" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/123'

function push(user){
    // let pushurl = 'ffmpeg -f dshow -i video="HD WebCam" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/'
    // if(user !== undefined){
    //     pushurl += user;  // 不支持一个摄像头多用，比较麻烦，so 只能是一个人直播，多人看，因此在服务器中实现不太可能，ying
    // }else{
    //     return 
    // }
    startPush.exec(pushurl,{cwd:cd},function(err,stdout, stderr){ // 第一种方法推流,这个是绑定在某个目录下执行
        if(err){
            console.log(err);
        }else{
            console.log('success'); //一人直播；
        } 
        //startPush.spawn('cmd.exe',['/c',path.join(__dirname + fileurl)]); 
        // 第二种方法执行推流，这个是执行某个cmd脚本，我已经写好,这种暂时只支持一个主播直播,因为没法给cmd脚本传入参数
    })
}

module.exports = push;