# a-live-video-for-test-with-ffmpeg-and-rtmp
尝试直播的写法1

# 这次的比较麻烦
#后端需要做的事情

需要安装nodejs环境，最好安装10以上的版本；

cd server

npm install


直播的时候还需要安装ffmpeg,一个推流工具；(我不上传了，卡)；可去官网下载

在后端的环境需要做的事情，在pushStream.js中修改关于ffmpeg的目录的问题,如果使用cmd脚本启动ffmpeg，也需要设置一些设置，在脚本里有介绍

所有的事情都做完之后，npm run start 启动


# 前端的事情比较少

主要注意要先登录，输入用户名

主播的用户名为123，登录之后就点击主播按钮就会启动摄像头进行推流

其他的用户的用户名可以随便起，登录之后点击游客会在左边出现123的直播间，点击之后就可看到123的直播（延迟比较高）

##不懂再来问我吧！！！！

qq:1071271152 或者yangjh951030@163.com
