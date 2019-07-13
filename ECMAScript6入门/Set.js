/**
 * ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 * 可用于数组去重：[...new Set(array)]
 * 可用于字符串里的字符去重：[...new Set('ababbc')].join('')
 * 在set中，两个对象{}是不相等的，
 * 
 * 
 * 
 * 
 */

 // Array.from方法可以将 Set 结构转为数组。
 const items = new Set([1, 2, 3, 4, 5]);
 const array = Array.from(items);

{
    //去除数组重复成员的另一种方法。
    function dedupe(array) {
        return Array.from(new Set(array));
    }
  
    dedupe([1, 1, 2, 3]) // [1, 2, 3]
}

{
  let set = new Set(['red', 'green', 'blue']);

    for (let item of set.keys()) {
    console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.values()) {
    console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.entries()) {
    console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]

}
{
    //  Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。

    Set.prototype[Symbol.iterator] === Set.prototype.values
    // true
    //这意味着，可以省略values方法，直接用for...of循环遍历 Set。

    let set1 = new Set(['red', 'green', 'blue']);

    for (let x of set1) {
    console.log(x);
    }
    // red
    // green
    // blue
}

{
    //forEach()
    let set3 = new Set([1,2,3]);
    set3.forEach((value,key)=>console.log(key+':'+value))
    // 1:1
    // 2:2
    // 3:3
}

{
    //扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
    let arr = [3, 5, 2, 2, 5, 5];
    let unique = [...new Set(arr)];
    // [3, 5, 2]
}

{
    //数组的map和filter方法也可以间接用于 Set 
    let set4 = new Set([1,2,3]);
    set4 = new Set([...set4].map(item=>item*2))
    console.log(set4)
    //Set { 2, 4, 6 }

    let set2 = new Set([1,2,3]);
    set2 = new Set([...set2].filter(x=>(x%2)==0))
    console.log(set2)
    //Set { 2 }
}
{
    //使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
    let a = new Set([1,2,3]);
    let b = new Set([2,3,4]);

    //并集union
    let union = new Set([...a,...b]);

    //交集 intersect
    let intersect = new Set([...a].filter(x=>b.has(x)))
    
    //差集 difference
    let difference = new Set([...a].filter(x=>!b.has(x)))

    console.log(union,intersect,difference)
    //Set { 1, 2, 3, 4 } Set { 2, 3 } Set { 1 }
}
{//在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
 //一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
    let set = new Set([2,3,4,5]);
    set = new Set([...set].map(val=>val*3))

    let set2 = new Set([3,4,5,1]);
    set2 = new Set(Array.from(set2,val=>val*2))
}