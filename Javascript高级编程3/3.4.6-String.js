/**String类型
 * toString()：数值、布尔值、对象、字符串值都有这个方法，但null和undefined没有
 * String()：这个函数能将任何类型的值都转为字符串，包括null,undefined
 */

 {/**toString() */
    let age = 11;
    console.log(age.toString()) //'11'

    let found = true;
    console.log(found.toString()) //'true'

    //当调用数值的toString()方法时，可以传一个参数：输出数值的基数，默认为10
    let num = 15;
    console.log(num.toString())//'15'
    console.log(num.toString(2))//'1111'
    console.log(num.toString(8))//'17'
    console.log(num.toString(10))//'15
    console.log(num.toString(16))//'f'
 }

 {/**String() */
    let val1 = 2;
    let val2 = true;
    let val3 = null;
    let val4;
    console.log(String(val1),String(val2),String(val3),String(val4)) 
    //2 true null undefined
 }