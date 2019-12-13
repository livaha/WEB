/**
 * 函数参数的默认值
rest 参数
严格模式
name 属性
箭头函数
尾调用优化
尾逗号
rototype.toString()
的参数省略
 */

//ES6之前 ，不能为函数的参数指定默认值，只能采用变通的方法
{
    function log(x,y){
        y = y || 'World';
        console.log(x,y);
    }
    log('Hello');//Hello World
    log('Hello','China');//Hello China
    log('Hello','')//Hello World   -- 参数y等于空字符，结果被改为默认值。

    //改进：

    function log1(x,y){
        if(typeof y === 'undefined'){
            y ='World';
        }
        console.log(x,y);
    }
    log1('Hello');//Hello World
    log1('Hello','China');//Hello China
    log1('Hello','')//Hello

}

//ES6
{
    function log(x,y = 'Wolrd'){
        console.log(x,y);
    }
    log('Hello');//Hello World
    log('Hello','China');//Hello China
    log('Hello','')//Hello
}

//参数默认值不是传值的，而是每次都重新计算默认值表达式的值，也就是说，参数默认是惰性求值的
{
    let x = 99;
    function foo(p=x+1){
        console.log(p)
    }
    foo();//100
    x = 100;
    foo();//101
    x=300;
    foo();//301
}

{
    function Point(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      
      const p = new Point();
      console.log(p)// Point { x: 0, y: 0 }
}