/**动态原型模式
 * 把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型(公在必要的情况下)，又保持了同时使用构造函数和原型的优点。
 * 换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。
 */
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    //方法
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}
let friend = new Person('Nick',3,'Engineer');
friend.sayName();//Nick

/**
 * 这里只在sayName()方法不存在的情况下，才会将它添加到原型中。
 * 这段‘//方法’代码只会在初次调用构造函数时才会执行，此后，原型已经完成初始化，不需要再做什么修改了。
 * 这里对原型所做的修改，能够立即在所有实例中得到反映，因此这种方法确实可以说非常完美 。
 * 其中，if语句检查的可以是初始化之后应该存在的任何属性或方法---不必用一大堆if语句检查每个属性和每个方法，只要检查其中一个即可。
 * 对于采用这种模式创建的对象，还可以使用instanceof操作符确定它的类型。
 * 
 * 使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，
 * 那么就会切断现有实例与新原型之间的联系。
 */