/**
 * 原型模式(prototype)
 * 1 理解原型：prototype，isPrototypeOf(),getPrototypeOf(),hasOwnProperty()
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
    Person.prototype.josn = 'Doctor';
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