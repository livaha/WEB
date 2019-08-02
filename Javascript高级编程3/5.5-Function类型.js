/**Function类型
 * ECMAScript中最有意思的，就是函数的。为啥，因为函数实际上是对象 。。。哈哈哈，真有意思 。。。
 * 每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。
 * 函数是对象，函数名是一个指向函数对象的指针，不会与某个函数绑定。
 * 函数通常是使用函数声明语法定义的
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
    let addSomeNumber = function(num){
        return num+99;
    }

}