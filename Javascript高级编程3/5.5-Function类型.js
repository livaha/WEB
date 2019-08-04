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
    
}