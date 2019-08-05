/**Function类型
 * ECMAScript中最有意思的，就是函数的。为啥，因为函数实际上是对象 。。。哈哈哈，真有意思 。。。
 * 每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。
 * 函数是对象，函数名是一个指向函数对象的指针，不会与某个函数绑定。
 * 函数通常是使用函数声明语法定义的
 * 5.5.0 定义函数
 * 5.5.1 没有重载（深入理解）
 * 5.5.2 函数声明与函数表达式
 * 5.5.3 作为值的函数
 *       假设有一个数组，我们想要根据某个对象属性对数组进行排序
 * 5.5.4 函数内部属性
 *       arguments,this
 *       arguments.callee,caller
 * 5.5.5 函数的属性和方法
 */
{//5.5.0 定义函数
    function sum1(num1,num2){
        return num1+num2;
    }

    let sum2 = function(num1,num2){
        return num1+num2;
    };

    let sum3 = new Function('num1','num2','return num1+num2'); //不推荐

    //函数名仅仅是指向函数的指针，因此一个函数可以有多个名字
    console.log(sum1(10,10));//20
    let anotherSum = sum1;
    console.log(anotherSum(10,10));//20
    sum1 = null;
    console.log(anotherSum(10,10));//20
    //将sum设置为null，anotherSum依然可以调用

}
{//5.5.1 没有重载（深入理解）
    //把函数名想象为指针，也有助于理解为什么ECMAScript中没有函数重载的概念。
    function addSomeNumber(num){
        return num+100;
    }
    function addSomeNumber(num){
        return num+200;
    }
    let result = addSomeNumber(100);
    //后面的函数会本覆盖前面的函数
    
    //相同作用的定义
    let addSomeNumber1 = function(num){
        return num+200;
    }

}
{//5.5.2 函数声明与函数表达式
    //函数声明：解析器先读取函数声明，并使其在执行任何代码之前可以访问
    //函数表达式：行等到解析器执行到它所在的代码行，才会真正被解释执行
    console.log(sum(1,1));
    function sum(num1,num2){
        return num1+num2;
    }
    //以上代码可以正常支行；代码开始执行前，解析器就通过函数声明提升，将函数声明添加到执行环境中。

    //console.log(sum2(1,1));//error
    let sum2 = function(num1,num2){
        return num1+num2;
    }
    //以上代码在运行时会产生错误，原因在于函数位于一个初始化语句中，而不是一个函数声明。
    //除了什么时候可以通过变量访问函数这一点外，函数声明与函数表达式的语法其实是等价的。

}
{//5.5.3 作为值的函数
    //因为JS中的函数名本身就是变量，所以函数也可以作为值来使用。
    //可以将函数作为参数传递给另一个函数，也可以将函数作为另一个函数的结果返回
    function callSomeFunction(someFunction,someArgument){
        return someFunction(someArgument)
    }

    function add10(num){
        return num+10;
    }
    let result1 = callSomeFunction(add10,10);
    console.log(result1);//20

    function getGreeting(name){
        return 'Hello, ' + name;
    }
    let result2 = callSomeFunction(getGreeting,'Nick');
    console.log(result2);//Hello, Nick

    //假设有一个数组，我们想要根据某个对象属性对数组进行排序，
    //可以定义一个函数，它接收  一个属性名，然后根据这个属性名来创建一个比较函数，如下
    function createComparisonFunction(propertyName){
        return function(obj1,obj2){
            let val1 = obj1[propertyName];
            let val2 = obj2[propertyName];
            if(val1<val2){
                return -1;
            }else if(val1>val2){
                return 1;
            }
            else{
                return 0;
            }
        }
    }
    let data = [{
        name:'Zhang',
        age:3
    },{
        name:'Nick',
        age:9
    }]
    data.sort(createComparisonFunction('name'));
    console.log(data[0].name);//'Nick'
    data.sort(createComparisonFunction('age'));
    console.log(data[0].name);//'Zhang'

}
{//5.5.4 函数内部属性
    //在函数内有两个特殊的对象：arguments和this.
    /**arguments是一个类数组对象，包含着传入函数中的所有参数。虽然arguments的主要用途是保存函数参数，
     * 但是这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。
     */
    //例阶乘函数
    function factorial(num){
        if(num<1){
            return 1;
        }
        else{
            return num*factorial(num-1)
        }
    }
    //定义阶乘函数一般要用到递归算法，在函数有名字的情况下，如果将函数的执行与函数名factorial紧紧耦合在一起，如果函数名改变，会出现问题。
    //为了消除这种紧密耦合的现象，可以调用 arguments.callee
    function factorial2(num){
        if(num<=1){
            return 1;
        }else{
            return num*arguments.callee(num-1)
        }
    }
    //在重写后的factorial2()函数体内，没有再直接引用函数名factorial，这样，无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。
    //例如
    let trueFactorial = factorial2;
    factorial2 = function(){
        return 0;
    };
    console.log(trueFactorial(5));//120
    console.log(factorial2(5));//0
    //将factorial2改变函数体，如果像factorial函数一样直接调用factorial函数名，则trueFactorial返回0

    {//函数内部的另一个特殊对象是this,this引用的是函数据以执行的环境对象--或者也可以说是this值
        //（当在网页的全局作用域中调用函数时，this对象引用的就是window)
        window.color = 'red';
        let o = {color:'blue'};

        function sayColor(){
            console.log(this.color);
        }
        sayColor();//'red'
        o.sayColor = sayColor;
        o.sayColor();//blue

        //牢记，函数的名字仅仅是一个包含指针的变量而已，即使是在不同的环境中执行，全局的sayColor函数与o.sayColor指向的仍然是同一个函数

    }
    {//函数对象另一个属性: caller
        //这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为null
        function outer(){
            innerHeight();
        }
        function inner(){
            console.log(inner.caller);
        }
        outer();

        //以上代码会导致警告框中显示outer函数的源代码，因为outer调用了inner，所以，inner.caller就指向outer().
        //为了实现更松散的耦合，也可以通过arguments.callee.caller来访问相同的信息。
        {
            function outer(){
                inner();
            }
            function inner(){
                console.log(console.log(arguments.callee.caller));
            }
            outer();
        }

        //严格模式下，访问arguments.callee会导致错误。ES5定义了arguments.caller属性，但在严格模式下访问它会导致错误；
        //而在非严格模式下，这个属性始终是undefined.定义这个属性是为了分清arguments.caller和函数的caller属性。
        //严格模式还有一个限制：不能为函数的caller属性赋值，否则会导致错误。
    }
}
{//5.5.5 函数的属性和方法
    //见文件'5.5.5-函数属性和方法.js'

}