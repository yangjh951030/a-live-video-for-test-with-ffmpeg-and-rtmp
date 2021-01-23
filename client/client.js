
let user;
let message;
let role;
let sendBtn = document.getElementById('sendBtn'); // 发送按钮；
let loginBtn = document.getElementById('loginBtn'); // 登录按钮；
let userName = document.getElementById('userName');
let messageText = document.getElementById('message');
let status;
let getRoom =  document.getElementById('guestBtn');
let startBtn =  document.getElementById('hostBtn');
let rooms = [];
let remoteVideo =  document.getElementById('remoteVideo');
var localVideo = document.getElementById('localVideo');

userName.addEventListener('change',function(e){
    user = e.target.value;
})
messageText.addEventListener('change',function(e){
    message = e.target.value;
})

loginBtn.addEventListener('click',function(e){ // 前端登录
    if(user === undefined ){
        alert('用户不存在');
        return 
    }
    if(user.length < 2){
        alert('用户名过短')
        return 
    }
    tool.get('/login',user).then((res)=>{
        console.log(res);
        if(res.status === 200 || res.status === 304){
            return  res.json();
        }else{
            alert('登录请求出错');
        }
    }).then((res)=>{
        console.log(res);
        if(res.success === true){
            alert('登录成功');
            e.target.setAttribute('disabled','disabled');
            userName.setAttribute('disabled','disabled');
            if(user === '123'){
                getRoom.setAttribute('disabled','disabled'); // 是主播账号时，游客不可点
            }else{
                startBtn.setAttribute('disabled','disabled');// 是游客账号时，主播不可点
            }
            status = 'success';
        }else{
            alert('登录失败');
        }
    })
})
sendBtn.addEventListener('click',function(e){ //  前端发送消息，未实现
    alert('不开发这个功能，应该采用socket或者websocket做比较好');
})
getRoom.addEventListener('click',function(e){ // 选择了游客，获取直播间的信息;
    if(user === undefined){
        alert('用户不存在');
        return 
    }
    tool.get('/getRooms').then((res)=>{
        if(res.status === 200 || res.status === 304){
            return  res.json();
        }
    }).then((res)=>{
        e.target.setAttribute('disabled','disabled'); // 只可选择一次
        startBtn.setAttribute('disabled','disabled');
        console.log(res);
        rooms = res.rooms;
        appendRooms(rooms);
    })
})
startBtn.addEventListener('click',function(e){ // 选择直播
    if(user === undefined){
        alert('用户未登录');
        return 
    }
    tool.get('/start',user).then((res)=>{
        console.log('start');
        if(res.status === 200 || res.status === 304){
            return  res.json();
        }
    }).then((res)=>{
        if(res.success === true){
            e.target.setAttribute('disabled','disabled'); // 只可选择一次
            getRoom.setAttribute('disabled','disabled');
            startVideo(res.url)
            rooms = res.rooms;
            alert(res.message);
        }else{
            console.log(res);
            alert(res.message);
        }
    })
})
function appendRooms(rooms){ // 传入直播间的信息到各地
    for(let item of rooms){
        let video = document.createElement('div');
        video.innerText = item;
        video.id = item; // 唯一标识
        video.addEventListener('click',function(e){
            let key = e.target.innerText;
            tool.get('/getUrl',key).then((res)=>{
                if(res.status === 200 || res.status === 304){
                    return  res.json();
                }
            }).then((res)=>{
                console.log(res);
                if(res.success === true){
                    startVideo(res.url);
                    // 把播放器的地址设置为；
                }else{
                    alert(res.message);
                }
            })
        })
        remoteVideo.appendChild(video);
    }
}
function startVideo(trueUrl){
    if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: trueUrl // // 前端的http请求需要加上后缀.flv
        });
        flvPlayer.attachMediaElement(localVideo);
        flvPlayer.load();
        flvPlayer.play();
        setTimeout(()=>{
            localVideo.removeAttribute('muted')  ; // 前面需要设置静音，后面再销毁静音属性
        },10000)
    }else{
        alert('播放器不支持');
    }
    
}




