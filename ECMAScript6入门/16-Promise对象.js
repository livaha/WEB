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
/*
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
    };
    loadImageAsync('/posts.json')
    .then(function(json){
        console.log('Contents:'+json);
    },function(error){
        console.error('error:',error);
    })
}
//Promise实现Ajax的例子
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
            };
            const client = new XMLHttpRequest();
            client.open('GET',url);
            client.onreadystatechange = handler;
            client.responseType = 'json';
            client.setRequestHeader('Accept','application/json');
            client.send();
        })
        return promise;
    };

    getJSON('/posts.json')
    .then(function(json){
        console.log('Contents:'+json);
    },function(error){
        console.error('error:',error);
    })
}*/

{
    /**p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
        注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。 */
    const p1 = new Promise(function(resolve,reject){
        console.log('b')
    });
    const p2 = new Promise(function(resolve,reject){
        console.log('a')
        resolve(p1);
    })
}

{
    /**p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。 */
    const p1 = new Promise(function(resolve,reject){
        setTimeout(()=>reject(new Error('fail')),3000)
    })
    const p2 = new Promise(function(resolve,reject){
        setTimeout(()=>resolve(p1),1000)
    })
    p2.then(result=>console.log(result))
    .catch(error=>console.log(error))
}

{
    /**调用resolve或reject并不会终结 Promise 的参数函数的执行。 */
    new Promise((resolve,reject)=>{
        resolve(1);
        console.log(2);
    }).then(r=>{
        console.log(r);
    })
}

{
    /**一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。 */
    new Promise((resolve,reject)=>{
        return resolve(1);
        //后面的语句不会执行，应该放在.then里
        console.log('hello');
    })
}