const fp = require('lodash/fp')

//数据 horsepower 马力  dollar_value 价格 in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 600, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'JAGUAR xkr-s', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin Onr-77', horsepower: 750, dollar_value: 185000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 130000, in_stock: false },
]

//使用函数组合fp.flowRight()重新实现下面这个函数
/* let isLastInStock = function(cars){
    //获取最后一条数据
    let last_car =  fp.last(cars)
    //获取最后一条数据的 in_stock属性值
    return fp.prop('in_stock',last_car)
} */

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars));

//使用fp.flowRight()、fp.prop()和fp.first()获取第一个card的name值
let getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFirstCarName(cars));

//使用帮助函数_average重构 averageDollarValue，使用函数组合的方式
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = fp.flowRight([_average, fp.map(car => car.dollar_value)])
console.log(averageDollarValue(cars));


///使用flowRight写一个sanitizeNames()函数返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如anitizeNames([Hello World]) =>["hello_word"]
let _underscore = fp.replace(/\W+/g, '_');
let sanitizeNames = fp.flowRight(fp.split('0'),fp.toLower,_underscore,fp.join('0'),fp.map(car=>car.name));
console.log(sanitizeNames(cars));


//使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(fp.map(fp.add(1)))
console.log(ex1);


//实现一个函数ex2,能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.first)
console.log(ex2);

//实现一个函数ex3,使用sadeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})

let user = { id: 2, name: 'Albert' }
let ex3 = safeProp('name',user).map(fp.split("")).map(fp.first)
console.log(ex3);

//使用Maybe重写ex4，不要有if语句
let ex4 = function(n){
    return Maybe.of(n).map(x =>  parseInt(x))
}

console.log(ex4('11.3'));

