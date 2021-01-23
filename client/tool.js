let tool = {
    get:function(url,data = undefined){ // 只传一个参数
        url = 'http://localhost:7000' + url;
        let newUrl = data !== undefined ? url + `?user=${data}` : url;
        return fetch(newUrl,{
            method:'get',
            mode: "cors",
            headers:{
                'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
    },
    post:function(url,data){
        url = 'http://localhost:7000' + url;
        return fetch(url,{
            method:'post',
            mode:'cors',
            headers:{
                'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:JSON.stringify(data)
        })
    }
} // 简单封装一个