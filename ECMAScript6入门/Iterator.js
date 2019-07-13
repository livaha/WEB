/**Iterator  
 * 遍历器
 */


//类部署 Iterator 接口
class RangeIterator{
    constructor(start,stop){
        this.value=start;
        this.stop=stop;
    }
    [Symbol.iterator](){return this;}

    next(){
        let value = this.value;
        console.log(value,this.stop)
        if(value<this.stop){
            this.value++;
            return {done:false,value:value};
        }
        return {done:true,value:undefined};

    }
}

function range(start,stop){
    return new RangeIterator(start,stop);
}

for (let value of range(0,3)){
    console.log(value);
}

/** 问题：
 *  1 [Symbol.iterator](){return this;}  这是什么语法
 *  2 Symbol又是什么
*/
/**解：
 * 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
 */