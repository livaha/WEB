/**Symbol
 * 属性名，ES6引入Symbol是为了防止属性名冲突
 * Symbol值由Symbol函数生成，属于第七种数据类型，Symbol值是独一无二的，不会与其他属性名冲突
 * Symbol 值不能与其他类型的值进行运算
 * Symbol 值也可以转为布尔值，但是不能转为数值
 */

 let s = Symbol();
 console.log(typeof s); //symbol

 const obj = {
     toString(){
         return 'abc';
     }
 }
console.log(obj)
 const sym = Symbol(obj)


 const shapeType = {
    triangle: Symbol()
  };
  
  function getArea(shape, options) {
    let area = 0;
    switch (shape) {
      case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
  }
  
  //shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。
  let area = getArea(shapeType.triangle, { width: 100, height: 100 }); // 魔术字符串
  console.log(area)

  let size = Symbol('size');



  
class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]