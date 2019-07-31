/**
 * 原型模式(prototype)
 *  
 * 我们创建的每个函数都有一个prototype（原型）属性,这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
 * 按字面理解：prototype是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。
 * 换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。如下例：
 */