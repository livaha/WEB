/**异常处理 try..catch */
{//try..catch语法
    try{
        //可能会导致错误的代码
    }catch(error){
        //在错误发生时怎么处理
    }
    /**执行步骤：
     * 1 首先，执行try{...}里面的代码
     * 2 如果执行过程中没有异常，那么忽略catch(err)里面的代码，try里面的代码执行完后跑出该代码块
     * 3 如果执行过程中发生异常，控制流就到了catch(err)的开头，变量err(可以取任何的名称)是一个包含了异常信息的对象
     * 所以发生在try{...}代码块的异常不会使代码停止执行：我们可以在catch里面处理异常。
     */

     {//没有异常的例子
        try{
            console.log('hello');
            console.log('world');
        }catch(err){
            console.log('catch is ignored.');
        }
        console.log('...')
        /*打印：
        hello 
        world  
        ...
        */
     }
     {//有异常的例子
        try{
            console.log('hello');
            haha;
            console.log('world');
        }catch(err){
            console.log('error of occured.');
        }
        console.log('...')
        /*打印：
        hello 
        error of occured.
        ...
         */
     }
     {//try...catch只能处理有效代码之中的异常，如果因语法错误则不能正常工作
     //   try {
     //       {{{{{{{{{{{{
     //     } catch(e) {
     //       alert("The engine can't understand this code, it's invalid");
     //     }
     }
     {//try...catch中捕捉不到计划将要执行的代码,如setTimeout 
        //虽然文档说不行，但node编译是可以执行的。。。
        try{
            setTimeout(function(){
                console.log('timeout');
            },1000)
        }
        catch(e){
            console.log('donot work');
        }
        //打印'timeout'  //虽然文档说不行，但node编译是可以执行的。。。
        
        //-----------
        //要捕捉到计划中将要执行的函数中的异常，那么try...catch必须在这函数之中
        setTimeout(function(){
            try{
                console.log('in try');
            }catch(e){
                console.log('err in cought here!')
            }
        },1000)
        //打印'in try'
     }
}
{//try...catch...finally
    //finally：不管有没有异常，最后都会执行finally
    //语法
    {
        try{
            //尝试执行的代码
        }
        catch(e){
            //异常处理
        }
        finally{
            //最终会执行的代码
        }
    }
    //用例
    {
        try{
            console.log('try1');
            if (confirm('Make an error?')) {
                //...
                return 0;//return语句也不会阻止finally子句执行
            }
        }catch(e){
            console.log('catch1');
            return 0;
        }finally{
            console.log('finally1');
        }
        //如果对于'Make an error'回答'YES'，则执行try-->catch-->finally
        //如果回答'NO'，则执行try-->finally
    }
//https://zh.javascript.info/try-catch#trycatchfinally
}