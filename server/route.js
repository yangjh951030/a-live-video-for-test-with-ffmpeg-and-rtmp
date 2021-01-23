class Router{ // 简单路由类
    constructor(){
        this.getArray = {};
        this.postArray = {};
    }
    get(name,fn){
        if(typeof fn !== 'function'){
            console.log('不是一个函数，返回')
            return 
        }
        if(this.getArray[name] === undefined){
            this.getArray[name] = fn;
        }else{
            this.getArray[name] = fn;
            console.log('已重置该请求的方法')
        }
    }
    post(name,fn){
        if(typeof fn !== 'function'){
            console.log('不是一个函数，返回')
            return 
        }
        if(this.post[name] === undefined){
            console.log('新写入了一个post方法')
            this.getArray[name] = fn;
        }else{
            this.post[name] = fn;
            console.log('已重置该请求的方法')
        }
    }
}
module.exports = Router;