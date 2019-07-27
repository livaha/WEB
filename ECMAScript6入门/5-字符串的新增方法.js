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
 {/**4 实例方法：normalize() */

 }
 {/**5 实例方法： includes(),startsWith(),endsWith()
   * JavaScript 只有indexOf方法，ES6 又提供了三种新方法。 */
   let s = 'Hello Word!';
   console.log(s.startsWith('He')); //true
   console.log(s.endsWith('!')); //true
   console.log(s.includes('ello ')); //true

   //这三个方法都支持第二个参数，表示开始搜索的位置 
   console.log(s.startsWith('or',3)); //false
   console.log(s.startsWith('Wor',6)); //true
   console.log(s.endsWith('!',5)); //false
   console.log(s.endsWith('llo',5)); //true
   console.log(s.includes('ello',5)); //false
   console.log(s.includes('ord',5)); //true
 }
 {/**6 实例方法： repeat() 
   * repeat方法返回一个新字符串，表示将原字符串重复n次*/
   console.log('x'.repeat(3));   //xxx
   console.log('hello'.repeat(3)) //hellohellohello
   console.log('hello'.repeat(0)) //''
   //如果tepeat的参数是字符串，则会先转换为数字
   console.log('na'.repeat('3'))//nanana
   /**
    * 以下特殊情况
    * 1 参数为小数，会被取整
    * 'na'.repeat(2.9) //nana
    * 
    * 2 参数为负数或Infinity，会报错
    * 'na'.repeat(Infinity) //error
    * 'na'.repeat(-1) //error
    * 
    * 3 参数为0到-1之间的小数，等同于0
    * 'na'.repeat(-0.9) //''
    * 
    * 4 参数NaN赞同于0
    * 'na'.repeat(NaN) //''
    * 
    * 5 参数为字符串，则先转为数字
    * 'na'.repeat('na') //''
    * 'na'.repeat('3') //nanana
    */
 }
 {/**7 实例方法：padStart(),padEnd() 
   * ES2017引入字符串补全长度的功能，如果字符串不够长度，会在头部或尾部补全*/
   console.log(
      'x'.padStart(4,'ab'),//abax
      'x'.padStart(5,'ab'),//ababx

      'x'.padEnd(4,'ab'),//xaba
      'x'.padEnd(5,'ab'),//xabab

      //如果用来补全的字符串与原字符串，两者长度之和超过最大长度则会截去超出位数的补全字符串
      'abc'.padStart(10,'1234567890'),//1234567abc
      //如果省略第二个参数，默认使用空格补全长度
      'x'.padStart(4),//'   x'
      'y'.padEnd(3),//'y  '

      //padStart()的常见用途 ：1 为数值补全指定位数，2 提示字符串格式
      //1 为数值补全指定位数
      '1'.padStart(10,'0'),//0000000001
      '12'.padStart(10,'0'),//0000000012
      '123456'.padStart(10,'0'),//0000123456
      //2 提示字符串格式
      '12'.padStart(10,'YYYY-MM-DD'),//YYYY-MM-12
      '09-12'.padStart(10,'YYYY-MM-DD')//YYYY-09-12
      )
 }
 {/**8 实例方法：trimStart(),trimEnd() 
   * ES2019新增的这两个方法，与trim()一样，消除字符串空格，返回一个新的字符串，不会修改原始字符串*/
   const s = '    a bc    ';
   console.log(s.trim());//'a bc'
   console.log(s.trimStart());//'a bc    '
   console.log(s.trimEnd());//'    a bc'

 }
 {/**9 实例方法：matchAll() */
   //matchAll()方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。
 }