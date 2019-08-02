/**组合使用构造函数模式和原型模式
 * 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
 * 结果每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。
 * 另外，这种混成模式还支持向构造函数传递参数。
 * 这种模式是ECMAScript中使用最广泛，认同度最高的一种创建自定义类型的方法，是定义引用类型的一种默认模式
 */
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Shelby','Court'];
}
Person.prototype = {
    coustructor : Person,
    sayName : function(){
        console.log(this.name)
    }
}
let person1 = new Person('Nick',2,'Baby');
let person2 = new Person('Wei',23,'Mom');

person1.friends.push('Vana');
console.log(
    person1.friends,//[ 'Shelby', 'Court', 'Vana' ]
    person2.friends,//[ 'Shelby', 'Court' ]
    person1.friends === person2.friends,//false
    person1.sayName === person2.sayName,//true
)