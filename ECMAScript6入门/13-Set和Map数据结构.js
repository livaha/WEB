/**
 * Set和Map数据结构
 * 1 Set
 * 2 WeakSet
 * 3 Map
 * 4 WeakMap
 */
{/**1 Set 
    ES6提供的数据结构Set,它类似数组，但成员的值都是唯一的，没有重复的值*/
    
    //Set本身是一个构造函数，用来生成Set数据结构
    //通过add()方法向Set结构加入成员
    const s = new Set();
    [1,2,3,3,4,5,2].forEach(x=>s.add(x));
    
    for(let i of s){
        console.log(i);//1 2 3 4 5
    }

    {//Set函数可以接收一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化
        //例一
        const set = new Set([1,2,3,2,3,4]);
        console.log(set);//Set { 1, 2, 3, 4 }
        console.log([...set]);//[ 1, 2, 3, 4 ]
        //例二
        const items = new Set([2,3,4,3,2,4,4,5,3]);
        console.log(items.size);//4
        
        /* //例三
        const set = new Set(document.querySelectorAll('div'));
        set.size;
        //类似于
        const set = new Set();
        document
        .querySelectorAll('div')
        .forEach(div=>set.add(div));
        set.size */
        
    }
    {//用于给数组去重  [...new Set(array)]
        let array = [1,2,2,2,2,3,4,5,5];
        let newarr = [...new Set(array)]
        console.log(newarr);//[ 1, 2, 3, 4, 5 ]

        //去除字符串里面的重复字符
        let newstr = [...new Set('abaaacdb')].join('');
        console.log(newstr);//abcd
    }
    {//Set内部的‘===’
        //Set加入NaN时，认为NaN相同
        let set = new Set();
        let a = NaN;
        let b = NaN;
        set.add(a,b);
        console.log(set);//Set { NaN }

        //Set加入{}时，空对象总是不相等
        let tes = new Set();
        set.add({},{});
        console.log(set.size);//2
    }
    {//Set实例的属性和方法

    }
}