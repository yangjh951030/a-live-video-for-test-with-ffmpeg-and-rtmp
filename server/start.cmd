cd "F:/ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/"

::因为我下载了ffmpeg,但是我并没有在环境变量里面设置，所以需要进入到这个目录的bin文件下
:: 打开摄像头的，HD WebCam为电脑设置的摄像头;
::在计算机管理-》设备管理器-》图像设备可以找到摄像头的名字
::下面的脚本可以执行打开摄像头并推流到您设置的服务器
ffmpeg -f dshow -i video="HD WebCam" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/123

:: ffmpeg 的设置我不多说了，自己去官网具体的参数吧，因为我也不会；
::打开音频的,同理找到麦克风的名字即可
::ffmpeg  -f dshow -i audio="麦克风 (Realtek High Definition Audio)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/123

::两个都打开的设置：
::ffmpeg -f dshow -i video="HD WebCam" -f dshow -i audio="麦克风 (Realtek High Definition Audio)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/123
::或者：
::ffmpeg -f dshow -i video="HD WebCam":audio="麦克风 (Realtek High Definition Audio)" -vcodec libx264  -r 25  -preset:v ultrafast -tune:v zerolatency -f flv rtmp://localhost:1935/live/123

::ffplay -f dshow -i video="HD WebCam" 测试摄像头是否可用  

::ffplay xxx  rtmp://localhost:1935/live/stream 用来测试推流是否成功，打开会有点慢 xxx为ffplay的一些播放设置，可以去查看