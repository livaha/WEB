/**Promise 对象
 *1.Promise 的含义
 *2.基本用法
 *3.Promise.prototype.then()
 *4.Promise.prototype.catch()
 *5.Promise.prototype.finally()
 *6.Promise.all()
 *7.Promise.race()
 *8.Promise.resolve()
 *9.Promise.reject()
 *10.应用
 *11.Promise.try() 
 */

const promise = new Promise(function(resolve,reject){
    //some code

    if(/**异步操作成功 */true){
        resolve(value);
    }else{
        reject(error);
    }
})

promise.then(function(value){
    //success  对象状态变为resolved时调用
},function(error){
    //failure  对象状态变为rejected时调用
})

{
    function timeout(ms){
        return new Promise((resolve,reject)=>{
            setTimeout(resolve,ms,'done');
        })
    }
    timeout(100).then((value)=>{
        console.log(value);
    })
}

{
    let promise = new Promise(function(resolve,reject){
        console.log('Promise');
        resolve();
    })
    promise.then(function(){
        console.log('resolved.');
    })
    console.log('Hi');
}

//用Promise包装了一个图片加载的异步操作，如果加载成功，就调用resolve方法，否则调用reject
{
    function loadImageAsync(url){
        return new Promise(function(resolve,reject){
            const image = new Image();
            image.onload = function(){
                resolve(image);
            };
            image.onerror = function(){
                reject(new Error('Could not load image at '+ url));
            }
            image.src = url;
        })
    }
}

{
    const getJSON = function(url){
        const promise = new Promise(function(resolve,reject){
            const handler = function(){
                if(this.readyState !== 4){
                    return;
                }
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    reject(new Error(this.statusText));
                }
            }
        })
    }
}