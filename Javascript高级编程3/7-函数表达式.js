/**函数表达式
 * 7.0 函数声明和函数表达式
 * 7.1 递归
 */
{//7.0 函数声明和函数表达式
    //定义函数：1 函数声明，2 函数表达式
    //声明：  函数声明提升，可以在执行代码之前先读取函数声明
    function functionName(arg0,arg1,arg2){
        //函数体
    }
    //函数表达式
    let functionName1 = function(arg0,arg1,arg2){
        //函数体
    };

    //函数表达式下创建的函数叫做匿名函数，因为function关键字后面没有标识符，匿名函数有时候也叫拉姆达函数，匿名函数的name属性是空字符串
    console.log(functionName.name);//functionName

    {//错误的做法
        if('符合某些条件'){
            function sayHi(){
                console.log('hi');
            }
        }else{
            function sayHi(){
                console.log('hello');
            }
        }

    }
    {//可以用函数表达式代替上面的
        let sayHi;
        if('符合某些条件'){
            sayHi = function(){
                console.log('hi');
            }
        }else{
            sayHi = function(){
                console.log('hello');
            }
        }

    }
    {//返回匿名函数
        function createComparisonFunction(propertyName){
            return function(obj1,obj2){
                let val1 = obj1[propertyName];
                let val2 = obj2[propertyName];
                if(val1<val2){
                    return -1;
                }else if(val1>val2){
                    return 1;
                }else{
                    return 0;
                }
            }
        }
        //返回的匿名函数可能会被赋值给一个变量，或者以其他方式被调用。

    }
}
{//7.1 递归        
    {//递归阶乘函数  //不好用

        function factorial(num){
            if(num<=1){
                return 1;
            }else{
                return num*factorial(num-1)
            }
        }
        //虽然这个函数表面看来没什么问题，但下面的代码可能导致它的错
        
        let anotherFactorial = factorial;
        factorial = null;
        //console.log(anotherFactorial(4));//TypeError: factorial is not a function
    }
    {//用arguments.callee，它指向正在执行的函数的指针
        function factorial(num){
            if(num<=1){
                return 1;
            }else{
                return num*arguments.callee(num-1)
            }
        }
        let anotherFactorial = factorial;
        factorial = null;
        console.log(anotherFactorial(4));//24 ok
        //通过使用arguments.callee代替函数名，可以确保无论怎样调用函数都不会出问题，因此，在编写递归时，使用arguments.callee总比使用函数名更保险
        //但在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会导致错误，不过，可以使用命名函数表达式来达成相同的结果
    }
    {//使用命名函数 //通用
        let factorial = (function f(num){
            if(num<=1){
                return 1;
            }
            else{
                return num*f(num-1);
            }
        })
        //以上代码创建了名为f()的命名函数表达式，然后将它赋值给变量factorial,即使把函数赋值给另一个变量，函数的名字f仍然有效。
        //这种在严格模式和非严格模式下都行得通
    }
}