/**变量的解构赋值
 * 1 数组的解构赋值
 *   默认值
 * 2 对象的解构赋值
 * 3 字符串的解构赋值
 * 4 数值和布尔值的解构赋值
 * 5 函数参数的解构赋值
 * 6 圆括号问题
 * 7 用途
 */

 { /**1 数组的解构赋值 
     * 从数组中提取值，按照对应位置，对变量赋值
    */
   let [a,b,c] = [1,2,3]; 
   console.log(a,b,c) //1,2,3

   let [,,third]=['foo','bar','baz'];
   console.log(third) //'baz'

   let [d,,f]=[1,2,3];
   console.log(d,f) //1,3

   let [head,...tail]=[1,2,3,4];
   console.log(head,tail) //1 ,[2,3,4]

   let [x,y,...z]=['a'];
   console.log(x,y,z)// a, undefined, []

   let [foo]=[];
   console.log(foo) //undefined

   let [bar,cda]=[1];
   console.log(bar,cda) //1,undefined

   let [j,k]=[1,2,3];
   console.log(j,k) //1,2

   let [n,[m],o]=[1,[2,3],4];
   console.log(n,m,o) //1,2,4

   //如果等号的右边不是可遍历的结构,那么将会报错
   // 报错
   /*let [foo] = 1;
   let [foo] = false;
   let [foo] = NaN;
   let [foo] = undefined;
   let [foo] = null;
   let [foo] = {};*/
 }

 { /**默认值
   *当一个数组成员严格等于undefined，默认值才会生效
   */
   let [foo=true] = [];
   console.log('\n\n'+foo) //true

   let [x,y='b'] = ['a'];
   console.log(x,y) //a,b

   let [k,j='b'] = ['a',undefined];
   console.log(k,j) //a,b

   let [n = 1] = [undefined];
   console.log(n) //1

   let [m = 1] = [null];
   console.log(m) //null

   let [a=1,b=a] = [];
   console.log(a,b) //1,1
   
   let [c=1,d=c] = [2];
   console.log(c,d) //2,2

   let [e=1,f=e]=[1,2];
   console.log(e,f) //1,2

   //let [g=h,h=3]=[];
   //console.log(g,h)   //ReferenceError: y is not defined
 }

 {/**2 对象的解构赋值
    */
   const { log } = console;
   log('\n\nhello')

   let { a, b } = { a: 'aaa', b: 'bbb' };
   //相当于 let{a:a,b:b}={ a: 'aaa', b: 'bbb' };
   log(a,b) //'aaa','bbb'

   let { e, f } = { f: 'aaa', e: 'bbb' };
   log(e,f) //'bbb','aaa'

   let { z } = { f: 'aaa', e: 'bbb' };
   log(z) //undefined

   let {foo} = {bar: 'baz'};
   log(foo) //undefined
{
   let { log, sin, cos } = Math;
}

   let { fooo: bazo } = { fooo: 'aaa', barr: 'bbb' };
   log(bazo) //aaa
   //log(fooo) //ReferenceError: fooo is not defined

   let obj = { first: 'hello', last: 'world' };
   log(obj) //{ first: 'hello', last: 'world' }
   let { first: fr, last: la } = obj;
   log(fr,la) //hello,world

   let { ko: ko, br: br } = { ko: 'aaa', br: 'bbb' };
   log(ko,br) //aaa,bbb

   let { fff: baz } = { fff: 'aaa', bar: 'bbb' };
   //log(fff) // error :foo is not defined;  
   log(baz) //aaa

   {
      let obj = {
         p: [
           'Hello',
           { y: 'World' }
         ]
       };
       
       let { p: [x, { y }] } = obj;
       x // "Hello"
       y // "World"
   }
 }

{/**默认值 */
  let {x=3} = {};
  console.log(x) //3

  let {k,o=3} = {k:1}
  console.log(k) //1

  let {a:b=3} = {};
  console.log(b) //3

  let {i:j=3} ={i:9}
  console.log(j) //9

  let {message:msg='say something'} = {};
  console.log(msg) //say something

  let {c=3}={c:undefined}
  console.log(c) //3
  
  let {d=3}={d:null}
  console.log(d) //null
}

{/**注意点 */
  /*
  // 错误的写法
  let x;
  {x} = {x: 1};
  // SyntaxError: syntax error
  //JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误
  */

  // 正确的写法
  let x;
  ({x} = {x: 1});

  //属性名表达式
  let arr = [1, 2, 3];
  let {0 : first, [arr.length - 1] : last} = arr;
  first // 1
  last // 3
}

{/**3 字符串的解构赋值 */
  const [a,b,c,d,e] = 'hello';
  console.log(a,b,c,d,e) // h e l l o

  let {length:len} = 'hello'
  console.log(len) //5
}

{/**4 数值和布尔值的解构赋值 
  数值和布尔值的包装对象都有toString属性，因此变量都能取到值*/
  let {toString:s} = 123
  console.log(s === Number.prototype.toString) //true

  let {toString:a} = true;
  console.log(a===Boolean.prototype.toString) //true
  
  let {toString:d} = false;
  console.log(d===Boolean.prototype.toString) //true
  
  /*
  //解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
  //由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
  let { prop: x } = undefined; // TypeError
  let { prop: y } = null; // TypeError
  */
}

{/**5 函数参数的解构赋值 */
  function add([x,y]){
    return x+y
  }
  console.log(add([2,4])) //6

  console.log(  [[1,2],[3,4]].map(([a,b])=>a+b)  ) //[3,7]

  //默认值
  function move({x=0,y=0}={}){
    return [x,y]
  }
  console.log('\n\n')
  console.log(move({x:3,y:4})) //[3,4]
  console.log(move({x:3})) //[3,0]
  console.log(move({})) //[0,0]
  console.log(move()) //[0,0]

  //写法不一样得到不一样的结果
  function move2({x,y}={x:0,y:0}){
    return [x,y]
  }
  console.log('\n\n')
  console.log(move2({x:3,y:4})) //[3,4]
  console.log(move2({x:3})) //[3,undefined]
  console.log(move2({})) //[undefined,undefined]
  console.log(move2()) //[0,0]

  //undefined就会触发函数参数的默认值。
  console.log( [1,undefined,3].map((x='yes')=>x) ) //[1,'yes',3]
}

{/**圆括号 */
  /**不能使用圆括号的情况
    //报错 它们都是变量声明语句，模式不能使用圆括号
    let [(a)] = [1]

    let {x:(c)}={}
    let ({x:c})={}
    let {(x:c)}={}
    let {(x):c}={}

    let {o:({p:p})}={o:{p:2}}

    //报错  函数参数也属于变量声明，因此不能带有圆括号。
    function f([z]){return z;}
    function f([z,(x)]){return x;}

    //报错
    [({p:a}),{x:c}]=[{},{}]
   */

   //可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
   [(b)] = [3]; // 正确
  ({ p: (d) } = {}); // 正确
  [(parseInt.prop)] = [3]; // 正确
}

{/**用途 */
  //1 交换变量的值
  let x=1;
  let y=2;
  [x,y]=[y,x];
  
  //2 从函数返回多个值
  //返回一个数组
  function example(){
    return [1,2,3]
  }
  let [a,b,c]=example();

  //返回一个对象
  function example2(){
    return{
      foo:1,
      bar:2
    }
  }
  let {foo,bar} = example2()
  console.log(foo,bar) //1 2

  //3 函数参数的定义
  //参数有序
  function f1([x,y,z]){}
  f1([1,2,3])

  //参数无序
  function f2({x,y,z}){}
  f2({z:3,y:3,x:2})

  //4 提取JSON数据，尤其有用
  let jsonData = {
    id:4,
    status:'ok',
    data:[3,4]
  };

  let {id,status,data:number}=jsonData;
  console.log(id,status,number) //4 'ok' [ 3, 4 ]

  /*5 函数参数的默认值
    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () {},
      cache = true,
      complete = function () {},
      crossDomain = false,
      global = true,
      // ... more config
    } = {}) {
      // ... do stuff
    };
    //指定参数的默认值，避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
  */

  //6 遍历Map结构
  const map = new Map();
  map.set('first','hello');
  map.set('second','world');

  for(let [key,value] of map){
    console.log(key+' is ' +value)
  }
  // first is hello
  // second is world

  //获取键名
  for(let [key] of map){}
  //获取键值
  for(let [,value] of map){}
}

{/**输入模块的指定方法 */
 //const {Button,Input} = require('antd')
}