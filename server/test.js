const startPush = require('child_process');  // 使用ffplay测试推流是否成功
const path  = require('path');
const testurl = './testCam.cmd'
const cd = 'F:/ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/';
const testurl = 'ffplay -window_title "test play"  rtmp://localhost:1935/live/123' 

function test(){ 
    return new Promise(function(resolve,reject){
        startPush.exec(pushurl,{cwd:cd},function(err,stdout, stderr){  // 两种方法
            if(err){
                reject(err);
                console.log(err);
            }else{
                resolve(); //没有出错就直接resolve
            }
        })
        // startPush.spawn('cmd.exe',['/c',path.join(__dirname + testurl)]); // 两种方法
    })
}

test(); // 测试是否可以拉流