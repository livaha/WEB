/**
 * 二进制和八进制表示法
Number.isFinite(), Number.isNaN()
Number.parseInt(), Number.parseFloat()
Number.isInteger()
Number.EPSILON
安全整数和 Number.isSafeInteger()
Math 对象的扩展
指数运算符
 */
//从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示。
console.log(
    0b111110111 === 503, // true
    0o767 === 503,
    //如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
    Number('0b111'),  // 7
    Number('0o10')  // 8
)

//函数  Number.isFinite(), Number.isNaN()
//Number.isFinite()用来检查一个数值是否为有限的(finite),即不是Infinity
//Number.isNaN()用来检查一个值是否为NaN
console.log(
    //如果参数类型不是数值，Number.isFinite一律返回false。
    Number.isFinite(13),//true
    Number.isFinite(0.3),//true
    Number.isFinite(NaN),//false
    Number.isFinite(Infinity), // false
    Number.isFinite(-Infinity), // false
    Number.isFinite('foo'), // false
    Number.isFinite('15'), // false
    Number.isFinite(true), // false

    // 如果参数类型不是NaN，Number.isNaN一律返回false。
    Number.isNaN(NaN),//true
    Number.isNaN(15) ,// false
    Number.isNaN('15') ,// false
    Number.isNaN(true) ,// false
    Number.isNaN(9/NaN), // true,下面2个也是true
    Number.isNaN('true'/0),
    Number.isNaN('true'/'true'),
)

// Number.parseInt(), Number.parseFloat()
//ES6将全局方法parseInt()和parseFloat()移植到Number对象上面，行为完全保持不变。
console.log(
    //ES5的写法
    parseInt('12.23'),//12
    parseFloat('123.34#'),//123.34
    typeof(parseFloat('123.34#')),//'Number'

    Number.parseInt('12.34'),//12
    Number.parseFloat('123.34#'),//123.34

    Number.parseInt === parseInt,//true
    Number.parseFloat === parseFloat,//true

)

// Number.isInterger() 判断一个数值是否为整数
console.log(
    Number.isInteger(23),//true
    Number.isInteger(23.2),//false

    //javascript内部，整数和浮点数采用的是同样的储存方法，所以25,25.0被视为同一个值
    Number.isInteger(25),//true
    Number.isInteger(25.0),//true

    //如果参数不是数值，Number.isInteger返回false
    Number.isInteger(),//false
    Number.isInteger(null),//false
    Number.isInteger('23'),//false
    Number.isInteger(true),//false

    /**由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，
     * 第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。 */
    Number.isInteger(3.00000000000000002)//false

)