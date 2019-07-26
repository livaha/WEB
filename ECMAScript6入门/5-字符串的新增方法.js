/**
 * 字符串的新增方法
 * 1 String.fromCodePoint()
 * 2 String.raw()
 * 3 实例方法：codePointAt()
 * 4 实例方法：normalize()
 * 5 实例方法：includes(), startsWith(), endsWith()
 * 6 实例方法：repeat()
 * 7 实例方法：padStart()，padEnd()
 * 8 实例方法：trimStart()，trimEnd()
 * 9 实例方法：matchAll()
 */

 {/**1 String.fromCodePoint() */

    //ES5提供一个String.fromCharCode()
    //不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了
    console.log(String.fromCharCode(0x20BB7)); // ஷ

    //可以识别大于0xFFFF的字符
    console.log(String.fromCodePoint(0x20BB7)); // 𠮷

    //如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
    console.log(String.fromCodePoint(0x78,0x1f680,0x79)==='x\uD83d\uDE80y') //true
 }
 {/**2 String.raw() */

    //返回一个斜杠都被转义的字符串 ,可以作为处理模板字符串的基本方法
    console.log(String.raw`Hi\n${2+3}`);//打印Hi\n5，书上写返回'Hi\\n5!'
    console.log(String.raw`Hi\u000A!`); //打印Hi\u000A,书上写返回'Hi\\u000A'
    console.log(String.raw`Hi\\n`);     //打印Hi\\n
    console.log(String.raw`Hi\\n`==='Hi\\\\n'); //竟然打印true!!

    //String.raw()方法也可以作为正常的函数使用。
    //作为函数，String.raw()的代码实现如下
    String.raw = function (strings,...values){
       let output = '';
       let index;
       console.log(strings,values)
       for(index = 0;index < values.length;index++){
          output += strings.raw[index] + values[index];
       }

       output += strings.raw[index];
       return output;
    }

    //这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。
    console.log(String.raw({raw:'test'},0,1,2)) //t0e1s2t
    console.log(String.raw({raw:['t','e','s','t']},0,1,2));//t0e1s2t
 }
 {/**3 实例方法:codePointAt() */
   //'𠮷' : UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存
   let s='𠮷';//码点是0x20BB7

   console.log(s.length) //2
   //charAt()方法无法读取整个字符
   console.log(s.charAt(0)) //''
   console.log(s.charAt(1)) //''
   //charCodeAt()方法只能分别返回前两个字节和后两个字节的值。
   console.log(s.charCodeAt(0)) //55362
   console.log(s.charCodeAt(1)) //57271

   //ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
   let t = '𠮷a'
   console.log(t.codePointAt(0)) //134071 //能将𠮷的码点直接返回
   console.log(t.codePointAt(1)) //57271
   console.log(t.codePointAt(2)) //97
   
   //codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
   console.log(t.codePointAt(0).toString(16)) //20bb7
   console.log(t.codePointAt(2).toString(16)) //61

   /**使用for...of循环，可以正确识别 32 位的 UTF-16 字符。 */
   let k = '𠮷a'
   for(let ch of k){
      console.log(ch.codePointAt(0).toString(16)) //20bb7 61
   }

   /**利用扩展运算符(...)展开运算 */
   let arr = [...'𠮷a']
   arr.forEach(
      ch=>console.log(ch.codePointAt(0).toString(16)) //20bb7 61
   )

   /**codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。 */
   function is32Bit(c){
      return c.codePointAt(0)>0xffff;
   }
   console.log(is32Bit("𠮷")) //true
   console.log(is32Bit("a")) //false
 }