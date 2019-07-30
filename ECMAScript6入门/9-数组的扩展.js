/**数组的扩展
 * 1 扩展运算符
 * 2 Array.from()
 * 3 Array.of()
 * 4 数组实例的 copyWithin()
 * 5 数组实例的 find() 和 findIndex()
 * 6 数组实例的 fill()
 * 7 数组实例的 entries()，keys() 和 values()
 * 8 数组实例的 includes()
 * 9 数组实例的 flat()，flatMap()
 * 10 数组的空位 
 * */
{/**1 扩展运算符 */
    console.log(...[1,2,3]); //1 2 3
    console.log(1,...[3,4,4],5); //1 3 4 4 5
    //console.log([...document.querySelectorAll('div')]);

    {//该运算符主要用于函数调用
        function push(array,...items){
            array.push(...items);
        }
        function add(x,y){
            return x+y;
        }
        const numbers = [4,5];
        console.log(add(...numbers)); //9
    }
    {//扩展运算符与正常的函数参数可以结合使用
        function f(v,w,x,y,z){
            return v;
        }
        const args = [0,2];
        f(-1,...args,3,...[4]);

        //扩展运算符后面还可以放置表达式
        let x = 3;
        const arr = [
            ...f(x>0?['a']:[]),
            'b',
        ]
    }
    {//只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
        //(...[2,3]) //SyntaxError: Unexpected number
        //console.log((...[3,4])) //SyntaxError: Unexpected number
        console.log(...[3,4]) //3 4
    }
    {//替代函数的apply方法
        //由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
        {
            //ES5写法
            function f(x,y,z){
                //...
            }
            let args = [2,3,4];
            f.apply(null,args);

            //ES6写法
            function fun(x,y,z){};
            args = [3,4,5];
            fun(...args);
        }
        {//下面是扩展运算符取代apply方法的实例，应用Math.max方法，简化求出一个数组最大元素的写法。
            //ES5写法
            Math.max.apply(null,[3,4,5]);

            //ES6的写法
            Math.max(...[3,4,5]);

            //等同于
            Math.max(3,4,5);
        }
        {//实例： 通过push函数，将一个数组添加到另一个数组的尾部
            //ES5写法
            let arr1 = [0,1,2];
            let arr2 = [3,4,5];
            Array.prototype.push.apply(arr1,arr2);

            //ES6写法
            let arr3 = [0,1,2];
            let arr4 = [3,4,5];
            arr3.push(...arr4);
        }
        {//例子
            //ES5
            new (Date.bind.apply(Date,[null,2015,1,1]));
            //ES6
            new Date(...[2019,3,3]);
        }
    }
    {//扩展运算符的运用
        {//1 复制数组
            //数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
            {//此复制不是克隆，而是指向同一份数据的另一个指针，修改a2会导致a1变化
                const a1 = [1,2];
                const a2 = a1;
                a2[0] = 3;
                console.log(a1);//[3,2]
            }
            {//这种写法是克隆，修改a2不会对a1产生影响
                const a1 = [2,3];
                //写法一
                const a2 = [...a1];
                //写法二
                const [...a3] = a1;
            }
        }
        {//2 合并数组（浅拷贝）
            //扩展运算符提供了数组合并的新写法
            const arr1 = ['a','b'];
            const arr2 = ['c'];
            const arr3 = ['d','e'];
            //ES5的合并数组
            let newarr = arr1.concat(arr2,arr3);
            console.log(newarr);//[ 'a', 'b', 'c', 'd', 'e' ]

            //ES6的合并数组
            let newarr2 = [...arr1,...arr2,...arr3]
            console.log(newarr2);//[ 'a', 'b', 'c', 'd', 'e' ]

            //注意，这是浅拷贝，修改原数组会同步反映到新数组
        }
        {//3 与解构赋值结合
            {//扩展运算符可以与解构赋值结合起来，用于生成数组
                let list = [2,2,3,4,5];
                let a,rest,b,res;
                //ES5
                a = list[0]; //2
                rest = list.slice(1);//[ 2, 3, 4, 5 ]
                //ES6
                [b,...res] = list;
                console.log(b);//2
                console.log(res);//[ 2, 3, 4, 5 ]
            }
            {
                const [first,...rest] = [1,2,3,4,5];
                console.log(first);//1
                console.log(rest);//[2,3,4,5]

                const [fir,...res] = [];
                console.log(fir);//undefined
                console.log(res);//[]

                const [one,...re] = ['foo'];
                console.log(one);//foo
                console.log(re);//[]
            }
            //注意，如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
            //const [...butLast,last] = [1,2,3,4,5];  //报错
            //const [first,...middle,last] = [1,2,3,4,5]; //报错
        }
        {//4 字符串
            console.log(
                [...'hello'],//[ 'h', 'e', 'l', 'l', 'o' ]

                //能够正确识别四个字节的Unicode字符
                'x\uD83d\uDE80y'.length, //4
                [...'x\uD83d\uDE80y'].length, //3                
            )
            
            //正确返回字符串长度应该像下面这样写
            function strlen(str){
                return [...str].length;
            }
            console.log(strlen('x\uD83d\uDE80y'));//3

            //凡是涉及到操作四个字节的Unicode字符的函数，都有这个问题，因此最好都用扩展运算符改写
            let str = 'x你好y';
            let nstr = str.split('').reverse().join('');
            console.log(nstr);//'y好你x'

            let newstr = [...str].reverse().join('');
            console.log(newstr);//'y好你x'
        }
        {//5 实现了Iterator接口的对象
            //任何定义了遍历器(Iterator)接口的对象，都可以用扩展运算符转为真正的数组
            //TODO
        }
        {//6 Map和Set结构，Generator函数
            //TODO
        }
    }
}
{/**2 Array.from() 
    Array.from方法用于将两类对象转为真正的数组：类似数组的对象和可遍历(iterable)对象，包括ES6新增的Set和Map*/
    {//将类似数组的对象转为真正的数组
        let arrayLike = {
            '0':'a',
            '1':'b',
            '2':'c',
            length:3
        };
        //ES5写法
        let arr1 = [].slice.call(arrayLike);
        console.log(arr1);//[ 'a', 'b', 'c' ]

        //ES6写法
        let arr2 = Array.from(arrayLike);
        console.log(arr2);//[ 'a', 'b', 'c' ]
    }
    {//常见类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象，Array.from都可以将它们转为真正的数组
        //NodeList对象
        /*
        let ps = document.querySelectorAll('p');
        Array.from(ps).filter(p=>{
            return p.textContent.length>100;
        });
        */
        //arguments对象
        function foo(){
            let args = Array.from(arguments);
        }
        //扩展运算符(...)也可以将某些数据结构转为数组        
        function foo2(){
            let args = [...arguments];
        }

    }
    {//只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组
        let strarr = Array.from('hello');
        console.log(strarr);//[ 'h', 'e', 'l', 'l', 'o' ]

        let namesSet = new Set(['a','b']);
        console.log(
            Array.from(namesSet),//[ 'a', 'b' ]
            [...namesSet],//[ 'a', 'b' ] 
        );

        //如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
        console.log(Array.from([1,2,3]));//[1,2,3]
    }
    {/*Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质只有一点，即必须有length属性。
        因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换*/
        let arr = Array.from({length:3});
        console.log(arr);//[ undefined, undefined, undefined ]
        
        //对于未支持Array.from的浏览器，可以用Array.prototype.slice方法替代
        const toArray = (()=>
            Array.from?Array.from : obj=>[].slice.call(obj)
        )();
    }
    {//Array.from可以接受第二个参数，类似于map方法，对每个元素进行处理后，返回数组
        let arrayLike = {
            '0':1,
            '1':2,
            '2':3,
            length:3
        };
        console.log(
            Array.from(arrayLike,x=>x*x),//[ 1, 4, 9 ]
            //等同于
            Array.from(arrayLike).map(x=>x*x),//[ 1, 4, 9 ]

            Array.from([1,2,3],x=>x*x),//[ 1, 4, 9 ]

            //将数组中布尔值为false的成员转为0
            Array.from([1,,3,4,,5],n=>n||0),//[ 1, 0, 3, 4, 0, 5 ]
        )
    }
    {//返回各种数据的类型
        function typesOf(){
            return Array.from(arguments,value=>typeof value)
        }
        console.log(typesOf(null,[],NaN,{})) //[ 'object', 'object', 'number', 'object' ]
    }
    {//Array.from还提供map功能，这意味着，只要有一个原始的数据结构，你就可以先对它处理，转成规范的数据结构，进而就可以使用数组方法
        console.log(
            Array.from({length:3},()=>'jack')//[ 'jack', 'jack', 'jack' ]
        )
    }
    {//Array.from的另一个应用是，将字符串转为数组，然后返回字符串的长度
        //因为它能正确处理各种Unicode字符，可以避免JS将大于\uFFF的Unicode字符，算作两个字符的bug
        function countSymbols(string){
            return Array.from(string).length;
        }
        console.log(countSymbols('x\uD83d\uDE80y'));//3
        
        //正确返回字符串长度也可以像下面这样写
        function strlen(str){
            return [...str].length;
        }
        console.log(strlen('x\uD83d\uDE80y'));//3
    }
}
{/**3 Array.of() */

}
//...TODO