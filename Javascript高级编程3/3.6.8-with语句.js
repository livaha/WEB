/**with语句 //缓慢语句，避免使用它
 * with语句的作用是将代码的作用域设置到一个特定的对象中。
 * with语句的目的主要是为了简化多次编写同一个对象的工作。
 * //文件'4.2-执行环境及作用域.js'有用到。
 */
{/*请在浏览器中运行
    //如果在浏览器环境下，就不用定义
    let qs = location.search.substring(1);
    let hostName = location.hostname;
    let url = location.href;
    //上面几行代码都包含location对象，如果使用with语句，可以把上面的代码改写成如下
    while(location){
        let qs = search.substring(1);
        let hostName = hostname;
        let url = href;
    }
    */
}
//使用with语句关联了location对象，with语句的代码块内部，每个变量首先被认为是一个局部变量，
//如果在局部环境中找不到该变量的定义，就会查询location对象中是否有同名的属性，如果发现了同名，则以location对象属性作为变量的值。
//注意，严格模式下不允许使用with语句，否则视为语法错误。
//大量使用with语句会导致性能下降，所以在大型应用开发中，不建议使用with语句

{//再例
    let msg = 'hello';
    with(msg){
        console.log(toUpperCase());//HELLO
    }
    //with语句用于字符串，所以在toUpperCase()方法时，解释程序将检查该方法是否是本地函数，
    //如果不是，它将检查伪对象msg,看它是否为该对象的方法，而toUpperCase()是'hello'的方法
}
