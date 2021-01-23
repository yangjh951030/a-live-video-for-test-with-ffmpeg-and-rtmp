
cd "F:/ffmpeg/ffmpeg-N-100672-gf3f5ba0bf8-win64-gpl-shared/bin/"

ffplay -window_title "test play"  rtmp://localhost:1935/live/123

:: ffplay  http://localhost:8000/live/123.flv 来测试http的请求是否成功

::当摄像头打开之后，测试流是否成功,您会发现其实延迟有点高
:: 可以在ffplay中找到更多的办法来测试，但是最后的可以是rtmp地址或者文件