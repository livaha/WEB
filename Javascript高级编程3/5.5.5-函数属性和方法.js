/**
 * 函数属性和方法
 * 1 属性：length,prototype
 * 2 方法：apply() 和 call()
 */
{/**1 属性：length,prototype */
    {//length属性表示函数希望接收的命名参数的个数
        function sayName(name){
            console.log(name)
        }
        function sum(num1,num2){
            return num1+num2;
        }
        function sayHi(){
            console.log('hi')
        }
        console.log(
            sayName.length,//1
            sum.length,//2
            sayHi.length//0
        )
    }
    {/**prototype
      * 对于ECMAScript中的引用类型而言，prototype是保存它们所有实例方法的真正所在，
      * 换句话说，诸如toString()和valueOf()等方法实际上都保存在prototype名下，只是通过各自对象的实例访问罢了。
      * 第6章会介绍prototype的更重要作用
      * 在ES5中，prototype属性不可枚举，因此使用for-in无法发现
      * */
    }
}
{/**2 函数的2个方法：apply() 和 call()
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
    {/**
     * 传递参数并非apply()和call()真正的用武之地， 
     * 它们真正强大的地方是能够扩充函数赖以生存的作用域。
     */
     /*
        window.color = "red";
        let o = { color: "blue" };
        function sayColor(){
        alert(this.color);
        }
        console.log(sayColor()); //red
        console.log(sayColor.call(this)); //red
        console.log(sayColor.call(window)); //red
        console.log(sayColor.call(o)); //blue 

        //ES5还定义了一个方法：bind()，这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值
        let objSayColor = sayColor.bind(o);
        console.log(objSayColor());//blue
    */
        /**每个函数继承的toLocaleString()和toString()方法始终返回函数的代码，
         * 另外一个继承的valueOf()方法同样也只返回函数代码
         */
    }
}
