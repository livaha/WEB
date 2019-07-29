/**
 * Array类型
 * 0 创建数组
 * 1 检测数组:instanceof,isArray()
 * 2 转换方法:toLocaleString(),toString(),valueOf(),join()
 * 3 栈方法：push(),pop()
 * 4 队列方法:shift(),unshift() 
 * 5 重排序法：reverse(),sort() 
 */
{/**0 创建数组有2种方式
    * 一是Array，二是方括号 */

    let col1 = new Array();
    let col2 = new Array(20);                   //创建一个包含20项的数组
    let col3 = new Array('red','green','blue'); //创建一个包含3个字符串值的数组
    //省略new结果一相
    let col4 = Array(3);
    let col5 = Array('red');

    let col6 = ['red','green','blue'];
    let col7 = [];      //创建一个空数组
    let col8 = [1,2,];  //不要这样，这样会创建2或3项的数组
    let col9 = [,,,,,]  //不要这样，这样会创建5或6项的数组

    let colors = ['red','green','blue'];
    colors[1] = 'hello'; //修改了索引为1的元素
    console.log(
        colors[0],//读取索引为0的元素 //打印red
        colors.length, //3
        colors[1],//hello
    )

    //通过.length修改数组长度
    colors.length = 2;
    console.log(colors[2]);//undefined

    let arr = ['a','b','c'];
    arr.length = 4;
    console.log(arr[3]);//undefined
    
    //通过length属性在数组末尾增添值
    arr[arr.length]='x';
    arr[arr.length]= 'y';
    console.log(arr);//[ 'a', 'b', 'c', <1 empty item>, 'x', 'y' ]

    //通过索引赋值创建新长度
    let testarr = ['a','b','c'];
    testarr[6]='k';
    console.log(testarr)//[ 'a', 'b', 'c', <3 empty items>, 'k' ]
}
{/**1 检测数组:instanceof,isArray() */
    let value = ['c']
    /**instanceof 用于一个网页或者一个全局作用域来说是不是一个数组*/
    if(value instanceof Array){

    }
    /**isArray() 解决网页中包含多个框架，不管它在哪个全局执行环境中创建，都可以确实它是不是数组 */
    if(Array.isArray(value)){
        //IE9+支持
    }
}
{/**2 转换方法 */
    /**所有对象都具有toLocaleString(),toString(),valueOf(),join() */
    let colors = ['red','green','blue'];
    console.log(
        colors.toString(),      //'red,green,blue'
        colors.toLocaleString(),//'red,green,blue'
        colors.valueOf(),       //[ 'red', 'green', 'blue' ] //数组的每一
        colors,                 //[ 'red', 'green', 'blue' ]
        colors.join(','),       //'red,green,blue'
        colors.join('||'),      //'red||green||blue'
    )

    let person1 = {
        toLocaleString:function(){
            return 'Nicka';
        },
        toString:function(){
            return 'Nickb';
        }
    }
    let person2 = {
        toLocaleString:function(){
            return 'PooleA';
        },
        toString:function(){
            return 'PooleB'
        }
    }
    let people = [person1,person2];
    console.log(
        people,
        people.toString(),//'Nickb,PooleB'
        people.toLocaleString(),//'Nicka,PooleA'
    )
}
{/**3 栈方法：push(),pop() */
    let colors = new Array();
    let count = colors.push('red','green');
    console.log(count);//2

    count = colors.push('black');
    console.log(count);//3

    let item = colors.pop();
    console.log(item);//'black'
    console.log(colors.length)//2
}
{/**4 队列方法:shift(),unshift() 
    *shift():从前面删除，unshift()：从前面插入
    * 使用shift()和push可以像使用队列一样使用数组
    * 使用unshift()和pop()可以反向模拟队列，即在前端添加项，从末端移除项*/
    let colors = new Array();
    let count = colors.push('red','green');
    console.log(count);//2

    count = colors.push('c');
    console.log(count);//3

    let item = colors.shift();
    console.log(item);//'red'
    console.log(colors.length);//2

    count = colors.unshift('a','b');
    console.log(colors,count);//[ 'a', 'b', 'green', 'c' ] 4

    count = colors.unshift('black');
    console.log(colors,count);//[ 'black', 'a', 'b', 'green', 'c' ] 5

    item = colors.pop();
    console.log(item);//'c'
    console.log(colors.length);//4

}
{/**5 重排序法：reverse(),sort() ，两函数都改变原来的数组
    * reverse()会反转数组项的顺序，sort()按顺序排列数组项(不一定是按数字大小)
    * sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序*/
    let values = [2,4,6,3,2,1,9,15,13];
    values.reverse();
    console.log(values);//[ 13, 15, 9, 1, 2, 3, 6, 4, 2 ]
    values.sort();
    console.log(values);//[ 1, 13, 15, 2, 2, 3, 4, 6, 9 ] //注意，13，15在前面

    /**比较函数：第一个参数应该位于第二个之前则返回一个负数，相等返回0，位于第二个参数之后则返回正数 */
    function compare(val1,val2){
        /*if(val1 < val2){
            return -1;
        }else if(val1 > val2){
            return 1;
        }else{
            return 0;
        }*/
        return val1-val2;
    }
    //将比较作为参数传给sort，数值仍然保持正确的顺序，但可适用更多的数据类型
    let nums = [1,3,5,6,2,21,12,14,9];    
    nums.sort(compare);
    console.log(nums)//[ 1, 2, 3, 5, 6, 9, 12, 14, 21 ]

}