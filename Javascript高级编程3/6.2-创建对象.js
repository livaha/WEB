/**
 * 6.2 创建对象
 * 6.2.1 工厂模式 （不如构造函数模式）
 * 6.2.2 构造函数模式 (不如原型模式)
 * 6.2.3 原型模式 
 * 6.2.4 组合使用构造函数模式和原型模式(使用最广泛，认同度最高的一种创建自定义类型的方法，是定义引用类型的一种默认模式)
 * 
 * 虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：
 * 使用同一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。
 */
{//6.2.1 工厂模式
    //用函数来封装以特定接口创建对象的细节
    //工厂模式解决了创建多个相似对象的问题，却没有解决对象识别的问题（即怎样知道一个对象的类型）
    function createPerson(name,age,job){
        let o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            console.log(this.name);
        };
        return o;
    }
    let person1 = createPerson('Kielsa',23,'Waiter');
    let person2 = createPerson('Tina',23,'Engineer');
    console.log(person1);//{ name: 'Kielsa', age: 23, job: 'Waiter', sayName: [Function] }
    console.log(person2);//{ name: 'Tina', age: 23, job: 'Engineer', sayName: [Function] }
}
{//6.2.2 构造函数模式
    /**ECMAScript中的构造函数可以用来创建特定类型的对象。像Object和Array这样的原生构造函数，在运行时会自动出现在执行环境中。
     * 此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。
     * 例如，可以使用构造函数模式将前面的例子重写如下。
     */
    function Person(name,age,job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            console.log(this.name);
        }
    }
    let person1 = new Person('Nicho',23,'Engineer');
    let person2 = new Person('Hei',22,'Doc');
    console.log(person1);//Person { name: 'Nicho', age: 23, job: 'Engineer', sayName: [Function] }
    console.log(person2);//Person { name: 'Hei', age: 22, job: 'Doc', sayName: [Function] }

    /**这个例子中，Person()函数取代了createPerson()函数，这Person函数的不同之处在于：
     * 1 没有显示地创建对象
     * 2 直接将属性和方法赋给了this对象
     * 3 没有return语句
     * 
     * 要创建Person的新实例，必须使用new操作符，以这种方式调用构造函数实际上会经历4个步骤：
     * 1 创建一个新对象
     * 2 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
     * 3 执行构造函数中的代码（为这个新对象添加属性）
     * 4 返回新对象
     * 
     */
    //在前面例子的最后，person1和person2分别保存着Person的一个不同的实例，这两个对象都有一个constructor（构造函数）属性，该属性指向Person
    console.log(
        person1.constructor == Person,//true
        person2.constructor == Person,//true
    )
    /**对象的constructor属性最初是用来标识对象类型的。但是，提到检测对象类型，还是instanceof操作符更可靠些。 */
    console.log(
        person1 instanceof Object,//true
        person1 instanceof Person,//true
        person2 instanceof Object,//true
        person2 instanceof Person,//true
    )
    //创建自定义的构造函数意味着将来可以将它的实例识别为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。

    //1 将构造函数当作函数
    /**构造函数和其他函数唯一的区别，就在于调用他们的方式不同，不过构造函数也是函数，不存在定义构造函数的特殊语法。
     * 任何函数，只要通过new操作符来调用，那它就可以作为构造函数，而任何函数，如果不通过new操作符来调用，那它跟普通函数一样。
     * 前面的例子定义的Person()函数可以通过下列任一种方式来调用 。
     */
    //当作构造函数
    let person = new Person('Hei',23,'Engineer');
    person.sayName();//Hei

    //作为普通函数调用
    Person('Greg',43,'Doctor');//添加到window
    //window.sayName(); //'Greg'

    //在另一个对象的作用域中调用
    let o = new Object();
    Person.call(o,'Krei',3,'Baby');
    o.sayName();//Krei

    //2 构造函数的问题
    {/**构造函数模式缺点：每个方法都要在每个实例上重新创建一遍。
        在前面例子中，person1和person2都有一个名为sayName()的方法，但那两个方法不是同一个Function的实例。
        ECMAScript中的函数是对象，因此每定义一个函数，也就实例化了一个对象。
        此时构造函数也可以这样定义： */
        function Person(name,age,job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.sayName = new Function('console.log(this.name)');//与声明函数在逻辑上是等价的
        }
        let person1 = new Person('Nicho',23,'Engineer');
        let person2 = new Person('Hei',22,'Doc');
        console.log(person1.sayName === person2.sayName);//false
        
        //创建两个完成同样任务的Function实例的确没有必要，况且有this对象在，根本不用在执行代码前就把函数绑定到特定对象上面
        //可像下面这样，把函数定义转移到构造函数外来解决这个问题
        {
            function Person(name,age,job){
                this.name = name;
                this.age = age;
                this.job = job;
                this.sayName = sayName
            }

            function sayName(){
                console.log(this.name)
            }
            let person1 = new Person('Nicho',23,'Engineer');
            let person2 = new Person('Hei',22,'Doc');
            /**这个例子中，我们把sayName()函数的定义转到了构造函数外部，这确实解决了两个函数做同一件事的问题，
             * 但是，如果需要定义很多方法，那就要定义很多个全局函数，于是我们这个自定义的引用类型就没有封装性可言了。
             * 好在，这些问题可以通过使用原型模式来解决
             */
        }
    }

}
{/**3 原型模式，见文件'6.2.3-原型模式' */

}
{/**6.2.4 组合使用构造函数模式和原型模式，
    见文件'6.2.4-组合使用构造函数模式和原型模式' */

}
