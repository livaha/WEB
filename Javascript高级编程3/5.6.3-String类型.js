/**String 类型 
 * String类型是字符串的对象包装类型，
 * 可以这样使用String构造函数来创建：let stringObj = new String('Hello Word');
 * String对象的方法也可以在所有基本的字符串值中访问到。
 * 
 * String类型提供的方法有：
 * 1 字符方法：charAt(),charCodeAt()
 * 2 字符串操作方法:concat(),slice(),substr(),substring()
 * 3 字符串位置方法:indexOf(),lastIndexOf()
 * 4 trim()方法
 * 5 字符串大小写转换方法:toLowerCase(),toLocaleLowerCase(),toUpperCase(),toLocaleUpperCase()
 * 6 字符串的模式匹配方法：:match(),search(),replace(),split()
 * 7 localeCompare()方法
 * 8 fromCharCode()方法
 * 9 HTML方法
*/

{/**1 字符方法:charAt(),charCodeAt() */
    let str = 'abcdefgh';
    console.log(
        //charAt()，接收一个参数，返回给定位置的字符
        str.charAt(2), //c
        //charCodeAt()，接收一个参数，返回给定位置的字符编码
        str.charCodeAt(2), //99
        //ES5还可以用方括号加数字的方法访问字符串的特定字符
        str[2], //c
    ) 
}
{/**2 字符串操作方法:concat(),slice(),substr(),substring() ；都不会修改原始字符串，只是返回一个基本类型的字符串值*/
    //1 concat():将一或多个字符串拼接起来，返回拼接得到的新字符串
    let str = 'hello ';
    let result = str.concat('word');
    console.log(result) //'hello word'

    //concat()方法可以接受任意多个参数
    result = str.concat('word','!');
    console.log(result) //'hello word!'

    /**slice(),substr(),substring()这三个方法都会返回被操作字符串的一个子字符串，而且也都接受一或两个参数。*/
    let strval = 'hello word!';
    console.log(
        //传一个参数的时候 ， 返回指定参数开始及后面的值
        strval.slice(3),//'lo word!'
        strval.substring(3),//'lo word!'
        strval.substr(3),//'lo word!'

        //返回3开始，7结束的值
        strval.slice(3,7),//'lo w'
        strval.substring(3,7),//'lo w'
        //返回3开始的长度为7的字符串
        strval.substr(3,7),//'lo word'
        '\n',
        //传递负值
        strval.slice(-3),//'rd!'  //相当于slice(11-3)
        strval.substr(-3),//'rd!' //substr(11-3)

        strval.substring(-3),//'hello word!' //相当于将-3转为0

        strval.slice(3,-4),//'lo w'  //相当于将-4转为7
        strval.substring(3,-4),//'hel' //相当于substring(3,0)，会被转为substring(0,3)
        strval.substr(3,-4),//'' //相当于将-4转为0，返回长度为0的字符
    )
}
{/**3 字符串位置方法:indexOf(),lastIndexOf()
    *从一个字符串中搜索给定的子字符串，返回子字符串的位置，如果没有找到该字符串，返回-1 */
    let str = 'hellor world';
    console.log(
        str.indexOf('h'),//0 //下标从0开始数
        str.indexOf('o'),//4
        str.lastIndexOf('o'),//8

        str.indexOf('o',6), //8 //从下标为6开始向后搜索
        str.lastIndexOf('or',6),//4 从位置3开始向前搜索
        str.lastIndexOf('or',8),//8 从位置3开始向前搜索
    )

    //可以通过循环调用indexOf()或lastIndexOf()来找到所有匹配的子字符串
    let strval = 'abcd abcdef abeifskf abaaaa ,find ab.';
    let positions = new Array();
    let pos = strval.indexOf('ab');
    while(pos>-1){
        positions.push(pos);
        pos = strval.indexOf('ab',pos+2);
    }
    console.log(positions) //[0,5,12,21,34]
}
{/**4 trim()方法 */
    //删除字符串的前置和后缀所有空格，然后返回结果
    let str = '    hello word   ';
    let trimstr = str.trim();
    console.log(str)//'    hello word   '
    console.log(trimstr)//'hello word'

}
{/**5 字符串大小写转换方法:toLowerCase(),toLocaleLowerCase(),toUpperCase(),toLocaleUpperCase() 
    *toLocaleLowerCase()和toLocaleUpperCase()是针对地区的方法 */
    let str = 'Hello World';
    console.log(
        str.toLocaleUpperCase(),//'HELLO WORLD'
        str.toUpperCase(),//'HELLO WORLD'
        str.toLocaleLowerCase(),//'hello world'
        str.toLowerCase()//'hello world'
    )
}
{/**6 字符串的模式匹配方法:match(),search(),replace(),split()
    * 在字符串上调用match()，本质上与调用RegExp的exec()方法相同，
    * match()方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象*/
    let text = 'cat,bat,sat,fat';
    let pattern = /.at/;
    //与pattern.exec(text)相同
    let matches = text.match(pattern);
    console.log(matches);//[ 'cat', index: 0, input: 'cat,bat,sat,fat', groups: undefined ]
    console.log(matches.index);//0
    console.log(matches[0]);//cat
    console.log(pattern.lastIndex);//0

    let pos = text.search(/at/);
    console.log(pos);//1

    let result = text.replace('at','ond');
    console.log(result);//'cond,bat,sat,fat'

    let result2 = text.replace(/at/g,'ond');
    console.log(result2);//'cond,bond,sond,fond'

    result = text.replace(/(.at)/g,'word($1)');
    console.log(result);//word(cat),word(bat),word(sat),word(fat)

    //replace方法的第二个参数可以用函数
    function htmlEscape(text){
        return text.replace(/[<>"&]/g,function(match,pos,originalText){
            switch(match){
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "\"":
                    return "&quot;";
            }
        })
    }
    console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
    //&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;

    let colorText = 'red,blue,gree,yellow';
    let col1 = colorText.split(",");//[ 'red', 'blue', 'gree', 'yellow' ]
    let col2 = colorText.split(',',2);//[ 'red', 'blue' ]
    let col3 = colorText.split(/[^\,]+/);//[ '', ',', ',', ',', '' ]
    console.log(col1,col2,col3)
}
{/**7 localeCompare()方法 */
    let str = 'yellow';
    console.log(
        str.localeCompare('brik'), //1
        str.localeCompare('yellow'), //0
        str.localeCompare('zoo')//-1
    )

    function determineOrder(val){
        let result = str.localeCompare(val);
        if(result<0){
            console.log(`${str} comes before ${val}`);
        }
        else if(result>0){
            console.log(`${str} comes after ${val}`);
        }
        else {
            console.log(`${str} is equal to ${val}`);
        }
    }
    determineOrder('brikc');//yellow comes after brikc
    determineOrder('yellow');//yellow is equal to yellow
    determineOrder('zoo');//yellow comes before zoo
}
{/**8 fromCharCode()方法 */
    console.log(String.fromCharCode(103,104,108,111));//ghlo
}
{/**9 HTML方法 */

}