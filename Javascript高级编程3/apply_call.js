/**函数的2个方法：apply() 和 call()
 * 每个函数都包含2个非继承的方法apply() 和 call()
 * 2个函数除了接收参数不一样，其作用是一样的
 */
{
/**
 * apply()
 * Parameter： 
 *            1：函数体内this对象
 *            2：Array实例或者arguments对象
 */
    function sum(num1,num2){
        return num1+num2;
    }

    function callSum1(num1,num2){
        return sum.apply(this,arguments);
    }
    function  callSum2(num1,num2){
        return sum.apply(this,[num1,num2])
    }
    console.log(callSum1(10,10),callSum2(10,10)) //20  20
}
{
/**
 * call()
 * Parameter： 
 *            1：函数体内this对象
 *            2：传递给函数的参数必须逐个列举出来
 */

    function sum(num1,num2){
        return num1+num2;
    }

    function callSum(num1,num2){
        return sum.call(this,num1,num2);
    }
    console.log(callSum(10,10)) //20
}


//window.color = "red";
//var o = { color: "blue" };
//function sayColor(){
// alert(this.color);
//}
//console.log(sayColor()); //red
//console.log(sayColor.call(this)); //red
//console.log(sayColor.call(window)); //red
//console.log(sayColor.call(o)); //blue 