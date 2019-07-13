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
