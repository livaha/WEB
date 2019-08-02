/**
 * 原型模式(prototype)
 * 1 理解原型：prototype，isPrototypeOf(),getPrototypeOf(),hasOwnProperty()
 * 2 原型与in操作符 :for-in, Object.keys(),Object.getOwnPropertyNames(),自定义hasPrototypeProperty()
 *  
 * 我们创建的每个函数都有一个prototype（原型）属性,这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
 * 按字面理解：prototype是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。
 * 换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。如下例：
 */
{//不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中
    function Person(){

    }
    Person.prototype.name = 'Nick';
    Person.prototype.age = 23;
    Person.prototype.job = 'Doctor';
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    let person1 = new Person();
    person1.sayName();//Nick
    
    let person2 = new Person();
    person2.sayName();//Nick

    console.log(person1.sayName === person2.sayName);//true
    /**在此，我们将sayName()方法和所有属性直接添加到了Person的prototype属性中，构造函数变成了空函数。
     * 即使如此，也仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。
     * 但与构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。
     * 要理解原型模式的工作原理，必须先理解ECMAScript中原型对象的性质。
     */
 
 //1 理解原型对象
    /**只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
     * 在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。
     * 如上面例子，Person.prototype.constructor指向Person,通过这个构造函数，我们还可以继续为原型对象添加其他属性和方法。
     */
    //通过isPrototypeOf方法来确定对象之间是否具有prototype指针
    console.log(
        Person.prototype.isPrototypeOf(person1),//true
        Person.prototype.isPrototypeOf(person2),//true
    )

    //ES5新增的一个方法，Object.getPrototypeOf()
    console.log(
        Object.getPrototypeOf(person1)== Person.prototype,//true
        Object.getPrototypeOf(person1).name,//'Nick'
    )

    /**我们可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。
     * 如果在实例中添加一个属性与原型中的属性同名，则就是在实例中创建该属性，该属性会屏蔽原型中的那个属性。
     */
    let person3 = new Person();
    let person4 = new Person();
    person3.name = 'Green';
    console.log(person3.name);//Green
    console.log(person4.name);//Nick

    //不过，使用delete操作符则可以完全删除实例属性，从而能够重新访问原型中的属性
    console.log(person3.name);//Green
    delete(person3.name);
    console.log(person3.name);//Nick

    //hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。
    //这个方法从Object继承来的，只在给定属性存在 于对象实例中，才会返回true
    let person5 = new Person();
    let person6 = new Person();
    console.log(person5.hasOwnProperty('name'));//fasle
    person5.name = 'Tick';
    console.log(person5.name);//Tick
    console.log(person5.hasOwnProperty('name'));//true
    
    console.log(person6.name);//Nick
    console.log(person6.hasOwnProperty('name'));//false

    delete person5.name;
    console.log(person5.name);//Nick
    console.log(person5.hasOwnProperty('name'));//false

}
{//2 原型与in操作符    
    /**有两种方式使用in操作符：单独使用和在for-in循环中使用。
     * 在单独使用时，in会在通过对象能够访问给定属性时返回true,无论该属性存在于实例中还是原型中。
     */
    function Person(){
    }
    Person.prototype.name = 'Nick';
    Person.prototype.age = 23;
    Person.prototype.job = 'Doctor';
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    let person1 = new Person();
    let person2 = new Person();
    console.log(person1.hasOwnProperty('name'));//false
    console.log('name' in person1);//true

    person1.name = 'Grep';
    console.log(
        person1.name,//Grep 来自实例
        person1.hasOwnProperty('name'), //true
        'name' in person1, //true
    )

    console.log(
        person2.name,//Nick 来自原型
        person2.hasOwnProperty('name'), //false
        'name' in person2 //true
    )

    delete person1.name;
    console.log(
        person1.name, //Nick 来自原型
        person1.hasOwnProperty('name'), //false
        'name' in person1 //true
    )
    /**在以上代码中，name属性要么是直接在对象上访问的到的，要么是通过原型访问到的，因此'name ' in person1 始终返回true,
     * 无论譔属性存在于实例中还是存在于原型中，同时使用hasOwnProperty()方法和in操作符，就可以确定该属性到底是存在于对象中，还是存在于原型中
     */
    //name in object始终返回true,则可以通过object.hasOwnProperty判断是否有原型属性
    //只要hasOwnProperty()返回false，就可以确定属性是原型中的属性
    function hasPrototypeProperty(object,name){
        return !object.hasOwnProperty(name) && (name in object)
    }

    //使用hasPrototypeProperty（）
    let person = new Person();
    console.log(hasPrototypeProperty(person,'name'));//true

    person.name = 'Greg';
    console.log(hasPrototypeProperty(person,'name'));//false
    //在实例中重写name属性后，虽然原型中仍然有name属性，但由于在实例中也有了这个属性，因此原型中的name属性就用不到了

    //在使用for-in循环时，返回的是所有能够通过对象访问的，可枚举的(enumerated)属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
    //屏蔽了原型中不可枚举属性（即将[Enumerable]标志为false的属性)的实例属性也会在for-in循环中返回，因为根据规定，
    //所有开发人员定义的属性都是可枚举的，IE8例外 
    let o = {
        toString:function(){
            return 'My Object';
        }
    };
    for(let prop in o){
        if(prop === 'toString'){
            console.log('Found toString');//在IE中不会显示
        }
    }

    //要取得对象上所有可枚举的实例属性，可以使用ES5的Object.keys()方法，这个方法接收一个对象作为参数，
    //返回一个包含所有可枚举属性的字符串数组
    let keys = Object.keys(Person.prototype);
    console.log(keys);//[ 'name', 'age', 'job', 'sayName' ]

    let p1 = new Person();
    p1.name = 'Rob';
    p1.age = 32;
    let p1keys = Object.keys(p1);
    console.log(p1keys);//[ 'name', 'age' ] //通过实例调用，只返回两个实例属性

    //如果你想要得到所有实例属性，无论它是否可枚举，都可以使用Object.getOwnPropertyNames()方法
    let pkeys = Object.getOwnPropertyNames(Person.prototype);
    console.log(pkeys);//[ 'constructor', 'name', 'age', 'job', 'sayName' ]
    //结果包含了不可枚举的constructor属性，Object.keys()和Object.getOwnPropertyNames()都可以替代for-in。（IE9+）
}
{//3 更简单的原型语法
    function Person(){

    }
    Person.prototype = {
        name : 'Nick',
        age:33,
        job:'Engineer',
        sayName:function(){
            console.log(this.name)
        }
    }
    //上面代码中，我们将Person.prototype设置为等于一个以对象字面量形式创建的新对象，最终结果相同，但有一个例外:
    //constructor属性不再指向Person了，而是指向Object构造函数
    //此时，尽管instanceof能返回正确的结果，但constructor已经无法确定对象的类型了
    let friend = new Person();
    console.log(
        friend instanceof Object,//true
        friend instanceof Person,//true
        friend.constructor ==Person,//false
        friend.constructor == Object//true
    )
    
    //如果constructor的值真的很重要，可以像下面这样特意将它设置回适当的值
    {
        function Person(){

        }
        Person.prototype = {
            constructor:Person,//这种方式导致constructor属性的[[Enumerable]]特性被设为true
            name : 'Nick',
            age:33,
            job:'Engineer',
            sayName:function(){
                console.log(this.name)
            }
        }        
    }

    {
        //默认情况下，constructor属性是不可枚举的，如果你使用兼容ES5的JS引擎，可以试试Object.defineProperty()
        function Person(){

        }
        Person.prototype = {
            name : 'Nick',
            age:33,
            job:'Engineer',
            sayName:function(){
                console.log(this.name)
            }
        }
        //重设构造函数，只适用于ES5兼容的浏览器
        Object.defineProperty(Person.prototype,'constructor',{
            enumerable:false,
            value:Person
        })
    }

}
{//4 原型的动态性
    //由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来 
    //---即使是先创建了实例后修改原型也照样如此 。
    {
        let friend = new Person();
        Person.prototype.sayHi = function(){
            console.log('hi');
        }
        friend.sayHi(); //Hi 没有问题

        /**以上代码先创建了Person的一个实例，并将其保存在person中，然后，下一条语句在Person.prototype中添加了一个方法sayHi().
         * 即使person实例是在添加新方法之前创建的，但它仍然可以访问这个新方法。其原因可以归结为实例与原型之间的松散连接关系。
         * 当我们调用person.sayHi()时，首先会在实例中搜索名为sayHi的属性，在没找到的情况下，会继续搜索原型。
         * 因为实例与原型之间的连接是一个指针，而非一个副本，因此就可以在原型中找到新的sayHi属性并返回保存在那里的函数 。
         */
    }
    
     /**尽管可以随时为原型添加属性和方法， 并且修改能够立即在所有对象实例中反映出来，但如果是重写整个原型对象，那情况就不一样了。
      * 我们知道，调用构造函数时会为实例添加一个指向最初原型的[[Prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。
      * 实例中的指针仅指向原型，而不是指向构造函数。，如下例
     */
    {
        function Person(){

        }
        let friend = new Person();
        Person.prototype = {
            constructor:Person,
            name:'Nick',
            age:4,
            job:'Student',
            sayName:function(){
                console.log(this.name);
            }
        }
        //friend.sayName();//TypeError: friend.sayName is not a function
        /**在这个例子中，我们先创建了Person的一个实例，又重写了其原型对象，然后在调用friend.sayName()时发生了错误，
         * 因为friend指向的原型中不包含以该名字命名的属性。
         * 
         * 重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍然是最初的原型。
         */
    }
}
{//5 原型对象的原型
    //TODO

}
{//6 原型对象的问题
    /**原型模式的缺点：1 它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。
     * 2 原型模式的最大问题是由其共享的本性所导致的。
     * 原型中所有属性是被很多实例共享的，这种共享对于函数非常合适，对于那些包含基本值的属性说的过去，通过在实例上添加一个同名属性可以隐藏原型中的对应属性。
     * 但对于包含引用类型值的属性来说，问题就比较突出了。
     */

    function Person(){

    }
    Person.prototype = {
        constructor:Person,
        name:'Nick',
        age:4,
        job:'Student',
        friends:['Abo','Bob'],
        sayName:function(){
            console.log(this.name);
        }
    }
    let person1 = new Person();
    let person2 = new Person();
    person1.friends.push('Cap');
    console.log(
        person1.friends,//[ 'Abo', 'Bob', 'Cap' ] 
        person2.friends,//[ 'Abo', 'Bob', 'Cap' ] 
        person1.friends === person2.friends,//true
    )
    //修改了person1.friends，导致person2.friends也发生了变化
}