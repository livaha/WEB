/**执行环境及作用域
 * 4.2.0 作用域链
 * 4.2.1 延长作用域链
 */
{/**4.2.0 作用域链
    * 全局执行环境：在WEB浏览器中，全局执行环境被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法创建的。
    * 某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁。
    * 全局执行环境直到应用程序退出--例如关闭网页或浏览器时才会被销毁。
    * 
    * 当代码在一个环境中执行时，会创建变量对象的一个作用域链，作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。
    * 假设这个环境是函数，则活动对象在最开始时只包含一个arguments对象（这个对象在全局环境中是不存在的），
    * 作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境，一直延续到全局执行环境；全局执行环境的变量对象始终是作用域链中的最后一个对象.
    * 
    * 标识符解析是沿着作用域链一级一级地搜索标识符的过程,搜索过程始终从作用域链的前端开始,然后逐级地向后回溯,直接找到标识符为止(找不到就报错)
    */
    //示例
    let color = 'blue';
    function changeColor(){
        if(color ==='blue'){
            color = 'red';
        }else{
            color = 'blue';
        }
    }
    changeColor();
    console.log('color is '+ color);
    //在示例中，函数changeColor()的作用域链包含两个对象：它自己的变量对象(其中定义着arguments对象)和全局环境的变量对象。
    //可以在函数内部访问变量color,就是因为可以在这个作用域链中找到它（全局环境）。

    //此外，在局部作用域中定义的变量可以在局部环境中与全局变量互换使用，如下例
    {
        let color = 'blue';
        function changeColor(){
            var anotherColor = 'red';
            function swapColors(){
                let tempColor = anotherColor;
                anotherColor = color;
                color = tempColor;
                console.log(tempColor,anotherColor,color);//red blue red
            }
            //这里不能访问tempColor
            console.log(anotherColor,color);//red blue
            swapColors();
        }
        //这里不能访问anotherColor，tempColor
        console.log(color);//blue
        changeColor();
        //以上代码共涉及3个执行环境：全局环境、changeColor()局部环境和swapColors()的局部环境。
        /**
         * 上面代码作用域链如下
         *      window
         *          |
         *          |___color
         *          |___changeColor()
         *                  |
         *                  |___anotherColor
         *                  |___swapColors()
         *                          |
         *                          |___tempColor
         * 内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。
         */

    }
}
{//4.2.1 延长作用域链
    /**虽然执行环境的类型总共只有两种：全局和局部(函数)，但还是有其他办法来延长作用域链。
     * 有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。
     * 具体来说，就是当执行流进入下列任何一个语句时，作用域链会得到加长：
     *   try-catch语句的catch块；
     *   with语句
     * 这两个语句都会在作用域链的前端添加一个变量对象，对with语句来说，会将指定的对象添加到作用域链中，
     * 对catch语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。
     */
    function buildUrl(){
        let qs = '?debug=true';
        with(location){
            let url = href + qs;
        }
        return url;
    }
    //with
}