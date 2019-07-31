/**
 * 6.1 理解对象属性
 * 6.1.0 创建对象
 * 6.1.1 属性类型
 */
{    
    {//6.1.0 创建对象
    //定义对象最简单方式就是：创建一个object实例，然后为它添加属性和方法
        {
            let person = new Object();
            person.name = 'Nicold';
            person.age = 23;
            person.job = 'Software Engineer';
            
            person.sayName = function(){
                console.log(this.name)
            }
        }
        {//上面的例子可以用对象字面量语法这样写:
            let person = {
                name:'Nicold',
                age:23,
                job:'Software Engineer',

                sayName:function(){
                    console.log(this.name)
                }
            }

        }
    }
    {//6.1.1 属性类型, ECMAScript有两种属性：数据属性和访问器属性
        //TODO
    }
}
//TODO