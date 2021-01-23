
// var ffmpeg = require('fluent-ffmpeg'); 
// var outputh = 'rtmp://' + 'localhost' + ':' + '1935' + '/live/' + '123' ;
// var ffmpegPath = 'F:/ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/ffmpeg.exe';
// let myCam = 'HD WebCam';// 这个为电脑摄像头的名字；
// command = new ffmpeg('video=' + myCam) // 这里写的是您的电脑摄像头的名字
//     .setFfmpegPath(ffmpegPath)
//     .inputOptions('-f dshow')
//     .size('800x600')
//     .on('start', function(commandLine) {
//         console.log("start push......." + commandLine);
//         console.log("start command......." + command);
//     })
//     .on('end', function() {
//         console.log("storp push........")
//         stopPush();
//     })
//     .on('error', function(err, stdout, stderr) {
//         console.log('error:' + err.message);
//         console.log('stdout:' + stdout);
//         console.log('stderr:' + stderr);
//         stopPush();
//     })
//     .addOptions([
//         // '-preset veryfast',
//         '-rtsp_transport tcp',
//         '-f rtsp'
//     ])
//     .pipe(outputh, { end: true });